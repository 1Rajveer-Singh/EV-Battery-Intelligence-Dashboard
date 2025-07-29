import { useState } from "react";
import { BatteryHealthMeter } from "@/components/BatteryHealthMeter";
import { CircularEconomyVisualizer } from "@/components/CircularEconomyVisualizer";
import { PredictiveDegradationEngine } from "@/components/PredictiveDegradationEngine";
import { QRBatteryScanner } from "@/components/QRBatteryScanner";
import { GamifiedExperience } from "@/components/GamifiedExperience";
import { EnvironmentalImpactTracker } from "@/components/EnvironmentalImpactTracker";
import { RealTimeBatteryMonitor } from "@/components/advanced/RealTimeBatteryMonitor";
import { RealTimeBatteryMonitor as RealTimeBatteryMonitorEnhanced } from "@/components/advanced/RealTimeBatteryMonitorEnhanced";
import { AIBatteryInsights } from "@/components/advanced/AIBatteryInsights";
import { AIBatteryInsights as AIBatteryInsightsEnhanced } from "@/components/advanced/AIBatteryInsightsEnhanced";
import { BatteryComparison } from "@/components/advanced/BatteryComparison";
import { BatteryFleetManager } from "@/components/advanced/BatteryFleetManager";
import { QuantumAIEngine } from "@/components/advanced/QuantumAIEngine";
import { MolecularBatteryAnalytics } from "@/components/advanced/MolecularBatteryAnalytics";
import { AdvancedPredictiveIntelligence } from "@/components/advanced/AdvancedPredictiveIntelligence";
import { TopNavbar } from "@/components/navigation/TopNavbarEnhanced";
import { ParticleSystem } from "@/components/effects/ParticleSystem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Cpu, Zap, Globe, Brain, BarChart3, Activity, Atom, Microscope, TrendingUp, Target, Users } from 'lucide-react';
import dashboardBg from '@/assets/ev-dashboard-bg.jpg';

const Index = () => {

  // Mock data for demonstration
  const batteryData = {
    healthPercentage: 87,
    temperature: 24,
    cycleCount: 1247,
    voltage: 403.2,
  };

  const circularEconomyData = {
    circularScore: 78,
    materialRecovery: {
      lithium: 92,
      cobalt: 85,
      nickel: 78,
      graphite: 95,
    },
  };

  const historicalData = [
    { month: 'Jan', health: 95, temperature: 22, cycles: 850 },
    { month: 'Feb', health: 94, temperature: 24, cycles: 920 },
    { month: 'Mar', health: 92, temperature: 26, cycles: 980 },
    { month: 'Apr', health: 91, temperature: 25, cycles: 1050 },
    { month: 'May', health: 89, temperature: 28, cycles: 1120 },
    { month: 'Jun', health: 87, temperature: 24, cycles: 1200 },
  ];

  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden neural-network-bg"
      style={{
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Enhanced Background overlay with neural effects */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-electric/30 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-lime/30 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-cyan/20 rounded-full animate-ping" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Enhanced TopNavbar */}
        <TopNavbar />

        {/* Ultra-Advanced Dashboard */}
        <main className="container mx-auto px-6 py-8 space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-12">
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

          {/* Section 0: Super Advanced Quantum & AI Analytics */}
          <section>
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
          </section>

          {/* Section 1: Enhanced Real-Time Monitoring & AI */}
          <section>
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
          </section>

          {/* Section 2: Traditional Components Enhanced */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Main Battery Health */}
            <div className="xl:col-span-1">
              <BatteryHealthMeter {...batteryData} />
            </div>

            {/* Right Columns - Enhanced Analytics */}
            <div className="xl:col-span-2 space-y-8">
              <PredictiveDegradationEngine 
                currentHealth={batteryData.healthPercentage}
                historicalData={historicalData}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CircularEconomyVisualizer {...circularEconomyData} />
                <QRBatteryScanner />
              </div>
            </div>
          </section>

          {/* Section 3: Performance Comparison & Fleet Management */}
          <section>
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
                <Tabs defaultValue="comparison" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 glass-panel">
                    <TabsTrigger value="comparison" className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Battery Comparison
                    </TabsTrigger>
                    <TabsTrigger value="fleet" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Fleet Manager
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="comparison" className="space-y-6">
                    <BatteryComparison />
                  </TabsContent>

                  <TabsContent value="fleet" className="space-y-6">
                    <BatteryFleetManager />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* Section 4: Environmental Impact & Gamification */}
          <section>
            <Card className="glass-panel border-lime/30 bg-gradient-to-r from-lime/5 to-green-500/5">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Globe className="h-8 w-8 text-lime animate-bounce" />
                  Environmental & Gamification
                  <Badge className="bg-gradient-to-r from-lime to-green-500 text-black font-bold">
                    ECO-FRIENDLY
                  </Badge>
                </CardTitle>
                <p className="text-muted-foreground">
                  Track environmental impact and enjoy gamified battery optimization
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <EnvironmentalImpactTracker />
                  <GamifiedExperience />
                </div>
              </CardContent>
            </Card>
          </section>
        </main>

        {/* Enhanced Footer */}
        <footer className="border-t border-border/20 backdrop-blur-xl bg-background/60 glass-panel mt-16">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-electric" />
                  <span>© 2024 EV Intelligence Platform</span>
                </div>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">Powered by Neural Networks & Quantum Computing</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Last AI Analysis:</span>
                  <span className="text-electric font-medium">47 seconds ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="status-indicator bg-lime"></div>
                  <span className="text-lime font-medium">All Systems Optimal</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border/20 flex items-center justify-center">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Neural Processing: 99.7% accuracy</span>
                <span>•</span>
                <span>Quantum encryption enabled</span>
                <span>•</span>
                <span>Carbon neutral platform</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
