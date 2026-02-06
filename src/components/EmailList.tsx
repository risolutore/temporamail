import type { Email } from '../types';

interface EmailListProps {
  emails: Email[];
  onSelectEmail: (emailId: string) => void;
  selectedEmailId: string | null;
}

export default function EmailList({ emails, onSelectEmail, selectedEmailId }: EmailListProps) {
  if (emails.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <p className="text-xl mb-2">Nessuna email ricevuta</p>
          <p className="text-sm">Le email in arrivo appariranno qui</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {emails.map((email) => (
        <div
          key={email.mail_id}
          onClick={() => onSelectEmail(email.mail_id)}
          className={`p-4 rounded-lg cursor-pointer transition-all border ${
            selectedEmailId === email.mail_id
              ? 'bg-hacker-accent/10 border-hacker-accent'
              : 'bg-hacker-surface border-hacker-surface hover:border-hacker-accent/50'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-hacker-accent truncate flex-1">
              {email.mail_subject || '(Nessun oggetto)'}
            </h3>
            {!email.mail_read && (
              <span className="ml-2 w-2 h-2 bg-hacker-danger rounded-full flex-shrink-0"></span>
            )}
          </div>
          <p className="text-sm text-gray-400 mb-1">Da: {email.mail_from}</p>
          <p className="text-xs text-gray-500 truncate">{email.mail_excerpt}</p>
          <p className="text-xs text-gray-600 mt-2">{email.mail_date}</p>
        </div>
      ))}
    </div>
  );
}
