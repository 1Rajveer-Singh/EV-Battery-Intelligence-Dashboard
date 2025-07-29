import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { BarChart3, TrendingUp, Award, Zap, ThermometerSun, Clock, Recycle } from 'lucide-react';

interface BatteryProfile {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  health: number;
  age: number;
  cycles: number;
  efficiency: number;
  temperature: number;
  recyclability: number;
  score: number;
  isYours?: boolean;
}

export const BatteryComparison = () => {
  const [selectedMetric, setSelectedMetric] = useState<'health' | 'efficiency' | 'longevity' | 'sustainability'>('health');
  
  const batteryProfiles: BatteryProfile[] = [
    {
      id: '1',
      name: 'Your Battery',
      model: 'Model S 100kWh',
      manufacturer: 'Tesla',
      health: 87,
      age: 2.3,
      cycles: 847,
      efficiency: 94.2,
      temperature: 24,
      recyclability: 87,
      score: 92,
      isYours: true
    },
    {
      id: '2',
      name: 'Peer Average',
      model: 'Model S 100kWh',
      manufacturer: 'Tesla',
      health: 82,
      age: 2.5,
      cycles: 950,
      efficiency: 91.8,
      temperature: 26,
      recyclability: 85,
      score: 88
    },
    {
      id: '3',
      name: 'Top Performer',
      model: 'Model S 100kWh',
      manufacturer: 'Tesla',
      health: 95,
      age: 1.8,
      cycles: 720,
      efficiency: 96.5,
      temperature: 22,
      recyclability: 92,
      score: 97
    },
    {
      id: '4',
      name: 'Industry Avg',
      model: 'Various Models',
      manufacturer: 'Industry',
      health: 78,
      age: 3.2,
      cycles: 1200,
      efficiency: 89.2,
      temperature: 28,
      recyclability: 80,
      score: 82
    }
  ];

  const radarData = batteryProfiles.map(battery => ({
    name: battery.name,
    health: battery.health,
    efficiency: battery.efficiency,
    recyclability: battery.recyclability,
    score: battery.score
  }));

  const comparisonData = batteryProfiles.map(battery => ({
    name: battery.name.replace(' Battery', ''),
    health: battery.health,
    efficiency: battery.efficiency,
    cycles: battery.cycles / 10, // Scale for visualization
    temperature: battery.temperature,
    recyclability: battery.recyclability
  }));

  const metrics = [
    { key: 'health', label: 'Battery Health', icon: <Zap className="w-4 h-4" />, color: 'lime' },
    { key: 'efficiency', label: 'Energy Efficiency', icon: <TrendingUp className="w-4 h-4" />, color: 'electric' },
    { key: 'longevity', label: 'Longevity', icon: <Clock className="w-4 h-4" />, color: 'cyan' },
    { key: 'sustainability', label: 'Sustainability', icon: <Recycle className="w-4 h-4" />, color: 'warning' }
  ];

  const getMetricColor = (color: string) => {
    switch (color) {
      case 'lime': return 'hsl(var(--ev-lime-green))';
      case 'electric': return 'hsl(var(--ev-electric-blue))';
      case 'cyan': return 'hsl(var(--ev-cyan))';
      case 'warning': return 'hsl(var(--ev-orange))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ dataKey: string; value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 border border-border/50">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry: { dataKey: string; value: number; color: string }, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
              {entry.dataKey === 'cycles' ? '0 cycles' : 
               entry.dataKey === 'temperature' ? '°C' : 
               entry.dataKey === 'health' || entry.dataKey === 'efficiency' || entry.dataKey === 'recyclability' ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-cyan/20 premium-glow">
            <BarChart3 className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-glow">Battery Performance Comparison</h2>
            <p className="text-sm text-muted-foreground">Compare your battery against peers and industry standards</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {metrics.map((metric) => (
            <Button
              key={metric.key}
              variant={selectedMetric === metric.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric(metric.key as 'health' | 'efficiency' | 'longevity' | 'sustainability')}
              className={selectedMetric === metric.key ? 
                `bg-${metric.color}/20 text-${metric.color} border-${metric.color}/30 premium-glow` : 
                'border-muted/30 hover:border-muted/50'}
            >
              {metric.icon}
              <span className="ml-2 hidden md:inline">{metric.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Radar */}
        <Card className="data-visualization p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-electric" />
            <span className="text-sm font-medium">Multi-Metric Analysis</span>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData[0] ? [radarData[0], radarData[1], radarData[2]] : []}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                domain={[0, 100]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <Radar
                name="Your Battery"
                dataKey="health"
                stroke="hsl(var(--ev-lime-green))"
                fill="hsl(var(--ev-lime-green))"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Peer Average"
                dataKey="efficiency"
                stroke="hsl(var(--ev-electric-blue))"
                fill="hsl(var(--ev-electric-blue))"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Top Performer"
                dataKey="recyclability"
                stroke="hsl(var(--ev-cyan))"
                fill="hsl(var(--ev-cyan))"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Detailed Comparison Chart */}
        <Card className="data-visualization p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-lime" />
            <span className="text-sm font-medium">Performance Metrics</span>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="health" 
                fill="hsl(var(--ev-lime-green))"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="efficiency" 
                fill="hsl(var(--ev-electric-blue))"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="recyclability" 
                fill="hsl(var(--ev-cyan))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detailed Comparison Table */}
      <Card className="data-visualization p-6">
        <div className="flex items-center gap-2 mb-6">
          <ThermometerSun className="w-4 h-4 text-warning" />
          <span className="text-lg font-semibold">Detailed Performance Analysis</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {batteryProfiles.map((battery) => (
            <div 
              key={battery.id}
              className={`p-4 rounded-lg border transition-all ${
                battery.isYours 
                  ? 'bg-electric/10 border-electric/30 premium-glow' 
                  : 'bg-muted/5 border-border/30 hover:bg-muted/10'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold text-sm">{battery.name}</span>
                {battery.isYours && (
                  <Badge className="bg-electric/20 text-electric text-xs">You</Badge>
                )}
              </div>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Health</span>
                  <span className="font-medium text-lime">{battery.health}%</span>
                </div>
                <Progress value={battery.health} className="h-1" />
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Efficiency</span>
                  <span className="font-medium text-electric">{battery.efficiency}%</span>
                </div>
                <Progress value={battery.efficiency} className="h-1" />
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cycles</span>
                  <span className="font-medium text-cyan">{battery.cycles.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age</span>
                  <span className="font-medium text-muted-foreground">{battery.age}y</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temp</span>
                  <span className="font-medium text-warning">{battery.temperature}°C</span>
                </div>
                
                <div className="pt-2 border-t border-border/30">
                  <div className="text-center">
                    <div className="text-lg font-bold text-glow">{battery.score}</div>
                    <div className="text-xs text-muted-foreground">Overall Score</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};