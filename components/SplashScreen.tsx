import React from 'react';

export const SplashScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white animate-fade-out animation-delay-2000">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <img
                    src="/apple-touch-icon.png"
                    alt="Logo"
                    className="relative w-32 h-32 md:w-48 md:h-48 object-contain animate-bounce-subtle"
                />
            </div>

            <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
        .animate-fade-out {
          animation: fadeOut 0.5s forwards;
          animation-delay: 2.5s;
        }
        @keyframes fadeOut {
          from { opacity: 1; pointer-events: auto; }
          to { opacity: 0; pointer-events: none; }
        }
      `}</style>
        </div>
    );
};
