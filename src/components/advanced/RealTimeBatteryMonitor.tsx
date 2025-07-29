import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Battery, Thermometer, Zap, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface BatteryRealtimeData {
  voltage: number;
  current: number;
  temperature: number;
  cellVoltages: number[];
  health: number;
  powerOutput: number;
  efficiency: number;
  chargingStatus: 'charging' | 'discharging' | 'idle';
  timeRemaining: number;
  alerts: Array<{
    type: 'warning' | 'info' | 'critical';
    message: string;
    timestamp: string;
  }>;
}

export const RealTimeBatteryMonitor = () => {
  const [batteryData, setBatteryData] = useState<BatteryRealtimeData>({
    voltage: 403.2,
    current: -45.3,
    temperature: 24,
    cellVoltages: [3.82, 3.81, 3.83, 3.82, 3.84, 3.81, 3.83, 3.82],
    health: 87,
    powerOutput: 18.3,
    efficiency: 94.2,
    chargingStatus: 'idle',
    timeRemaining: 280,
    alerts: [
      { type: 'info', message: 'Battery temperature optimal', timestamp: '2 min ago' },
      { type: 'warning', message: 'Cell voltage variance detected', timestamp: '5 min ago' }
    ]
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setBatteryData(prev => ({
        ...prev,
        voltage: prev.voltage + (Math.random() - 0.5) * 0.5,
        current: prev.current + (Math.random() - 0.5) * 2,
        temperature: prev.temperature + (Math.random() - 0.5) * 0.2,
        powerOutput: Math.max(0, prev.powerOutput + (Math.random() - 0.5) * 1),
        efficiency: Math.min(100, Math.max(90, prev.efficiency + (Math.random() - 0.5) * 0.1)),
        cellVoltages: prev.cellVoltages.map(v => v + (Math.random() - 0.5) * 0.02)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'charging': return 'text-lime border-lime/30 bg-lime/10';
      case 'discharging': return 'text-warning border-warning/30 bg-warning/10';
      default: return 'text-electric border-electric/30 bg-electric/10';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-warning" />;
      default: return <CheckCircle className="w-4 h-4 text-lime" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-electric/20 premium-glow">
            <Battery className="w-6 h-6 text-electric" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-glow">Real-Time Battery Monitor</h2>
            <p className="text-sm text-muted-foreground">Live telemetry & diagnostics</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className={`${getStatusColor(batteryData.chargingStatus)} px-3 py-1`}>
            <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
            {batteryData.chargingStatus.charAt(0).toUpperCase() + batteryData.chargingStatus.slice(1)}
          </Badge>
          
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
              isLive 
                ? 'bg-lime/20 text-lime border-lime/30 premium-glow' 
                : 'bg-muted/20 text-muted-foreground border-muted/30'
            }`}
          >
            {isLive ? 'LIVE' : 'PAUSED'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="data-visualization p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-electric text-glow mb-1">
                  {batteryData.voltage.toFixed(1)}V
                </div>
                <div className="text-sm text-muted-foreground mb-2">Battery Voltage</div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-electric transition-all duration-1000"
                    style={{ width: `${(batteryData.voltage / 450) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan text-glow mb-1">
                  {batteryData.current.toFixed(1)}A
                </div>
                <div className="text-sm text-muted-foreground mb-2">Current Flow</div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan transition-all duration-1000"
                    style={{ width: `${Math.abs(batteryData.current / 100) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-warning text-glow mb-1">
                  {batteryData.temperature.toFixed(1)}°C
                </div>
                <div className="text-sm text-muted-foreground mb-2">Temperature</div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-warning transition-all duration-1000"
                    style={{ width: `${(batteryData.temperature / 50) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Cell Voltage Grid */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-electric" />
                Individual Cell Voltages
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {batteryData.cellVoltages.map((voltage, index) => (
                  <div key={index} className="metric-card p-3 text-center">
                    <div className="text-sm font-bold text-lime text-glow">
                      {voltage.toFixed(2)}V
                    </div>
                    <div className="text-xs text-muted-foreground">Cell {index + 1}</div>
                    <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-lime transition-all duration-1000"
                        style={{ width: `${((voltage - 3.5) / 0.5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card className="data-visualization p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-lime" />
                  <span className="text-sm font-medium">Power Output</span>
                </div>
                <div className="text-2xl font-bold text-lime text-glow mb-2">
                  {batteryData.powerOutput.toFixed(1)} kW
                </div>
                <Progress value={(batteryData.powerOutput / 50) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-electric" />
                  <span className="text-sm font-medium">Efficiency</span>
                </div>
                <div className="text-2xl font-bold text-electric text-glow mb-2">
                  {batteryData.efficiency.toFixed(1)}%
                </div>
                <Progress value={batteryData.efficiency} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts & Diagnostics */}
        <div className="space-y-6">
          <Card className="data-visualization p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-cyan" />
              <span className="text-sm font-medium">Time Remaining</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan text-glow mb-2">
                {Math.floor(batteryData.timeRemaining / 60)}h {batteryData.timeRemaining % 60}m
              </div>
              <div className="text-sm text-muted-foreground">At current usage</div>
            </div>
            
            <div className="mt-4 relative">
              <div className="w-24 h-24 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="hsl(var(--border))"
                    strokeWidth="8"
                    fill="none"
                    className="opacity-20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="hsl(var(--ev-cyan))"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(batteryData.health / 100) * 283} 283`}
                    className="transition-all duration-1000 neon-glow"
                    style={{ color: 'hsl(var(--ev-cyan))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-cyan text-glow">
                    {batteryData.health}%
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="data-visualization p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">System Alerts</span>
            </div>
            
            <div className="space-y-3">
              {batteryData.alerts.map((alert, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/10 border border-border/30"
                >
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};