import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BatteryHealthMeter } from "@/components/BatteryHealthMeter";
import { CircularEconomyVisualizer } from "@/components/CircularEconomyVisualizer";
import { PredictiveDegradationEngine } from "@/components/PredictiveDegradationEngine";
import { EnvironmentalImpactTracker } from "@/components/EnvironmentalImpactTracker";
import { GamifiedExperience } from "@/components/GamifiedExperience";
import { QRBatteryScanner } from "@/components/QRBatteryScanner";
import { TopNavbar } from "@/components/navigation/TopNavbar";
import { SettingsPanel } from "@/components/navigation/SettingsPanel";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { RealTimeBatteryMonitor } from "@/components/advanced/RealTimeBatteryMonitor";
import { RealTimeBatteryMonitor as RealTimeBatteryMonitorEnhanced } from "@/components/advanced/RealTimeBatteryMonitorEnhanced";
import { AIBatteryInsights } from "@/components/advanced/AIBatteryInsights";
import { AIBatteryInsights as AIBatteryInsightsEnhanced } from "@/components/advanced/AIBatteryInsightsEnhanced";
import { BatteryComparison } from "@/components/advanced/BatteryComparison";
import { BatteryFleetManager } from "@/components/advanced/BatteryFleetManager";
import { QuantumAIEngine } from "@/components/advanced/QuantumAIEngine";
import { MolecularBatteryAnalytics } from "@/components/advanced/MolecularBatteryAnalytics";
import { AdvancedPredictiveIntelligence } from "@/components/advanced/AdvancedPredictiveIntelligence";
import { Activity, Zap, Brain, Target, Users, Settings, Atom, Microscope, TrendingUp, Database, Cpu, Network } from 'lucide-react';

const Index = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  // Mock battery data for all components
  const batteryData = {
    currentHealth: 92,
    capacity: 85,
    temperature: 32,
    voltage: 3.7,
    current: 2.1,
    cycles: 247,
    degradationRate: 0.15,
    efficiency: 94.2,
    estimatedLifespan: 847,
    powerOutput: 7.77,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-03-15'
  };

  const notifications = [
    {
      id: '1',
      type: 'info' as const,
      title: 'Battery Optimization Complete',
      message: 'Quantum AI has successfully optimized your battery charging patterns',
      timestamp: new Date(Date.now() - 300000),
      read: false
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Temperature Alert',
      message: 'Battery temperature is approaching upper threshold',
      timestamp: new Date(Date.now() - 600000),
      read: false
    },
    {
      id: '3',
      type: 'success' as const,
      title: 'Molecular Analysis Ready',
      message: 'New insights available from molecular-level battery analysis',
      timestamp: new Date(Date.now() - 900000),
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Neural network background effect */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-electric/20 via-transparent to-lime/20 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lime/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="relative z-10">
        <TopNavbar 
          onSettingsClick={() => setShowSettings(true)}
          onNotificationsClick={() => setShowNotifications(true)} 
          onQRScannerClick={() => setShowQRScanner(true)}
          notifications={notifications}
        />
        
        <main className="container mx-auto px-4 py-6 space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <Activity className="h-12 w-12 text-electric animate-pulse" />
                <div className="absolute inset-0 animate-ping">
                  <Atom className="h-12 w-12 text-electric/30" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-electric via-lime to-cyan-400 bg-clip-text text-transparent">
                Battery Glow Eco
              </h1>
              <div className="relative">
                <Zap className="h-12 w-12 text-lime animate-pulse" />
                <div className="absolute inset-0 animate-ping">
                  <Brain className="h-12 w-12 text-lime/30" />
                </div>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionary EV Battery Analytics Platform with Quantum AI Intelligence, 
              Molecular-Level Analysis, and Advanced Predictive Systems
            </p>
            
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Badge className="bg-gradient-to-r from-electric to-lime text-black font-bold px-4 py-2">
                <Atom className="h-4 w-4 mr-2" />
                QUANTUM POWERED
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-black font-bold px-4 py-2">
                <Brain className="h-4 w-4 mr-2" />
                AI ENHANCED
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-400 to-cyan-400 text-black font-bold px-4 py-2">
                <Microscope className="h-4 w-4 mr-2" />
                MOLECULAR PRECISION
              </Badge>
            </div>
          </div>

          {/* Advanced Quantum & AI Section */}
          <Card className="glass-panel border-electric/30 bg-gradient-to-r from-electric/5 to-purple-500/5">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Atom className="h-8 w-8 text-electric animate-spin" />
                Quantum AI Analytics Suite
                <Badge className="bg-gradient-to-r from-electric to-purple-400 text-black font-bold">
                  SUPER ADVANCED
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground">
                Next-generation battery analysis powered by quantum computing and neural evolution
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="quantum" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 glass-panel">
                  <TabsTrigger value="quantum" className="flex items-center gap-2">
                    <Atom className="h-4 w-4" />
                    Quantum AI Engine
                  </TabsTrigger>
                  <TabsTrigger value="molecular" className="flex items-center gap-2">
                    <Microscope className="h-4 w-4" />
                    Molecular Analytics
                  </TabsTrigger>
                  <TabsTrigger value="predictive" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Predictive Intelligence
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="quantum" className="space-y-6">
                  <QuantumAIEngine />
                </TabsContent>

                <TabsContent value="molecular" className="space-y-6">
                  <MolecularBatteryAnalytics />
                </TabsContent>

                <TabsContent value="predictive" className="space-y-6">
                  <AdvancedPredictiveIntelligence />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Enhanced Monitoring & AI Section */}
          <Card className="glass-panel border-purple-500/30 bg-gradient-to-r from-purple-500/5 to-blue-500/5">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Brain className="h-8 w-8 text-purple-400 animate-pulse" />
                Enhanced Monitoring & AI Intelligence
                <Badge className="bg-gradient-to-r from-purple-400 to-blue-400 text-black font-bold">
                  NEURAL ENHANCED
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground">
                Real-time monitoring with advanced AI insights and neural network analysis
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="monitor" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 glass-panel">
                  <TabsTrigger value="monitor" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Advanced Monitor
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Insights
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="monitor" className="space-y-6">
                  <RealTimeBatteryMonitorEnhanced />
                </TabsContent>

                <TabsContent value="insights" className="space-y-6">
                  <AIBatteryInsightsEnhanced />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Core Analytics Section */}
          <Card className="glass-panel border-lime/30 bg-gradient-to-r from-lime/5 to-cyan-400/5">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Database className="h-8 w-8 text-lime animate-bounce" />
                Core Battery Analytics
                <Badge className="bg-gradient-to-r from-lime to-cyan-400 text-black font-bold">
                  COMPREHENSIVE
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground">
                Comprehensive battery analysis with health monitoring and performance optimization
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="health" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 glass-panel">
                  <TabsTrigger value="health" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Health
                  </TabsTrigger>
                  <TabsTrigger value="degradation" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Degradation
                  </TabsTrigger>
                  <TabsTrigger value="circular" className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Circular Economy
                  </TabsTrigger>
                  <TabsTrigger value="environmental" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Environmental
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="health" className="space-y-6">
                  <BatteryHealthMeter 
                    health={batteryData.currentHealth}
                    capacity={batteryData.capacity}
                    temperature={batteryData.temperature}
                    cycles={batteryData.cycles}
                  />
                </TabsContent>

                <TabsContent value="degradation" className="space-y-6">
                  <PredictiveDegradationEngine />
                </TabsContent>

                <TabsContent value="circular" className="space-y-6">
                  <CircularEconomyVisualizer />
                </TabsContent>

                <TabsContent value="environmental" className="space-y-6">
                  <EnvironmentalImpactTracker />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Fleet Management & Comparison Section */}
          <Card className="glass-panel border-cyan-400/30 bg-gradient-to-r from-cyan-400/5 to-blue-500/5">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Users className="h-8 w-8 text-cyan-400 animate-pulse" />
                Fleet Management & Analysis
                <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold">
                  ENTERPRISE
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground">
                Advanced fleet management with multi-battery comparison and optimization
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="fleet" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 glass-panel">
                  <TabsTrigger value="fleet" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Fleet Manager
                  </TabsTrigger>
                  <TabsTrigger value="comparison" className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Comparison
                  </TabsTrigger>
                  <TabsTrigger value="gamified" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Gamified
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="fleet" className="space-y-6">
                  <BatteryFleetManager />
                </TabsContent>

                <TabsContent value="comparison" className="space-y-6">
                  <BatteryComparison />
                </TabsContent>

                <TabsContent value="gamified" className="space-y-6">
                  <GamifiedExperience />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="glass-panel border-green-400/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-green-400" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded glass-panel border border-electric/30">
                  <div className="text-2xl font-bold text-electric">99.7%</div>
                  <div className="text-xs text-muted-foreground">System Uptime</div>
                </div>
                <div className="text-center p-3 rounded glass-panel border border-lime/30">
                  <div className="text-2xl font-bold text-lime">2.3ms</div>
                  <div className="text-xs text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center p-3 rounded glass-panel border border-purple-400/30">
                  <div className="text-2xl font-bold text-purple-400">847</div>
                  <div className="text-xs text-muted-foreground">Data Points/sec</div>
                </div>
                <div className="text-center p-3 rounded glass-panel border border-cyan-400/30">
                  <div className="text-2xl font-bold text-cyan-400">94.8%</div>
                  <div className="text-xs text-muted-foreground">AI Accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Panels */}
        <SettingsPanel 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)} 
        />
        
        <NotificationCenter 
          isOpen={showNotifications} 
          onClose={() => setShowNotifications(false)}
          notifications={notifications}
        />

        {showQRScanner && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
              <QRBatteryScanner onClose={() => setShowQRScanner(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
