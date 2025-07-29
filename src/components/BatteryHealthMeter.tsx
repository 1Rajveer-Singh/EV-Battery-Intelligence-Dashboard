import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

interface BatteryHealthMeterProps {
  healthPercentage: number;
  temperature: number;
  cycleCount: number;
  voltage: number;
}

export const BatteryHealthMeter = ({ 
  healthPercentage, 
  temperature, 
  cycleCount, 
  voltage 
}: BatteryHealthMeterProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(healthPercentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [healthPercentage]);

  const getHealthColor = (percentage: number) => {
    if (percentage >= 80) return 'text-lime glow-accent';
    if (percentage >= 60) return 'text-warning glow-warning';
    return 'text-destructive glow-warning';
  };

  const getHealthZone = (percentage: number) => {
    if (percentage >= 80) return 'Optimal';
    if (percentage >= 60) return 'Aging';
    return 'Replace Soon';
  };

  const circumference = 2 * Math.PI * 120;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <Card className="data-card p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 holographic-border opacity-20 rounded-xl"></div>
      
      <div className="relative">
        <svg className="transform -rotate-90 w-64 h-64" viewBox="0 0 256 256">
          {/* Background ring */}
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="hsl(var(--border))"
            strokeWidth="8"
            fill="none"
            className="opacity-20"
          />
          
          {/* Health ring */}
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke={`hsl(var(--${healthPercentage >= 80 ? 'battery-healthy' : healthPercentage >= 60 ? 'battery-aging' : 'battery-critical'}))`}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-2000 ease-out drop-shadow-lg pulse-ring"
            style={{
              filter: `drop-shadow(0 0 10px hsl(var(--${healthPercentage >= 80 ? 'battery-healthy' : healthPercentage >= 60 ? 'battery-aging' : 'battery-critical'}) / 0.6))`,
            }}
          />
          
          {/* Pulse ring overlay */}
          <circle
            cx="128"
            cy="128"
            r="110"
            stroke={`hsl(var(--${healthPercentage >= 80 ? 'battery-healthy' : healthPercentage >= 60 ? 'battery-aging' : 'battery-critical'}))`}
            strokeWidth="2"
            fill="none"
            className="animate-ping opacity-30"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-5xl font-bold mb-2 ${getHealthColor(animatedPercentage)} text-glow`}>
            {Math.round(animatedPercentage)}%
          </div>
          <div className="text-sm font-medium text-muted-foreground mb-1">
            Battery Health
          </div>
          <div className={`text-xs font-semibold px-3 py-1 rounded-full border ${getHealthColor(animatedPercentage)}`}>
            {getHealthZone(animatedPercentage)}
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mt-8 w-full">
        <div className="text-center">
          <div className="text-2xl font-bold text-electric text-glow">{temperature}°C</div>
          <div className="text-xs text-muted-foreground">Temperature</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan text-glow">{cycleCount.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Charge Cycles</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-lime text-glow">{voltage}V</div>
          <div className="text-xs text-muted-foreground">Voltage</div>
        </div>
      </div>
    </Card>
  );
};