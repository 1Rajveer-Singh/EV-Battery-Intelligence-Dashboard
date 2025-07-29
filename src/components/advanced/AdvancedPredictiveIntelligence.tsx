import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Area, AreaChart } from 'recharts';
import { Brain, TrendingUp, AlertTriangle, Target, Zap, Calendar, Clock, Database, Cpu, Network, Eye, Lightbulb } from 'lucide-react';

interface PredictionModel {
  name: string;
  accuracy: number;
  confidence: number;
  lastUpdated: string;
  predictions: number;
  status: 'active' | 'training' | 'optimizing';
}

interface BatteryPrediction {
  timeframe: string;
  capacityPrediction: number;
  healthScore: number;
  degradationRate: number;
  estimatedLifespan: number;
  confidenceLevel: number;
  riskFactors: string[];
}

interface PerformanceMetric {
  timestamp: string;
  actual: number;
  predicted: number;
  accuracy: number;
  deviation: number;
}

interface SmartRecommendation {
  category: 'optimization' | 'maintenance' | 'replacement' | 'usage';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impactScore: number;
  timeToImplement: string;
  costSaving: number;
}

export const AdvancedPredictiveIntelligence = () => {
  const [models] = useState<PredictionModel[]>([
    {
      name: 'Neural Degradation Model',
      accuracy: 97.8,
      confidence: 94.2,
      lastUpdated: '2 mins ago',
      predictions: 1247,
      status: 'active'
    },
    {
      name: 'Thermal Impact Predictor',
      accuracy: 95.3,
      confidence: 91.7,
      lastUpdated: '5 mins ago',
      predictions: 892,
      status: 'active'
    },
    {
      name: 'Usage Pattern Analyzer',
      accuracy: 96.1,
      confidence: 93.5,
      lastUpdated: '1 min ago',
      predictions: 2134,
      status: 'training'
    },
    {
      name: 'Chemical Aging Model',
      accuracy: 94.7,
      confidence: 89.3,
      lastUpdated: '8 mins ago',
      predictions: 756,
      status: 'optimizing'
    }
  ]);

  const [predictions] = useState<BatteryPrediction[]>([
    {
      timeframe: '1 Week',
      capacityPrediction: 98.7,
      healthScore: 97.2,
      degradationRate: 0.3,
      estimatedLifespan: 847,
      confidenceLevel: 96.8,
      riskFactors: ['Elevated temperature cycles', 'High discharge rates']
    },
    {
      timeframe: '1 Month',
      capacityPrediction: 96.3,
      healthScore: 94.8,
      degradationRate: 1.2,
      estimatedLifespan: 832,
      confidenceLevel: 94.5,
      riskFactors: ['Calendar aging', 'Electrolyte decomposition', 'SEI layer growth']
    },
    {
      timeframe: '3 Months',
      capacityPrediction: 92.1,
      healthScore: 89.7,
      degradationRate: 3.8,
      estimatedLifespan: 798,
      confidenceLevel: 91.2,
      riskFactors: ['Lithium plating', 'Active material loss', 'Impedance growth']
    },
    {
      timeframe: '6 Months',
      capacityPrediction: 87.4,
      healthScore: 83.2,
      degradationRate: 7.1,
      estimatedLifespan: 743,
      confidenceLevel: 87.9,
      riskFactors: ['Structural changes', 'Gas evolution', 'Current collector corrosion']
    },
    {
      timeframe: '1 Year',
      capacityPrediction: 79.8,
      healthScore: 74.5,
      degradationRate: 12.3,
      estimatedLifespan: 672,
      confidenceLevel: 82.4,
      riskFactors: ['Severe capacity fade', 'Thermal runaway risk', 'Safety concerns']
    }
  ]);

  const [performanceHistory] = useState<PerformanceMetric[]>([
    { timestamp: '00:00', actual: 95.2, predicted: 94.8, accuracy: 99.6, deviation: 0.4 },
    { timestamp: '04:00', actual: 94.7, predicted: 94.9, accuracy: 99.8, deviation: -0.2 },
    { timestamp: '08:00', actual: 93.8, predicted: 93.5, accuracy: 99.7, deviation: 0.3 },
    { timestamp: '12:00', actual: 94.1, predicted: 94.2, accuracy: 99.9, deviation: -0.1 },
    { timestamp: '16:00', actual: 95.3, predicted: 95.1, accuracy: 99.8, deviation: 0.2 },
    { timestamp: '20:00', actual: 94.9, predicted: 95.0, accuracy: 99.9, deviation: -0.1 },
    { timestamp: '24:00', actual: 95.6, predicted: 95.4, accuracy: 99.8, deviation: 0.2 }
  ]);

  const [recommendations] = useState<SmartRecommendation[]>([
    {
      category: 'optimization',
      priority: 'high',
      title: 'Optimize Charging Protocol',
      description: 'Implement adaptive charging to reduce lithium plating and extend lifespan by 23%',
      impactScore: 8.7,
      timeToImplement: '2-3 days',
      costSaving: 4250
    },
    {
      category: 'maintenance',
      priority: 'medium',
      title: 'Temperature Management Upgrade',
      description: 'Enhanced thermal regulation will improve performance by 15% and reduce degradation',
      impactScore: 7.2,
      timeToImplement: '1 week',
      costSaving: 2890
    },
    {
      category: 'usage',
      priority: 'low',
      title: 'Usage Pattern Optimization',
      description: 'Adjust discharge patterns during peak hours to minimize stress and improve efficiency',
      impactScore: 6.4,
      timeToImplement: '1 day',
      costSaving: 1560
    },
    {
      category: 'replacement',
      priority: 'critical',
      title: 'Proactive Cell Replacement',
      description: 'Replace cells showing early degradation signs in 45 days to prevent cascade failure',
      impactScore: 9.3,
      timeToImplement: '6 weeks',
      costSaving: 8750
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const runPredictiveAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const steps = [
      'Initializing neural networks...',
      'Processing historical data...',
      'Training predictive models...',
      'Analyzing degradation patterns...',
      'Calculating risk assessments...',
      'Generating recommendations...',
      'Optimizing predictions...',
      'Analysis complete!'
    ];

    for (let i = 0; i < steps.length; i++) {
      setAnalysisProgress((i + 1) / steps.length * 100);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setIsAnalyzing(false);
    setAnalysisProgress(0);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 border-red-400/30 bg-red-500/10';
      case 'high': return 'text-orange-400 border-orange-400/30 bg-orange-500/10';
      case 'medium': return 'text-yellow-400 border-yellow-400/30 bg-yellow-500/10';
      case 'low': return 'text-green-400 border-green-400/30 bg-green-500/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'training': return 'text-blue-400';
      case 'optimizing': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-panel border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="relative">
              <Brain className="h-8 w-8 text-blue-400 animate-pulse" />
              <div className="absolute inset-0 animate-ping">
                <Cpu className="h-8 w-8 text-blue-400/30" />
              </div>
            </div>
            Advanced Predictive Intelligence
            <Badge className="bg-gradient-to-r from-blue-400 to-cyan-400 text-black font-bold">
              AI POWERED
            </Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Next-generation AI models for battery performance prediction and optimization
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 glass-panel">
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="predictions" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* AI Models */}
        <TabsContent value="models" className="space-y-6">
          <div className="grid gap-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-electric" />
                  Active Prediction Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {models.map((model, index) => (
                    <div key={index} className="p-4 rounded-lg bg-background/30 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{model.name}</h4>
                        <Badge className={getStatusColor(model.status)}>
                          {model.status}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Accuracy</span>
                          <span className="text-green-400 font-semibold">{model.accuracy}%</span>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Confidence</span>
                          <span className="text-blue-400 font-semibold">{model.confidence}%</span>
                        </div>
                        <Progress value={model.confidence} className="h-2" />
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{model.predictions} predictions</span>
                          <span>{model.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button 
                    onClick={runPredictiveAnalysis}
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 animate-spin" />
                        Running Analysis... {analysisProgress.toFixed(0)}%
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Run Advanced Prediction Analysis
                      </div>
                    )}
                  </Button>
                  {isAnalyzing && (
                    <Progress value={analysisProgress} className="mt-3 h-2" />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Predictions */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid gap-6">
            {predictions.map((prediction, index) => (
              <Card key={index} className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-electric" />
                    {prediction.timeframe} Prediction
                    <Badge variant="outline" className="ml-auto">
                      {prediction.confidenceLevel}% Confidence
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 rounded-lg bg-background/30 border border-green-400/20">
                      <div className="text-xl font-bold text-green-400">{prediction.capacityPrediction}%</div>
                      <div className="text-xs text-muted-foreground">Capacity</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-background/30 border border-blue-400/20">
                      <div className="text-xl font-bold text-blue-400">{prediction.healthScore}%</div>
                      <div className="text-xs text-muted-foreground">Health Score</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-background/30 border border-orange-400/20">
                      <div className="text-xl font-bold text-orange-400">{prediction.degradationRate}%</div>
                      <div className="text-xs text-muted-foreground">Degradation</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-background/30 border border-purple-400/20">
                      <div className="text-xl font-bold text-purple-400">{prediction.estimatedLifespan}</div>
                      <div className="text-xs text-muted-foreground">Days Left</div>
                    </div>
                  </div>
                  
                  {prediction.riskFactors.length > 0 && (
                    <Alert className="border-yellow-400/30 bg-yellow-500/10">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <AlertDescription>
                        <strong>Risk Factors:</strong> {prediction.riskFactors.join(', ')}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-electric" />
                Prediction vs. Actual Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={performanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="actual" fill="hsl(var(--electric))" fillOpacity={0.1} />
                    <Line type="monotone" dataKey="actual" stroke="hsl(var(--electric))" strokeWidth={3} />
                    <Line type="monotone" dataKey="predicted" stroke="hsl(var(--lime))" strokeWidth={2} strokeDasharray="5 5" />
                    <Bar dataKey="deviation" fill="hsl(var(--orange))" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 rounded-lg bg-background/30 border border-green-400/20">
                  <div className="text-xl font-bold text-green-400">99.7%</div>
                  <div className="text-xs text-muted-foreground">Average Accuracy</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/30 border border-blue-400/20">
                  <div className="text-xl font-bold text-blue-400">0.18</div>
                  <div className="text-xs text-muted-foreground">Mean Deviation</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/30 border border-purple-400/20">
                  <div className="text-xl font-bold text-purple-400">847</div>
                  <div className="text-xs text-muted-foreground">Predictions Made</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-4">
            {recommendations.map((rec, index) => (
              <Card key={index} className={`glass-panel border ${getPriorityColor(rec.priority)}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-electric" />
                    {rec.title}
                    <Badge className={`ml-auto ${getPriorityColor(rec.priority)}`}>
                      {rec.priority.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{rec.description}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-green-400">{rec.impactScore}/10</div>
                      <div className="text-xs text-muted-foreground">Impact Score</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-blue-400">{rec.timeToImplement}</div>
                      <div className="text-xs text-muted-foreground">Time to Implement</div>
                    </div>
                    <div className="text-center p-2 rounded bg-background/30">
                      <div className="text-lg font-bold text-purple-400">${rec.costSaving}</div>
                      <div className="text-xs text-muted-foreground">Potential Savings</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
