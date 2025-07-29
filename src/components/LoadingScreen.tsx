import { useEffect, useState } from 'react';
import { Battery, Zap, Cpu } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-electric via-lime to-cyan opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-background border border-electric/50 flex items-center justify-center">
              <Battery className="w-8 h-8 text-electric animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-lime/20 border border-lime/50 flex items-center justify-center">
              <Zap className="w-3 h-3 text-lime animate-bounce" />
            </div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-cyan/20 border border-cyan/50 flex items-center justify-center">
              <Cpu className="w-3 h-3 text-cyan animate-spin" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-glow">EV Intelligence Dashboard</h2>
          <p className="text-muted-foreground">Initializing advanced battery systems...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Loading AI modules</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="space-y-1 text-xs text-muted-foreground">
          {progress > 20 && <div className="flex items-center gap-2"><Zap className="w-3 h-3 text-electric" /> Battery health sensors initialized</div>}
          {progress > 40 && <div className="flex items-center gap-2"><Cpu className="w-3 h-3 text-lime" /> Predictive AI engine loaded</div>}
          {progress > 60 && <div className="flex items-center gap-2"><Battery className="w-3 h-3 text-cyan" /> Fleet management system active</div>}
          {progress > 80 && <div className="flex items-center gap-2"><Zap className="w-3 h-3 text-warning" /> Real-time monitoring enabled</div>}
        </div>
      </div>
    </div>
  );
};