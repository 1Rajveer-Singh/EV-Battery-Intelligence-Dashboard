import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Recycle, Leaf, Award } from 'lucide-react';

interface CircularEconomyVisualizerProps {
  circularScore: number;
  materialRecovery: {
    lithium: number;
    cobalt: number;
    nickel: number;
    graphite: number;
  };
}

export const CircularEconomyVisualizer = ({ 
  circularScore, 
  materialRecovery 
}: CircularEconomyVisualizerProps) => {
  const materialData = [
    { name: 'Lithium', value: materialRecovery.lithium, color: '#00d4ff', ease: 'High' },
    { name: 'Cobalt', value: materialRecovery.cobalt, color: '#00ff88', ease: 'Medium' },
    { name: 'Nickel', value: materialRecovery.nickel, color: '#ff8800', ease: 'Medium' },
    { name: 'Graphite', value: materialRecovery.graphite, color: '#8800ff', ease: 'Low' },
  ];

  const CircularScoreRing = () => {
    const circumference = 2 * Math.PI * 60;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (circularScore / 100) * circumference;

    return (
      <div className="relative">
        <svg className="transform -rotate-90 w-32 h-32" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="hsl(var(--border))"
            strokeWidth="6"
            fill="none"
            className="opacity-20"
          />
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="hsl(var(--ev-lime-green))"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-2000 ease-out glow-accent"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-lime text-glow">{circularScore}%</div>
          <div className="text-xs text-muted-foreground">Circular</div>
        </div>
      </div>
    );
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number } }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="data-card p-3 border border-border/50">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-xs text-muted-foreground">Recovery: {data.value}%</p>
          <p className="text-xs text-lime">Ease: {data.ease}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="data-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/20 glow-accent">
          <Recycle className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-glow">Circular Economy</h3>
          <p className="text-sm text-muted-foreground">Material Recovery Potential</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <CircularScoreRing />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-lime" />
              <span className="text-sm text-lime">Sustainability Score</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-electric" />
              <span className="text-sm text-electric">Certified Recycling</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={materialData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
              >
                {materialData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke={entry.color}
                    strokeWidth={2}
                    style={{
                      filter: `drop-shadow(0 0 8px ${entry.color}40)`
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {materialData.map((material) => (
          <div key={material.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ 
                  backgroundColor: material.color,
                  boxShadow: `0 0 8px ${material.color}40`
                }}
              />
              <span>{material.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">{material.value}%</span>
              <span 
                className={`text-xs px-2 py-1 rounded-full ${
                  material.ease === 'High' ? 'bg-lime/20 text-lime' :
                  material.ease === 'Medium' ? 'bg-warning/20 text-warning' :
                  'bg-destructive/20 text-destructive'
                }`}
              >
                {material.ease}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};