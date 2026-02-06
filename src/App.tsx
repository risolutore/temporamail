import { useState, useEffect } from 'react';
import { guerrillaMailAPI } from './api/guerrillamail';
import type { Email } from './types';
import Countdown from './components/Countdown';
import EmailList from './components/EmailList';
import EmailViewer from './components/EmailViewer';
import PayPalButton from './components/PayPalButton';
import AdSense from './components/AdSense';
import Toast from './components/Toast';

interface ToastNotification {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

function App() {
  const [email, setEmail] = useState<string>('');
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [emailDuration, setEmailDuration] = useState(10);
  const [seq, setSeq] = useState(0);
  const [countdownKey, setCountdownKey] = useState(0);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const generateEmail = async () => {
    setLoading(true);
    try {
      const result = await guerrillaMailAPI.getEmailAddress();
      setEmail(result.email);
      setEmails([]);
      setSelectedEmail(null);
      setSelectedEmailId(null);
      setSeq(0);
      setEmailDuration(isPremium ? 1440 : 10);
      setCountdownKey(prev => prev + 1);
      showToast('✓ Nuova email generata con successo!', 'success');
    } catch (error) {
      console.error('Error generating email:', error);
      showToast('✗ Errore nella generazione dell\'email', 'error');
    } finally {
      setLoading(false);
    }
  };

  const checkEmails = async () => {
    if (!email) return;
    
    try {
      const result = await guerrillaMailAPI.checkEmail(seq);
      if (result.list && result.list.length > 0) {
        const newEmailsCount = result.list.length - emails.length;
        if (newEmailsCount > 0) {
          showToast(`📧 ${newEmailsCount} nuova email ricevuta!`, 'info');
        }
        setEmails(result.list);
        setSeq(prev => prev + result.list.length);
      }
    } catch (error) {
      console.error('Error checking emails:', error);
    }
  };

  const fetchEmailDetail = async (emailId: string) => {
    try {
      const result = await guerrillaMailAPI.fetchEmail(emailId);
      setSelectedEmail(result);
      setSelectedEmailId(emailId);
    } catch (error) {
      console.error('Error fetching email:', error);
    }
  };

  const handleUpgrade = () => {
    setIsPremium(true);
    setEmailDuration(1440);
    showToast('⭐ Email aggiornata a 24 ore! Grazie per la donazione', 'success');
  };

  const handleExpire = () => {
    setEmail('');
    setEmails([]);
    setSelectedEmail(null);
    setSelectedEmailId(null);
    showToast('⏰ Email temporanea scaduta. Genera una nuova email!', 'warning');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    showToast('📋 Email copiata negli appunti!', 'success');
  };

  useEffect(() => {
    if (email) {
      const interval = setInterval(checkEmails, 5000);
      return () => clearInterval(interval);
    }
  }, [email, seq]);

  return (
    <div className="min-h-screen bg-hacker-bg text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-hacker-accent font-mono">
            &lt; TEMPORAMAIL /&gt;
          </h1>
          <p className="text-gray-400 text-lg">
            Email temporanea anonima - Nessuna registrazione richiesta
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-hacker-accent rounded-full animate-pulse"></div>
            <span className="text-xs text-hacker-accent uppercase tracking-wider">
              Connessione Sicura
            </span>
          </div>
        </header>

        <div className="mb-8">
          <AdSense />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            {!email ? (
              <div className="bg-hacker-surface rounded-lg p-12 text-center border border-hacker-accent/30">
                <div className="mb-6">
                  <svg className="w-24 h-24 mx-auto text-hacker-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h2 className="text-3xl font-bold text-hacker-accent mb-2">
                    Genera la tua Email Temporanea
                  </h2>
                  <p className="text-gray-400">
                    Clicca sul pulsante per creare un indirizzo email anonimo
                  </p>
                </div>
                <button
                  onClick={generateEmail}
                  disabled={loading}
                  className="px-12 py-4 bg-gradient-to-r from-hacker-accent to-hacker-secondary text-black font-bold text-xl rounded-lg hover:shadow-2xl hover:shadow-hacker-accent/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generazione...' : '> GENERA EMAIL'}
                </button>
              </div>
            ) : (
              <>
                <div className="bg-hacker-surface rounded-lg p-6 mb-6 border border-hacker-accent/30">
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">
                    Il tuo indirizzo email temporaneo:
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-hacker-bg/50 p-4 rounded-lg font-mono text-hacker-accent text-lg border border-hacker-accent/50">
                      {email}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="px-6 py-4 bg-hacker-accent text-black font-bold rounded-lg hover:bg-hacker-secondary transition-all"
                      title="Copia email"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={generateEmail}
                      disabled={loading}
                      className="px-6 py-4 bg-hacker-danger text-white font-bold rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
                      title="Nuova email"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>

                {!isPremium && (
                  <div className="mb-6">
                    <PayPalButton onUpgrade={handleUpgrade} />
                  </div>
                )}

                <div className="bg-hacker-surface rounded-lg p-6 border border-hacker-accent/30">
                  <h2 className="text-2xl font-bold text-hacker-accent mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-hacker-accent rounded-full animate-pulse"></span>
                    Inbox
                  </h2>
                  <EmailList
                    emails={emails}
                    onSelectEmail={fetchEmailDetail}
                    selectedEmailId={selectedEmailId}
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-6">
            {email && (
              <Countdown
                key={countdownKey}
                initialMinutes={emailDuration}
                onExpire={handleExpire}
              />
            )}
            
            <AdSense />

            {email && (
              <div className="bg-hacker-surface rounded-lg p-6 border border-hacker-accent/30">
                <h3 className="text-lg font-bold text-hacker-accent mb-4">
                  Informazioni
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-hacker-accent mt-1">▸</span>
                    <span>Durata: {isPremium ? '24 ore' : '10 minuti'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-hacker-accent mt-1">▸</span>
                    <span>Nessuna registrazione</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-hacker-accent mt-1">▸</span>
                    <span>Completamente anonimo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-hacker-accent mt-1">▸</span>
                    <span>Aggiornamento automatico</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {selectedEmail && (
          <div className="mt-8">
            <EmailViewer
              email={selectedEmail}
              onClose={() => {
                setSelectedEmail(null);
                setSelectedEmailId(null);
              }}
            />
          </div>
        )}

        <footer className="mt-12 text-center text-gray-600 text-sm border-t border-hacker-accent/20 pt-6">
          <p>&copy; 2026 Temporamail - Servizio Email Temporanea</p>
          <p className="mt-2">Powered by Guerrilla Mail API</p>
        </footer>
      </div>

      <div className="fixed top-4 right-4 z-50">
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            index={index}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
