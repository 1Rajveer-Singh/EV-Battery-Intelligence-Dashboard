import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Sparkles, TrendingUp, AlertCircle, Lightbulb, Target, Zap } from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'optimization' | 'prediction' | 'alert' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  priority: number;
}

interface AIAnalysis {
  overallScore: number;
  insights: AIInsight[];
  recommendations: string[];
  predictions: {
    healthIn6Months: number;
    optimalChargingPattern: string;
    expectedLifespan: number;
  };
}

export const AIBatteryInsights = () => {
  const [analysis, setAnalysis] = useState<AIAnalysis>({
    overallScore: 92,
    insights: [
      {
        id: '1',
        type: 'optimization',
        title: 'Charging Pattern Optimization',
        description: 'Your charging pattern can be optimized to extend lifespan by 12%. Consider charging between 20-80% more frequently.',
        confidence: 94,
        impact: 'high',
        actionable: true,
        priority: 1
      },
      {
        id: '2',
        type: 'prediction',
        title: 'Temperature Impact Analysis',
        description: 'Current temperature patterns suggest 3% faster degradation. Parking in shade could improve longevity.',
        confidence: 87,
        impact: 'medium',
        actionable: true,
        priority: 2
      },
      {
        id: '3',
        type: 'alert',
        title: 'Cell Voltage Imbalance',
        description: 'Minor voltage imbalance detected. Recommend deep balancing cycle within 2 weeks.',
        confidence: 96,
        impact: 'medium',
        actionable: true,
        priority: 3
      },
      {
        id: '4',
        type: 'recommendation',
        title: 'Optimal Usage Pattern',
        description: 'AI recommends reducing fast charging to 2x per week for optimal health maintenance.',
        confidence: 91,
        impact: 'high',
        actionable: true,
        priority: 1
      }
    ],
    recommendations: [
      'Implement smart charging schedule',
      'Monitor temperature more closely',
      'Schedule balancing cycle',
      'Adjust fast charging frequency'
    ],
    predictions: {
      healthIn6Months: 84,
      optimalChargingPattern: '20-80% daily, full cycle weekly',
      expectedLifespan: 8.3
    }
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runNewAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(prev => ({
        ...prev,
        overallScore: Math.max(85, Math.min(100, prev.overallScore + (Math.random() - 0.5) * 4)),
        insights: prev.insights.map(insight => ({
          ...insight,
          confidence: Math.max(80, Math.min(100, insight.confidence + (Math.random() - 0.5) * 6))
        }))
      }));
      setIsAnalyzing(false);
    }, 3000);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <TrendingUp className="w-4 h-4" />;
      case 'prediction': return <Brain className="w-4 h-4" />;
      case 'alert': return <AlertCircle className="w-4 h-4" />;
      case 'recommendation': return <Lightbulb className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'text-lime border-lime/30 bg-lime/10';
      case 'prediction': return 'text-electric border-electric/30 bg-electric/10';
      case 'alert': return 'text-warning border-warning/30 bg-warning/10';
      case 'recommendation': return 'text-cyan border-cyan/30 bg-cyan/10';
      default: return 'text-muted-foreground border-muted-foreground/30 bg-muted/10';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-lime';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-electric/20 premium-glow">
            <Brain className="w-6 h-6 text-electric" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-glow">AI Battery Intelligence</h2>
            <p className="text-sm text-muted-foreground">Neural network-powered insights & optimization</p>
          </div>
        </div>
        
        <Button 
          onClick={runNewAnalysis}
          disabled={isAnalyzing}
          className="bg-electric/20 hover:bg-electric/30 text-electric border border-electric/50 premium-glow"
        >
          {isAnalyzing ? (
            <>
              <Brain className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Refresh Analysis
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall AI Score */}
        <Card className="data-visualization p-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--border))"
                  strokeWidth="6"
                  fill="none"
                  className="opacity-20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--ev-electric-blue))"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(analysis.overallScore / 100) * 251} 251`}
                  className="transition-all duration-2000 neon-glow"
                  style={{ color: 'hsl(var(--ev-electric-blue))' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-electric text-glow">
                  {analysis.overallScore}
                </span>
                <span className="text-xs text-muted-foreground">AI Score</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge className="bg-electric/20 text-electric border-electric/30">
                Neural Analysis Active
              </Badge>
              <div className="text-xs text-muted-foreground">
                Confidence: {Math.round(analysis.insights.reduce((acc, i) => acc + i.confidence, 0) / analysis.insights.length)}%
              </div>
            </div>
          </div>
        </Card>

        {/* Key Predictions */}
        <Card className="data-visualization p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-lime" />
            <span className="text-sm font-medium">AI Predictions</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Health in 6 months</span>
                <span className="text-sm font-medium text-lime">
                  {analysis.predictions.healthIn6Months}%
                </span>
              </div>
              <Progress value={analysis.predictions.healthIn6Months} className="h-2" />
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-1">Expected Lifespan</div>
              <div className="text-lg font-bold text-electric text-glow">
                {analysis.predictions.expectedLifespan} years
              </div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-1">Optimal Pattern</div>
              <div className="text-xs text-foreground p-2 rounded bg-muted/20 border border-border/30">
                {analysis.predictions.optimalChargingPattern}
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="data-visualization p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">Smart Actions</span>
          </div>
          
          <div className="space-y-3">
            {analysis.recommendations.slice(0, 4).map((rec, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                <span className="text-sm flex-1">{rec}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Insights */}
      <Card className="data-visualization p-6">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5 text-electric" />
          <span className="text-lg font-semibold">Detailed AI Insights</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.insights
            .sort((a, b) => b.priority - a.priority)
            .map((insight) => (
              <div 
                key={insight.id}
                className={`p-4 rounded-lg border transition-all hover:scale-105 ${getInsightColor(insight.type)} premium-glow`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-sm font-semibold">{insight.title}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getImpactColor(insight.impact)}`}
                      >
                        {insight.impact} impact
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3">
                      {insight.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-muted-foreground">Confidence: </span>
                        <span className="font-medium">{insight.confidence}%</span>
                      </div>
                      
                      {insight.actionable && (
                        <Badge className="bg-lime/20 text-lime text-xs">
                          Actionable
                        </Badge>
                      )}
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