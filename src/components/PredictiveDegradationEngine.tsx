import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Brain, TrendingDown, Settings, Zap } from 'lucide-react';

interface PredictiveDegradationEngineProps {
  currentHealth: number;
  historicalData: Array<{
    month: string;
    health: number;
    temperature: number;
    cycles: number;
  }>;
}

export const PredictiveDegradationEngine = ({ 
  currentHealth, 
  historicalData 
}: PredictiveDegradationEngineProps) => {
  const [usageIntensity, setUsageIntensity] = useState([50]);
  const [temperatureRange, setTemperatureRange] = useState([25]);
  const [chargingSpeed, setChargingSpeed] = useState([50]);

  // Generate predictive data based on current settings
  const generatePrediction = () => {
    const futureMonths = 24;
    const baseDecline = 0.5; // Base decline per month
    
    const intensityMultiplier = usageIntensity[0] / 50;
    const tempMultiplier = Math.max(0.5, temperatureRange[0] / 25);
    const speedMultiplier = chargingSpeed[0] / 50;
    
    const totalMultiplier = intensityMultiplier * tempMultiplier * speedMultiplier;
    const monthlyDecline = baseDecline * totalMultiplier;

    const prediction = [];
    let health = currentHealth;
    
    for (let i = 0; i <= futureMonths; i++) {
      prediction.push({
        month: i === 0 ? 'Now' : `+${i}m`,
        predicted: Math.max(0, health),
        confidence: Math.max(60, 95 - (i * 1.5)),
        optimistic: Math.max(0, health + (monthlyDecline * 0.3)),
        pessimistic: Math.max(0, health - (monthlyDecline * 0.7)),
      });
      health -= monthlyDecline;
    }
    
    return prediction;
  };

  const predictionData = generatePrediction();
  const mlConfidence = Math.round(85 - (usageIntensity[0] * 0.3));

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ dataKey: string; value: number; color: string; payload?: { confidence?: number } }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="data-card p-3 border border-border/50">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry: { dataKey: string; value: number; color: string }, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.dataKey === 'predicted' ? 'Predicted' : 
               entry.dataKey === 'optimistic' ? 'Best Case' : 'Worst Case'}: {Math.round(entry.value)}%
            </p>
          ))}
          <p className="text-xs text-muted-foreground mt-1">
            Confidence: {payload[0]?.payload?.confidence?.toFixed(0)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="data-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-electric/20 glow-ring">
          <Brain className="w-5 h-5 text-electric" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-glow">Predictive Degradation Engine</h3>
          <p className="text-sm text-muted-foreground">ML-Powered Battery Lifecycle Forecast</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 border border-electric/30">
          <Zap className="w-4 h-4 text-electric" />
          <span className="text-sm text-electric font-medium">ML Confidence: {mlConfidence}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prediction Chart */}
        <div className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={predictionData}>
              <defs>
                <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--ev-electric-blue))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--ev-electric-blue))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Confidence band */}
              <Area
                type="monotone"
                dataKey="optimistic"
                stroke="none"
                fill="url(#confidenceBand)"
              />
              <Area
                type="monotone"
                dataKey="pessimistic"
                stroke="none"
                fill="url(#confidenceBand)"
              />
              
              {/* Main prediction line */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--ev-electric-blue))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--ev-electric-blue))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--ev-electric-blue))', strokeWidth: 2 }}
                style={{
                  filter: 'drop-shadow(0 0 8px hsl(var(--ev-electric-blue) / 0.6))'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4 text-cyan" />
            <span className="text-sm font-medium text-cyan">Simulation Controls</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-foreground">Usage Intensity</label>
                <span className="text-sm text-electric font-medium">{usageIntensity[0]}%</span>
              </div>
              <Slider
                value={usageIntensity}
                onValueChange={setUsageIntensity}
                max={100}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Daily driving patterns & charge frequency
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-foreground">Avg Temperature</label>
                <span className="text-sm text-lime font-medium">{temperatureRange[0]}°C</span>
              </div>
              <Slider
                value={temperatureRange}
                onValueChange={setTemperatureRange}
                max={50}
                min={-10}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Operating environment conditions
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-foreground">Charging Speed</label>
                <span className="text-sm text-warning font-medium">{chargingSpeed[0]}%</span>
              </div>
              <Slider
                value={chargingSpeed}
                onValueChange={setChargingSpeed}
                max={100}
                min={20}
                step={10}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Fast charging vs standard charging
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">Impact Analysis</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Higher intensity increases degradation rate</p>
              <p>• Extreme temperatures accelerate aging</p>
              <p>• Fast charging affects long-term health</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};