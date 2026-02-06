interface PayPalButtonProps {
  onUpgrade: () => void;
}

export default function PayPalButton({ onUpgrade }: PayPalButtonProps) {
  const handleDonation = () => {
    alert('Funzionalità PayPal: Inserire qui il proprio PayPal Client ID per abilitare le donazioni');
    onUpgrade();
  };

  return (
    <div className="bg-gradient-to-r from-hacker-accent/20 to-hacker-secondary/20 rounded-lg p-6 border border-hacker-accent/50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-hacker-accent mb-2">
            Upgrade a 24 Ore
          </h3>
          <p className="text-sm text-gray-400">
            Estendi la durata della tua email temporanea da 10 minuti a 24 ore con una piccola donazione
          </p>
        </div>
        <button
          onClick={handleDonation}
          className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.806.806 0 01-.795.68H8.175a.493.493 0 01-.487-.568l.008-.054.53-3.362.01-.063.53-3.362.01-.062a.805.805 0 01.794-.68h.5c2.035 0 3.628-.532 4.747-1.645 1.088-1.084 1.588-2.638 1.514-4.688a.99.99 0 01.028-.228.506.506 0 01.51-.417h1.757c.298 0 .54.263.51.56z"/>
              <path d="M7.545 3.875c.083-.364.39-.627.76-.627h5.59c2.033 0 3.627.532 4.746 1.645 1.088 1.084 1.588 2.638 1.515 4.688-.074 2.05-.673 3.606-1.762 4.69-1.12 1.113-2.713 1.645-4.747 1.645h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.806.806 0 01-.795.68H8.175a.493.493 0 01-.487-.568l.008-.054 1.06-6.723a.805.805 0 01.794-.68h.5c2.035 0 3.628-.532 4.747-1.645 1.088-1.084 1.588-2.638 1.514-4.688-.074-2.05-.673-3.606-1.762-4.69C13.43 2.48 11.837 1.948 9.803 1.948H4.214a.806.806 0 00-.794.68L1.14 13.897a.493.493 0 00.487.568h2.095a.806.806 0 00.795-.68l2.028-12.91z"/>
            </svg>
            <span>Dona con PayPal</span>
          </div>
        </button>
      </div>
    </div>
  );
}
