import { useState, useEffect } from "react";
import { Battery, MapPin, AlertTriangle, TrendingUp, Zap, Thermometer, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BatteryUnit {
  id: string;
  vehicleId: string;
  location: string;
  health: number;
  temperature: number;
  cycleCount: number;
  voltage: number;
  capacity: number;
  chargingStatus: 'charging' | 'discharging' | 'idle';
  lastUpdate: Date;
  alerts: string[];
  efficiency: number;
  estimatedLifespan: number;
}

export const BatteryFleetManager = () => {
  const [batteries] = useState<BatteryUnit[]>([
    {
      id: 'EV-001',
      vehicleId: 'Tesla Model S #1',
      location: 'San Francisco, CA',
      health: 94.5,
      temperature: 23,
      cycleCount: 1247,
      voltage: 3.7,
      capacity: 85.2,
      chargingStatus: 'charging',
      lastUpdate: new Date(),
      alerts: [],
      efficiency: 97.8,
      estimatedLifespan: 8.2
    },
    {
      id: 'EV-002',
      vehicleId: 'Tesla Model 3 #2',
      location: 'Los Angeles, CA',
      health: 87.3,
      temperature: 31,
      cycleCount: 2156,
      voltage: 3.6,
      capacity: 82.1,
      chargingStatus: 'discharging',
      lastUpdate: new Date(Date.now() - 5 * 60000),
      alerts: ['Temperature Warning'],
      efficiency: 94.2,
      estimatedLifespan: 6.8
    },
    {
      id: 'EV-003',
      vehicleId: 'BMW iX #3',
      location: 'Seattle, WA',
      health: 91.8,
      temperature: 19,
      cycleCount: 987,
      voltage: 3.8,
      capacity: 88.7,
      chargingStatus: 'idle',
      lastUpdate: new Date(Date.now() - 10 * 60000),
      alerts: [],
      efficiency: 96.1,
      estimatedLifespan: 7.9
    },
    {
      id: 'EV-004',
      vehicleId: 'Audi e-tron #4',
      location: 'Portland, OR',
      health: 78.9,
      temperature: 42,
      cycleCount: 3421,
      voltage: 3.4,
      capacity: 76.3,
      chargingStatus: 'charging',
      lastUpdate: new Date(Date.now() - 2 * 60000),
      alerts: ['Health Critical', 'Temperature Alert'],
      efficiency: 89.7,
      estimatedLifespan: 4.2
    }
  ]);

  const [selectedBattery, setSelectedBattery] = useState<BatteryUnit | null>(null);

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-lime';
    if (health >= 80) return 'text-electric';
    if (health >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getHealthZone = (health: number) => {
    if (health >= 90) return 'Excellent';
    if (health >= 80) return 'Good';
    if (health >= 70) return 'Fair';
    return 'Critical';
  };

  const getChargingStatusColor = (status: string) => {
    switch (status) {
      case 'charging':
        return 'text-lime';
      case 'discharging':
        return 'text-electric';
      case 'idle':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChargingStatusIcon = (status: string) => {
    switch (status) {
      case 'charging':
        return <Zap className="h-4 w-4 text-lime" />;
      case 'discharging':
        return <TrendingUp className="h-4 w-4 text-electric" />;
      case 'idle':
        return <Activity className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const fleetStats = {
    totalBatteries: batteries.length,
    averageHealth: batteries.reduce((sum, b) => sum + b.health, 0) / batteries.length,
    criticalAlerts: batteries.filter(b => b.alerts.length > 0).length,
    chargingCount: batteries.filter(b => b.chargingStatus === 'charging').length
  };

  return (
    <Card className="glass-panel premium-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-glow">
          <Battery className="h-6 w-6 text-electric" />
          Battery Fleet Manager
          <Badge variant="outline" className="ml-auto">
            {batteries.length} Units
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-panel">
            <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
            <TabsTrigger value="details">Battery Details</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Fleet Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="glass-panel">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-electric" />
                    <div>
                      <div className="text-lg font-bold">{fleetStats.totalBatteries}</div>
                      <div className="text-xs text-muted-foreground">Total Units</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-panel">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-lime" />
                    <div>
                      <div className="text-lg font-bold">{fleetStats.averageHealth.toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">Avg Health</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-panel">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <div>
                      <div className="text-lg font-bold">{fleetStats.criticalAlerts}</div>
                      <div className="text-xs text-muted-foreground">Alerts</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-panel">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-electric" />
                    <div>
                      <div className="text-lg font-bold">{fleetStats.chargingCount}</div>
                      <div className="text-xs text-muted-foreground">Charging</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Battery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {batteries.map((battery) => (
                <Card 
                  key={battery.id}
                  className={`glass-panel cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    battery.alerts.length > 0 ? 'border-warning/50' : ''
                  }`}
                  onClick={() => setSelectedBattery(battery)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{battery.id}</h4>
                        <p className="text-sm text-muted-foreground">{battery.vehicleId}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{battery.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getChargingStatusIcon(battery.chargingStatus)}
                        {battery.alerts.length > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {battery.alerts.length}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Battery Health</span>
                          <span className={getHealthColor(battery.health)}>
                            {battery.health}% • {getHealthZone(battery.health)}
                          </span>
                        </div>
                        <Progress value={battery.health} className="h-2" />
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-sm font-medium">{battery.temperature}°C</div>
                          <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                            <Thermometer className="h-3 w-3" />
                            Temp
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{battery.cycleCount.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Cycles</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{battery.efficiency}%</div>
                          <div className="text-xs text-muted-foreground">Efficiency</div>
                        </div>
                      </div>

                      {battery.alerts.length > 0 && (
                        <div className="space-y-1">
                          {battery.alerts.map((alert, index) => (
                            <Badge key={index} variant="destructive" className="text-xs mr-1">
                              {alert}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {selectedBattery ? (
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Battery className="h-5 w-5 text-electric" />
                    {selectedBattery.id} - Detailed View
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 glass-panel rounded-lg">
                      <div className="text-2xl font-bold text-electric">{selectedBattery.health}%</div>
                      <div className="text-sm text-muted-foreground">Health</div>
                    </div>
                    <div className="text-center p-4 glass-panel rounded-lg">
                      <div className="text-2xl font-bold text-lime">{selectedBattery.capacity}kWh</div>
                      <div className="text-sm text-muted-foreground">Capacity</div>
                    </div>
                    <div className="text-center p-4 glass-panel rounded-lg">
                      <div className="text-2xl font-bold text-cyan">{selectedBattery.voltage}V</div>
                      <div className="text-sm text-muted-foreground">Voltage</div>
                    </div>
                    <div className="text-center p-4 glass-panel rounded-lg">
                      <div className="text-2xl font-bold text-warning">{selectedBattery.estimatedLifespan}</div>
                      <div className="text-sm text-muted-foreground">Years Left</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Performance Metrics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Efficiency Rating</span>
                          <span className="font-medium">{selectedBattery.efficiency}%</span>
                        </div>
                        <Progress value={selectedBattery.efficiency} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Cycle Count</span>
                          <span className="font-medium">{selectedBattery.cycleCount.toLocaleString()}</span>
                        </div>
                        <Progress value={(selectedBattery.cycleCount / 5000) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-panel">
                <CardContent className="p-8 text-center">
                  <Battery className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a battery from the overview to view detailed information</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="glass-panel">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Advanced fleet analytics coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};