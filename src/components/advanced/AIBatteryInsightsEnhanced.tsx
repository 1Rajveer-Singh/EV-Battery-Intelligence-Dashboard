import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar, ScatterChart, Scatter, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';
import { Brain, Cpu, TrendingUp, Lightbulb, Eye, Target, Zap, Activity, Network, Database, Atom, Microscope, ChevronRight, AlertTriangle, CheckCircle, Clock, Star } from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'optimization' | 'prediction' | 'anomaly' | 'maintenance' | 'efficiency';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  timeframe: string;
  relatedMetrics: string[];
  neuralNetworkSource: string;
  quantumAccuracy: number;
}

interface NeuralNetworkMetrics {
  networkId: string;
  name: string;
  accuracy: number;
  learningRate: number;
  neuronCount: number;
  synapseStrength: number;
  processingSpeed: number;
  memoryUtilization: number;
  evolutionStage: number;
  specializationArea: string;
}

interface AdvancedPrediction {
  timeframe: string;
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable' | 'volatile';
  influencingFactors: string[];
  riskLevel: number;
  optimizationPotential: number;
}

interface QuantumInsight {
  category: string;
  title: string;
  description: string;
  quantumCoherence: number;
  entanglementLevel: number;
  superpositionState: number;
  tunnelProbability: number;
  waveFunction: number;
  observationImpact: number;
}

export const AIBatteryInsights = () => {
  const [insights] = useState<AIInsight[]>([
    {
      id: 'ai-001',
      type: 'optimization',
      title: 'Charging Pattern Optimization Detected',
      description: 'Neural network analysis suggests implementing adaptive charging curves can improve lifespan by 34% while maintaining 98% efficiency',
      confidence: 97.3,
      impact: 'high',
      actionable: true,
      timeframe: '2-3 days',
      relatedMetrics: ['charging_efficiency', 'thermal_profile', 'degradation_rate'],
      neuralNetworkSource: 'DeepCharge-Neural-v4.7',
      quantumAccuracy: 94.8
    },
    {
      id: 'ai-002',
      type: 'prediction',
      title: 'Capacity Fade Prediction Model',
      description: 'Advanced LSTM networks predict 15% capacity reduction over next 6 months based on current usage patterns and environmental factors',
      confidence: 89.7,
      impact: 'medium',
      actionable: true,
      timeframe: '6 months',
      relatedMetrics: ['cycle_count', 'temperature_exposure', 'depth_of_discharge'],
      neuralNetworkSource: 'LifePredict-RNN-v3.2',
      quantumAccuracy: 91.2
    },
    {
      id: 'ai-003',
      type: 'anomaly',
      title: 'Thermal Anomaly Pattern Recognition',
      description: 'Convolutional neural networks detected unusual heat distribution patterns indicating potential cell imbalance in sector 3',
      confidence: 85.4,
      impact: 'critical',
      actionable: true,
      timeframe: 'Immediate',
      relatedMetrics: ['thermal_distribution', 'cell_voltage_variance', 'internal_resistance'],
      neuralNetworkSource: 'ThermalVision-CNN-v2.9',
      quantumAccuracy: 88.1
    },
    {
      id: 'ai-004',
      type: 'efficiency',
      title: 'Energy Flow Optimization Discovery',
      description: 'Reinforcement learning algorithms identified 23 micro-optimizations in energy routing that could improve overall efficiency by 12%',
      confidence: 92.1,
      impact: 'high',
      actionable: true,
      timeframe: '1 week',
      relatedMetrics: ['power_routing', 'conversion_efficiency', 'energy_losses'],
      neuralNetworkSource: 'EnergyFlow-RL-v5.1',
      quantumAccuracy: 95.7
    },
    {
      id: 'ai-005',
      type: 'maintenance',
      title: 'Predictive Maintenance Schedule',
      description: 'Transformer neural networks recommend preventive maintenance in 45 days based on degradation trajectory analysis',
      confidence: 88.9,
      impact: 'medium',
      actionable: true,
      timeframe: '45 days',
      relatedMetrics: ['wear_indicators', 'performance_drift', 'component_health'],
      neuralNetworkSource: 'MaintenancePredict-GPT-v1.3',
      quantumAccuracy: 87.4
    }
  ]);

  const [neuralNetworks] = useState<NeuralNetworkMetrics[]>([
    {
      networkId: 'nn-001',
      name: 'DeepCharge Neural Network',
      accuracy: 97.3,
      learningRate: 0.0023,
      neuronCount: 2847,
      synapseStrength: 94.7,
      processingSpeed: 847.3,
      memoryUtilization: 78.2,
      evolutionStage: 4.7,
      specializationArea: 'Charging Optimization'
    },
    {
      networkId: 'nn-002',
      name: 'LifePredict RNN',
      accuracy: 89.7,
      learningRate: 0.0019,
      neuronCount: 1923,
      synapseStrength: 91.2,
      processingSpeed: 623.8,
      memoryUtilization: 82.7,
      evolutionStage: 3.2,
      specializationArea: 'Lifespan Prediction'
    },
    {
      networkId: 'nn-003',
      name: 'ThermalVision CNN',
      accuracy: 85.4,
      learningRate: 0.0031,
      neuronCount: 3421,
      synapseStrength: 88.1,
      processingSpeed: 956.2,
      memoryUtilization: 71.4,
      evolutionStage: 2.9,
      specializationArea: 'Thermal Analysis'
    },
    {
      networkId: 'nn-004',
      name: 'EnergyFlow RL',
      accuracy: 92.1,
      learningRate: 0.0015,
      neuronCount: 2156,
      synapseStrength: 95.7,
      processingSpeed: 734.9,
      memoryUtilization: 85.3,
      evolutionStage: 5.1,
      specializationArea: 'Energy Optimization'
    }
  ]);

  const [predictions] = useState<AdvancedPrediction[]>([
    {
      timeframe: '1 Week',
      metric: 'Capacity',
      currentValue: 89.4,
      predictedValue: 88.7,
      confidence: 96.2,
      trend: 'decreasing',
      influencingFactors: ['Temperature cycling', 'Charge frequency', 'Depth of discharge'],
      riskLevel: 15,
      optimizationPotential: 23
    },
    {
      timeframe: '1 Month',
      metric: 'Efficiency',
      currentValue: 94.2,
      predictedValue: 95.1,
      confidence: 91.8,
      trend: 'increasing',
      influencingFactors: ['Adaptive algorithms', 'Thermal management', 'Load balancing'],
      riskLevel: 8,
      optimizationPotential: 31
    },
    {
      timeframe: '3 Months',
      metric: 'Health Score',
      currentValue: 92.7,
      predictedValue: 89.3,
      confidence: 87.4,
      trend: 'decreasing',
      influencingFactors: ['Calendar aging', 'Cycle count', 'Environmental stress'],
      riskLevel: 28,
      optimizationPotential: 19
    },
    {
      timeframe: '6 Months',
      metric: 'Internal Resistance',
      currentValue: 45.2,
      predictedValue: 52.8,
      confidence: 89.7,
      trend: 'increasing',
      influencingFactors: ['SEI layer growth', 'Electrolyte decomposition', 'Active material loss'],
      riskLevel: 35,
      optimizationPotential: 27
    }
  ]);

  const [quantumInsights] = useState<QuantumInsight[]>([
    {
      category: 'Quantum Tunneling',
      title: 'Ion Transport Enhancement',
      description: 'Quantum tunneling effects show 15% enhancement in lithium ion mobility under specific voltage conditions',
      quantumCoherence: 87.3,
      entanglementLevel: 92.1,
      superpositionState: 78.9,
      tunnelProbability: 84.5,
      waveFunction: 91.7,
      observationImpact: 23.4
    },
    {
      category: 'Quantum Coherence',
      title: 'Electron Pair Dynamics',
      description: 'Coherent electron pairs detected in electrode materials showing improved charge transfer rates',
      quantumCoherence: 94.8,
      entanglementLevel: 88.2,
      superpositionState: 85.6,
      tunnelProbability: 76.3,
      waveFunction: 89.4,
      observationImpact: 18.7
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const steps = [
      'Initializing neural networks...',
      'Loading quantum processors...',
      'Analyzing battery patterns...',
      'Processing historical data...',
      'Running predictive models...',
      'Generating insights...',
      'Optimizing recommendations...',
      'Analysis complete!'
    ];

    for (let i = 0; i < steps.length; i++) {
      setAnalysisProgress((i + 1) / steps.length * 100);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsAnalyzing(false);
    setAnalysisProgress(0);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-400 border-red-400/30 bg-red-500/10';
      case 'high': return 'text-orange-400 border-orange-400/30 bg-orange-500/10';
      case 'medium': return 'text-yellow-400 border-yellow-400/30 bg-yellow-500/10';
      case 'low': return 'text-green-400 border-green-400/30 bg-green-500/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-500/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Target className="h-4 w-4" />;
      case 'prediction': return <TrendingUp className="h-4 w-4" />;
      case 'anomaly': return <AlertTriangle className="h-4 w-4" />;
      case 'maintenance': return <Clock className="h-4 w-4" />;
      case 'efficiency': return <Zap className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-green-400';
      case 'decreasing': return 'text-red-400';
      case 'stable': return 'text-blue-400';
      case 'volatile': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const networkData = neuralNetworks.map(nn => ({
    name: nn.name.split(' ')[0],
    accuracy: nn.accuracy,
    speed: nn.processingSpeed / 10,
    neurons: nn.neuronCount / 100
  }));

  const predictionChart = predictions.map(p => ({
    timeframe: p.timeframe,
    current: p.currentValue,
    predicted: p.predictedValue,
    confidence: p.confidence,
    risk: p.riskLevel,
    optimization: p.optimizationPotential
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-panel border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="relative">
              <Brain className="h-8 w-8 text-purple-400 animate-pulse" />
              <div className="absolute inset-0 animate-ping">
                <Atom className="h-8 w-8 text-purple-400/30" />
              </div>
            </div>
            Advanced AI Battery Insights
            <Badge className="bg-gradient-to-r from-purple-400 to-blue-400 text-black font-bold">
              NEURAL EVOLUTION
            </Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Cutting-edge AI analysis with quantum-enhanced neural networks and predictive intelligence
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 glass-panel">
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="networks" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Neural Networks
          </TabsTrigger>
          <TabsTrigger value="predictions" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="quantum" className="flex items-center gap-2">
            <Atom className="h-4 w-4" />
            Quantum
          </TabsTrigger>
          <TabsTrigger value="evolution" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Evolution
          </TabsTrigger>
        </TabsList>

        {/* AI Insights */}
        <TabsContent value="insights" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={runAIAnalysis}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 animate-spin" />
                  Deep Analysis... {analysisProgress.toFixed(0)}%
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Run Advanced AI Analysis
                </div>
              )}
            </Button>
            {isAnalyzing && (
              <Progress value={analysisProgress} className="flex-1 h-2" />
            )}
          </div>

          <div className="grid gap-4">
            {insights.map((insight, index) => (
              <Card key={index} className={`glass-panel border cursor-pointer transition-all hover:scale-[1.02] ${getImpactColor(insight.impact)}`}
                    onClick={() => setSelectedInsight(insight)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getTypeIcon(insight.type)}
                    {insight.title}
                    <Badge className={`ml-auto ${getImpactColor(insight.impact)}`}>
                      {insight.impact.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{insight.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-green-400">{insight.confidence}%</div>
                      <div className="text-xs text-muted-foreground">Confidence</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-blue-400">{insight.quantumAccuracy}%</div>
                      <div className="text-xs text-muted-foreground">Quantum Accuracy</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-purple-400">{insight.timeframe}</div>
                      <div className="text-xs text-muted-foreground">Timeframe</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-orange-400">{insight.actionable ? 'Yes' : 'No'}</div>
                      <div className="text-xs text-muted-foreground">Actionable</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Source: {insight.neuralNetworkSource}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Neural Networks */}
        <TabsContent value="networks" className="space-y-6">
          <div className="grid gap-6">
            {neuralNetworks.map((network, index) => (
              <Card key={index} className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-electric" />
                    {network.name}
                    <Badge variant="outline" className="ml-auto">
                      v{network.evolutionStage}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Specialized in: {network.specializationArea}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 rounded bg-background/30">
                      <div className="text-xl font-bold text-green-400">{network.accuracy}%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center p-3 rounded bg-background/30">
                      <div className="text-xl font-bold text-blue-400">{network.neuronCount}</div>
                      <div className="text-xs text-muted-foreground">Neurons</div>
                    </div>
                    <div className="text-center p-3 rounded bg-background/30">
                      <div className="text-xl font-bold text-purple-400">{network.processingSpeed}</div>
                      <div className="text-xs text-muted-foreground">Speed (ops/s)</div>
                    </div>
                    <div className="text-center p-3 rounded bg-background/30">
                      <div className="text-xl font-bold text-orange-400">{network.memoryUtilization}%</div>
                      <div className="text-xs text-muted-foreground">Memory</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Synapse Strength</span>
                        <span className="text-green-400">{network.synapseStrength}%</span>
                      </div>
                      <Progress value={network.synapseStrength} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Learning Rate</span>
                        <span className="text-blue-400">{network.learningRate}</span>
                      </div>
                      <Progress value={network.learningRate * 1000} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-electric" />
                Neural Network Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={networkData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="accuracy" fill="hsl(var(--electric))" fillOpacity={0.1} />
                    <Bar dataKey="speed" fill="hsl(var(--purple))" fillOpacity={0.7} />
                    <Line type="monotone" dataKey="neurons" stroke="hsl(var(--lime))" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictions */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid gap-4">
            {predictions.map((prediction, index) => (
              <Card key={index} className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-electric" />
                    {prediction.metric} - {prediction.timeframe}
                    <Badge className={`ml-auto ${getTrendColor(prediction.trend)}`}>
                      {prediction.trend.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-blue-400">{prediction.currentValue}</div>
                      <div className="text-xs text-muted-foreground">Current</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-purple-400">{prediction.predictedValue}</div>
                      <div className="text-xs text-muted-foreground">Predicted</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-green-400">{prediction.confidence}%</div>
                      <div className="text-xs text-muted-foreground">Confidence</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-red-400">{prediction.riskLevel}%</div>
                      <div className="text-xs text-muted-foreground">Risk</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-orange-400">{prediction.optimizationPotential}%</div>
                      <div className="text-xs text-muted-foreground">Optimization</div>
                    </div>
                  </div>

                  <Alert className="border-blue-400/30 bg-blue-500/10">
                    <Eye className="h-4 w-4 text-blue-400" />
                    <AlertDescription>
                      <strong>Key Factors:</strong> {prediction.influencingFactors.join(', ')}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-electric" />
                Prediction Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={predictionChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeframe" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="confidence" fill="hsl(var(--electric))" fillOpacity={0.1} />
                    <Bar dataKey="current" fill="hsl(var(--blue))" />
                    <Bar dataKey="predicted" fill="hsl(var(--purple))" />
                    <Line type="monotone" dataKey="optimization" stroke="hsl(var(--lime))" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quantum Insights */}
        <TabsContent value="quantum" className="space-y-6">
          <div className="grid gap-6">
            {quantumInsights.map((quantum, index) => (
              <Card key={index} className="glass-panel border-purple-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Atom className="h-5 w-5 text-purple-400" />
                    {quantum.title}
                    <Badge className="ml-auto bg-gradient-to-r from-purple-400 to-pink-400 text-black">
                      {quantum.category}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{quantum.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-purple-400">{quantum.quantumCoherence}%</div>
                      <div className="text-xs text-muted-foreground">Coherence</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-pink-400">{quantum.entanglementLevel}%</div>
                      <div className="text-xs text-muted-foreground">Entanglement</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-cyan-400">{quantum.superpositionState}%</div>
                      <div className="text-xs text-muted-foreground">Superposition</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-blue-400">{quantum.tunnelProbability}%</div>
                      <div className="text-xs text-muted-foreground">Tunneling</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-green-400">{quantum.waveFunction}%</div>
                      <div className="text-xs text-muted-foreground">Wave Function</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-orange-400">{quantum.observationImpact}%</div>
                      <div className="text-xs text-muted-foreground">Observer Effect</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Evolution Metrics */}
        <TabsContent value="evolution" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-4 text-center border border-electric/30">
              <div className="text-2xl font-bold text-electric">4.7</div>
              <div className="text-xs text-muted-foreground">Evolution Stage</div>
            </div>
            <div className="glass-panel p-4 text-center border border-purple-400/30">
              <div className="text-2xl font-bold text-purple-400">97.3%</div>
              <div className="text-xs text-muted-foreground">Neural Efficiency</div>
            </div>
            <div className="glass-panel p-4 text-center border border-lime/30">
              <div className="text-2xl font-bold text-lime">2847</div>
              <div className="text-xs text-muted-foreground">Active Neurons</div>
            </div>
            <div className="glass-panel p-4 text-center border border-cyan-400/30">
              <div className="text-2xl font-bold text-cyan-400">94.8%</div>
              <div className="text-xs text-muted-foreground">Quantum Integration</div>
            </div>
          </div>

          <Alert className="border-green-400/30 bg-green-500/10">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription>
              <strong>Neural Evolution Status:</strong> Networks have successfully evolved to stage 4.7 with 97.3% efficiency. 
              Quantum integration at 94.8% enabling unprecedented analytical capabilities.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      {/* Detailed Insight Modal */}
      {selectedInsight && (
        <Card className="fixed inset-4 z-50 glass-panel border-purple-400/50 max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                {getTypeIcon(selectedInsight.type)}
                {selectedInsight.title}
              </span>
              <Button variant="outline" size="sm" onClick={() => setSelectedInsight(null)}>
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{selectedInsight.description}</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Related Metrics</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedInsight.relatedMetrics.map((metric, idx) => (
                    <Badge key={idx} variant="outline">{metric}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Neural Network Source</h4>
                <p className="text-sm text-muted-foreground">{selectedInsight.neuralNetworkSource}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Confidence Level</div>
                  <div className="text-xl font-bold text-green-400">{selectedInsight.confidence}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Quantum Accuracy</div>
                  <div className="text-xl font-bold text-purple-400">{selectedInsight.quantumAccuracy}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
