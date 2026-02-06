interface EmailViewerProps {
  email: {
    mail_subject: string;
    mail_from: string;
    mail_date: string;
    mail_body: string;
  } | null;
  onClose: () => void;
}

export default function EmailViewer({ email, onClose }: EmailViewerProps) {
  if (!email) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Seleziona un'email per visualizzarne il contenuto</p>
      </div>
    );
  }

  return (
    <div className="bg-hacker-surface rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4 pb-4 border-b border-hacker-accent/30">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-hacker-accent mb-2">
            {email.mail_subject || '(Nessun oggetto)'}
          </h2>
          <p className="text-sm text-gray-400">
            <span className="font-semibold">Da:</span> {email.mail_from}
          </p>
          <p className="text-xs text-gray-500 mt-1">{email.mail_date}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-2 text-gray-400 hover:text-hacker-accent transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div 
        className="flex-1 overflow-auto text-gray-300"
        dangerouslySetInnerHTML={{ __html: email.mail_body }}
      />
    </div>
  );
}
