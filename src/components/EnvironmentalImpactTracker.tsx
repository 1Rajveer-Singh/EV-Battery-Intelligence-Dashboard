import { Card } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { Leaf, Zap, Recycle, Globe, TrendingUp, Award } from 'lucide-react';

interface EnvironmentalMetric {
  title: string;
  value: string;
  unit: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  sparklineData: number[];
}

export const EnvironmentalImpactTracker = () => {
  const metrics: EnvironmentalMetric[] = [
    {
      title: 'CO₂ Saved',
      value: '2,847',
      unit: 'kg',
      change: 12.5,
      icon: <Leaf className="w-5 h-5" />,
      color: 'lime',
      sparklineData: [100, 150, 120, 200, 180, 250, 300, 280, 320, 350]
    },
    {
      title: 'Energy Efficiency',
      value: '94.2',
      unit: '%',
      change: 2.1,
      icon: <Zap className="w-5 h-5" />,
      color: 'electric',
      sparklineData: [88, 89, 91, 90, 92, 93, 94, 93.5, 94.2, 94.2]
    },
    {
      title: 'Recycling Score',
      value: '87',
      unit: '/100',
      change: 5.3,
      icon: <Recycle className="w-5 h-5" />,
      color: 'cyan',
      sparklineData: [70, 72, 75, 78, 80, 82, 84, 85, 86, 87]
    },
    {
      title: 'Carbon Credits',
      value: '156',
      unit: 'credits',
      change: 8.7,
      icon: <Globe className="w-5 h-5" />,
      color: 'warning',
      sparklineData: [120, 125, 130, 135, 140, 145, 150, 152, 154, 156]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'lime': return 'text-lime border-lime/30 bg-lime/10';
      case 'electric': return 'text-electric border-electric/30 bg-electric/10';
      case 'cyan': return 'text-cyan border-cyan/30 bg-cyan/10';
      case 'warning': return 'text-warning border-warning/30 bg-warning/10';
      default: return 'text-muted-foreground border-muted-foreground/30 bg-muted/10';
    }
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="data-card p-2 border border-border/50 text-xs">
          Value: {payload[0].value}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="data-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-lime/20 glow-accent">
            <Leaf className="w-5 h-5 text-lime" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-glow">Environmental Impact</h3>
            <p className="text-sm text-muted-foreground">Your contribution to a sustainable future</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/30">
          <Award className="w-4 h-4 text-lime" />
          <span className="text-sm text-lime font-medium">Eco Champion</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className={`p-4 rounded-xl border transition-all hover:scale-105 ${getColorClasses(metric.color)}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs ${
                metric.change > 0 ? 'text-lime' : 'text-destructive'
              }`}>
                <TrendingUp className="w-3 h-3" />
                +{metric.change}%
              </div>
            </div>
            
            <div className="space-y-1 mb-3">
              <div className="text-2xl font-bold text-glow">
                {metric.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {metric.unit}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">{metric.title}</div>
            </div>

            <div className="h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metric.sparklineData.map((value, i) => ({ value, index: i }))}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={`hsl(var(--ev-${metric.color === 'electric' ? 'electric-blue' : metric.color === 'lime' ? 'lime-green' : metric.color === 'cyan' ? 'cyan' : 'orange'}))`}
                    strokeWidth={2} 
                    dot={false}
                    style={{
                      filter: `drop-shadow(0 0 4px hsl(var(--ev-${metric.color === 'electric' ? 'electric-blue' : metric.color === 'lime' ? 'lime-green' : metric.color === 'cyan' ? 'cyan' : 'orange'}) / 0.6))`
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-lime/5 border border-lime/20">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-lime" />
            <span className="text-sm font-medium text-lime">Carbon Footprint</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Your optimal battery usage has prevented <span className="text-lime font-medium">2.8 tons of CO₂</span> from entering the atmosphere this year.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-electric/5 border border-electric/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-electric" />
            <span className="text-sm font-medium text-electric">Energy Savings</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Your efficiency improvements save <span className="text-electric font-medium">245 kWh</span> per month compared to average users.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-cyan/5 border border-cyan/20">
          <div className="flex items-center gap-2 mb-2">
            <Recycle className="w-4 h-4 text-cyan" />
            <span className="text-sm font-medium text-cyan">Circular Impact</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Your battery is <span className="text-cyan font-medium">87% recyclable</span> and contributes to the circular economy.
          </p>
        </div>
      </div>
    </Card>
  );
};