import { useState, useEffect } from 'react';

interface CountdownProps {
  initialMinutes: number;
  onExpire: () => void;
}

export default function Countdown({ initialMinutes, onExpire }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / (initialMinutes * 60)) * 100;

  const getColorClass = () => {
    if (percentage > 50) return 'text-hacker-accent';
    if (percentage > 20) return 'text-yellow-400';
    return 'text-hacker-danger';
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-hacker-surface rounded-lg border border-hacker-accent/30">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-hacker-surface"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
            className={`${getColorClass()} transition-all duration-1000`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-bold font-mono ${getColorClass()}`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-400 uppercase tracking-wider">Tempo Rimanente</p>
    </div>
  );
}
