import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Activity, Battery, Thermometer, Zap, AlertTriangle, CheckCircle, Clock, Cpu, Database, Network, Eye, Shield, Target, Waves } from 'lucide-react';

interface BatteryData {
  timestamp: string;
  voltage: number;
  current: number;
  temperature: number;
  capacity: number;
  health: number;
  power: number;
  impedance: number;
  efficiency: number;
}

interface QuantumMetrics {
  coherenceTime: number;
  entanglementLevel: number;
  quantumEfficiency: number;
  waveFunction: number;
  tunnelProbability: number;
  superposition: number;
}

interface ThreatDetection {
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  threatType: string;
  confidence: number;
  description: string;
  timeDetected: string;
  mitigationSuggested: string;
}

interface AdaptiveLearning {
  learningRate: number;
  patternRecognition: number;
  adaptiveAccuracy: number;
  neuralConnections: number;
  knowledgeBase: number;
}

export const RealTimeBatteryMonitor = () => {
  const [batteryData, setBatteryData] = useState<BatteryData[]>([]);
  const [currentBattery, setCurrentBattery] = useState({
    voltage: 3.7,
    current: 2.1,
    temperature: 32,
    capacity: 85,
    health: 92,
    power: 7.77,
    impedance: 45,
    efficiency: 94.2,
    status: 'Normal'
  });

  const [quantumMetrics, setQuantumMetrics] = useState<QuantumMetrics>({
    coherenceTime: 87.3,
    entanglementLevel: 92.1,
    quantumEfficiency: 89.7,
    waveFunction: 94.5,
    tunnelProbability: 76.8,
    superposition: 88.9
  });

  const [threats] = useState<ThreatDetection[]>([
    {
      threatLevel: 'medium',
      threatType: 'Thermal Anomaly',
      confidence: 87.3,
      description: 'Temperature gradient exceeds normal parameters',
      timeDetected: '2 mins ago',
      mitigationSuggested: 'Activate enhanced cooling protocol'
    },
    {
      threatLevel: 'low',
      threatType: 'Voltage Fluctuation',
      confidence: 72.1,
      description: 'Minor voltage instability detected in cell 3',
      timeDetected: '5 mins ago',
      mitigationSuggested: 'Monitor cell balancing system'
    }
  ]);

  const [adaptiveLearning, setAdaptiveLearning] = useState<AdaptiveLearning>({
    learningRate: 94.7,
    patternRecognition: 89.3,
    adaptiveAccuracy: 96.1,
    neuralConnections: 847,
    knowledgeBase: 92.8
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isQuantumMode, setIsQuantumMode] = useState(false);

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        const now = new Date();
        const voltage = 3.7 + Math.random() * 0.6;
        const current = 2.0 + Math.random() * 0.4;
        const newData: BatteryData = {
          timestamp: now.toLocaleTimeString(),
          voltage,
          current,
          temperature: 30 + Math.random() * 8,
          capacity: 80 + Math.random() * 20,
          health: 90 + Math.random() * 10,
          power: voltage * current,
          impedance: 40 + Math.random() * 15,
          efficiency: 90 + Math.random() * 8
        };

        setBatteryData(prev => [...prev.slice(-19), newData]);
        setCurrentBattery({
          voltage: newData.voltage,
          current: newData.current,
          temperature: newData.temperature,
          capacity: newData.capacity,
          health: newData.health,
          power: newData.power,
          impedance: newData.impedance,
          efficiency: newData.efficiency,
          status: newData.temperature > 35 ? 'Warning' : 'Normal'
        });

        // Update quantum metrics if quantum mode is active
        if (isQuantumMode) {
          setQuantumMetrics(prev => ({
            coherenceTime: Math.max(80, Math.min(100, prev.coherenceTime + (Math.random() - 0.5) * 3)),
            entanglementLevel: Math.max(85, Math.min(100, prev.entanglementLevel + (Math.random() - 0.5) * 2)),
            quantumEfficiency: Math.max(80, Math.min(100, prev.quantumEfficiency + (Math.random() - 0.5) * 2)),
            waveFunction: Math.max(85, Math.min(100, prev.waveFunction + (Math.random() - 0.5) * 2)),
            tunnelProbability: Math.max(70, Math.min(85, prev.tunnelProbability + (Math.random() - 0.5) * 3)),
            superposition: Math.max(80, Math.min(95, prev.superposition + (Math.random() - 0.5) * 2))
          }));
        }

        // Update adaptive learning metrics
        setAdaptiveLearning(prev => ({
          learningRate: Math.max(90, Math.min(100, prev.learningRate + (Math.random() - 0.5) * 1)),
          patternRecognition: Math.max(85, Math.min(100, prev.patternRecognition + (Math.random() - 0.5) * 2)),
          adaptiveAccuracy: Math.max(90, Math.min(100, prev.adaptiveAccuracy + (Math.random() - 0.5) * 1)),
          neuralConnections: prev.neuralConnections + Math.floor(Math.random() * 5),
          knowledgeBase: Math.max(90, Math.min(100, prev.knowledgeBase + (Math.random() - 0.5) * 1))
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isMonitoring, isQuantumMode]);

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'border-red-500/50 bg-red-500/10 text-red-400';
      case 'high': return 'border-orange-500/50 bg-orange-500/10 text-orange-400';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
      case 'low': return 'border-green-500/50 bg-green-500/10 text-green-400';
      default: return 'border-gray-500/50 bg-gray-500/10 text-gray-400';
    }
  };

  const radarData = [
    { metric: 'Voltage', value: (currentBattery.voltage / 4.2) * 100 },
    { metric: 'Current', value: (currentBattery.current / 3) * 100 },
    { metric: 'Temperature', value: ((40 - currentBattery.temperature) / 20) * 100 },
    { metric: 'Capacity', value: currentBattery.capacity },
    { metric: 'Health', value: currentBattery.health },
    { metric: 'Efficiency', value: currentBattery.efficiency }
  ];

  const quantumRadarData = [
    { metric: 'Coherence', value: quantumMetrics.coherenceTime },
    { metric: 'Entanglement', value: quantumMetrics.entanglementLevel },
    { metric: 'Q-Efficiency', value: quantumMetrics.quantumEfficiency },
    { metric: 'Wave Function', value: quantumMetrics.waveFunction },
    { metric: 'Tunneling', value: quantumMetrics.tunnelProbability },
    { metric: 'Superposition', value: quantumMetrics.superposition }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-panel border-electric/30 bg-gradient-to-r from-electric/10 to-lime/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="relative">
              <Activity className="h-8 w-8 text-electric animate-pulse" />
              <div className="absolute inset-0 animate-ping">
                <Cpu className="h-8 w-8 text-electric/30" />
              </div>
            </div>
            Advanced Real-Time Battery Monitor
            <Badge variant={currentBattery.status === 'Normal' ? 'default' : 'destructive'}>
              {currentBattery.status}
            </Badge>
            {isQuantumMode && (
              <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-black font-bold">
                QUANTUM MODE
              </Badge>
            )}
          </CardTitle>
          <p className="text-muted-foreground">
            Real-time monitoring with quantum-enhanced analytics and AI threat detection
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsMonitoring(!isMonitoring)}
              variant={isMonitoring ? "destructive" : "default"}
              className="bg-gradient-to-r from-electric to-lime hover:from-electric/80 hover:to-lime/80"
            >
              {isMonitoring ? 'Stop Monitoring' : 'Start Advanced Monitoring'}
            </Button>
            <Button
              onClick={() => setIsQuantumMode(!isQuantumMode)}
              variant={isQuantumMode ? "secondary" : "outline"}
              className="border-purple-400/50"
            >
              <Waves className="h-4 w-4 mr-2" />
              {isQuantumMode ? 'Disable Quantum' : 'Enable Quantum'}
            </Button>
            {isMonitoring && (
              <div className="flex items-center gap-2 text-electric">
                <div className="h-2 w-2 bg-electric rounded-full animate-pulse" />
                Live Data Stream Active
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="realtime" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 glass-panel">
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Real-time
          </TabsTrigger>
          <TabsTrigger value="quantum" className="flex items-center gap-2">
            <Waves className="h-4 w-4" />
            Quantum
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Threats
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            AI Learning
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Real-time Monitoring */}
        <TabsContent value="realtime" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="glass-panel p-4 text-center border border-electric/30">
              <Battery className="h-6 w-6 mx-auto mb-2 text-electric" />
              <div className="text-xl font-bold text-electric">{currentBattery.voltage.toFixed(2)}V</div>
              <div className="text-xs text-muted-foreground">Voltage</div>
            </div>
            <div className="glass-panel p-4 text-center border border-lime/30">
              <Zap className="h-6 w-6 mx-auto mb-2 text-lime" />
              <div className="text-xl font-bold text-lime">{currentBattery.current.toFixed(2)}A</div>
              <div className="text-xs text-muted-foreground">Current</div>
            </div>
            <div className="glass-panel p-4 text-center border border-orange-400/30">
              <Thermometer className="h-6 w-6 mx-auto mb-2 text-orange-400" />
              <div className="text-xl font-bold text-orange-400">{currentBattery.temperature.toFixed(0)}°C</div>
              <div className="text-xs text-muted-foreground">Temperature</div>
            </div>
            <div className="glass-panel p-4 text-center border border-blue-400/30">
              <Activity className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <div className="text-xl font-bold text-blue-400">{currentBattery.capacity.toFixed(0)}%</div>
              <div className="text-xs text-muted-foreground">Capacity</div>
            </div>
            <div className="glass-panel p-4 text-center border border-green-400/30">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <div className="text-xl font-bold text-green-400">{currentBattery.health.toFixed(0)}%</div>
              <div className="text-xs text-muted-foreground">Health</div>
            </div>
            <div className="glass-panel p-4 text-center border border-purple-400/30">
              <Cpu className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <div className="text-xl font-bold text-purple-400">{currentBattery.power.toFixed(1)}W</div>
              <div className="text-xs text-muted-foreground">Power</div>
            </div>
            <div className="glass-panel p-4 text-center border border-cyan-400/30">
              <Network className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-xl font-bold text-cyan-400">{currentBattery.impedance.toFixed(0)}mΩ</div>
              <div className="text-xs text-muted-foreground">Impedance</div>
            </div>
            <div className="glass-panel p-4 text-center border border-pink-400/30">
              <Target className="h-6 w-6 mx-auto mb-2 text-pink-400" />
              <div className="text-xl font-bold text-pink-400">{currentBattery.efficiency.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Efficiency</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-electric" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                {batteryData.length > 0 && (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={batteryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip />
                        <Area type="monotone" dataKey="efficiency" fill="hsl(var(--electric))" fillOpacity={0.1} />
                        <Line type="monotone" dataKey="voltage" stroke="hsl(var(--electric))" strokeWidth={2} />
                        <Line type="monotone" dataKey="current" stroke="hsl(var(--lime))" strokeWidth={2} />
                        <Bar dataKey="power" fill="hsl(var(--purple))" fillOpacity={0.3} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-electric" />
                  Performance Radar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" className="text-xs" />
                      <PolarRadiusAxis domain={[0, 100]} className="text-xs" />
                      <Radar
                        name="Performance"
                        dataKey="value"
                        stroke="hsl(var(--electric))"
                        fill="hsl(var(--electric))"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Quantum Monitoring */}
        <TabsContent value="quantum" className="space-y-6">
          {!isQuantumMode && (
            <Alert className="border-purple-400/30 bg-purple-500/10">
              <Waves className="h-4 w-4 text-purple-400" />
              <AlertDescription>
                Enable Quantum Mode to access advanced quantum battery analytics and monitoring capabilities.
              </AlertDescription>
            </Alert>
          )}

          {isQuantumMode && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="glass-panel p-4 text-center border border-purple-400/30">
                  <div className="text-xl font-bold text-purple-400">{quantumMetrics.coherenceTime.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Coherence Time</div>
                  <Progress value={quantumMetrics.coherenceTime} className="mt-2 h-1" />
                </div>
                <div className="glass-panel p-4 text-center border border-pink-400/30">
                  <div className="text-xl font-bold text-pink-400">{quantumMetrics.entanglementLevel.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Entanglement</div>
                  <Progress value={quantumMetrics.entanglementLevel} className="mt-2 h-1" />
                </div>
                <div className="glass-panel p-4 text-center border border-cyan-400/30">
                  <div className="text-xl font-bold text-cyan-400">{quantumMetrics.quantumEfficiency.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Q-Efficiency</div>
                  <Progress value={quantumMetrics.quantumEfficiency} className="mt-2 h-1" />
                </div>
                <div className="glass-panel p-4 text-center border border-blue-400/30">
                  <div className="text-xl font-bold text-blue-400">{quantumMetrics.waveFunction.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Wave Function</div>
                  <Progress value={quantumMetrics.waveFunction} className="mt-2 h-1" />
                </div>
                <div className="glass-panel p-4 text-center border border-orange-400/30">
                  <div className="text-xl font-bold text-orange-400">{quantumMetrics.tunnelProbability.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Tunneling</div>
                  <Progress value={quantumMetrics.tunnelProbability} className="mt-2 h-1" />
                </div>
                <div className="glass-panel p-4 text-center border border-green-400/30">
                  <div className="text-xl font-bold text-green-400">{quantumMetrics.superposition.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Superposition</div>
                  <Progress value={quantumMetrics.superposition} className="mt-2 h-1" />
                </div>
              </div>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5 text-electric" />
                    Quantum State Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={quantumRadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" className="text-xs" />
                        <PolarRadiusAxis domain={[0, 100]} className="text-xs" />
                        <Radar
                          name="Quantum Metrics"
                          dataKey="value"
                          stroke="hsl(var(--purple))"
                          fill="hsl(var(--purple))"
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Threat Detection */}
        <TabsContent value="threats" className="space-y-6">
          <div className="grid gap-4">
            {threats.map((threat, index) => (
              <Card key={index} className={`glass-panel border ${getThreatColor(threat.threatLevel)}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {threat.threatType}
                    <Badge className={`ml-auto ${getThreatColor(threat.threatLevel)}`}>
                      {threat.threatLevel.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{threat.description}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-orange-400">{threat.confidence}%</div>
                      <div className="text-xs text-muted-foreground">Confidence</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-blue-400">{threat.timeDetected}</div>
                      <div className="text-xs text-muted-foreground">Detected</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-sm font-bold text-green-400">Ready</div>
                      <div className="text-xs text-muted-foreground">Mitigation</div>
                    </div>
                  </div>
                  <Alert className="mt-4 border-blue-400/30 bg-blue-500/10">
                    <AlertTriangle className="h-4 w-4 text-blue-400" />
                    <AlertDescription>
                      <strong>Suggested Action:</strong> {threat.mitigationSuggested}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Learning */}
        <TabsContent value="learning" className="space-y-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-electric" />
                Adaptive Learning System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="glass-panel p-4 text-center border border-green-400/30">
                  <div className="text-xl font-bold text-green-400">{adaptiveLearning.learningRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Learning Rate</div>
                  <Progress value={adaptiveLearning.learningRate} className="mt-2 h-1" />
                </div>
                <div className="glass-panel p-4 text-center border border-blue-400/30">
                  <div className="text-xl font-bold text-blue-400">{adaptiveLearning.patternRecognition.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Pattern Recognition</div>
                  <Progress value={adaptiveLearning.patternRecognition} className="mt-2 h-1" />
                </div>
                <div className="glass-panel p-4 text-center border border-purple-400/30">
                  <div className="text-xl font-bold text-purple-400">{adaptiveLearning.adaptiveAccuracy.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Adaptive Accuracy</div>
                  <Progress value={adaptiveLearning.adaptiveAccuracy} className="mt-2 h-1" />
                </div>
                <div className="glass-panel p-4 text-center border border-orange-400/30">
                  <div className="text-xl font-bold text-orange-400">{adaptiveLearning.neuralConnections}</div>
                  <div className="text-xs text-muted-foreground">Neural Connections</div>
                </div>
                <div className="glass-panel p-4 text-center border border-cyan-400/30">
                  <div className="text-xl font-bold text-cyan-400">{adaptiveLearning.knowledgeBase.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Knowledge Base</div>
                  <Progress value={adaptiveLearning.knowledgeBase} className="mt-2 h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-4 text-center border border-electric/30">
              <div className="text-2xl font-bold text-electric">99.7%</div>
              <div className="text-xs text-muted-foreground">System Accuracy</div>
            </div>
            <div className="glass-panel p-4 text-center border border-lime/30">
              <div className="text-2xl font-bold text-lime">2.3ms</div>
              <div className="text-xs text-muted-foreground">Response Time</div>
            </div>
            <div className="glass-panel p-4 text-center border border-purple-400/30">
              <div className="text-2xl font-bold text-purple-400">847</div>
              <div className="text-xs text-muted-foreground">Data Points/sec</div>
            </div>
            <div className="glass-panel p-4 text-center border border-cyan-400/30">
              <div className="text-2xl font-bold text-cyan-400">94.2%</div>
              <div className="text-xs text-muted-foreground">Prediction Accuracy</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
