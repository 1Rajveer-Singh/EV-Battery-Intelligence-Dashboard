import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Zap, Leaf, Crown, Medal, Target, TrendingUp } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  level: number;
  badge: string;
}

export const GamifiedExperience = () => {
  const [currentLevel, setCurrentLevel] = useState(12);
  const [currentXP, setCurrentXP] = useState(2340);
  const [nextLevelXP] = useState(3000);
  const [ecoScore] = useState(8720);

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'Efficiency Master',
      description: 'Maintain 95%+ battery efficiency for 30 days',
      icon: <Zap className="w-4 h-4" />,
      unlocked: true,
      progress: 30,
      maxProgress: 30,
      rarity: 'epic'
    },
    {
      id: '2',
      name: 'Eco Warrior',
      description: 'Save 1000kg CO₂ through optimal charging',
      icon: <Leaf className="w-4 h-4" />,
      unlocked: true,
      progress: 1250,
      maxProgress: 1000,
      rarity: 'rare'
    },
    {
      id: '3',
      name: 'Cycle Champion',
      description: 'Complete 1000 optimal charge cycles',
      icon: <Target className="w-4 h-4" />,
      unlocked: false,
      progress: 847,
      maxProgress: 1000,
      rarity: 'legendary'
    },
    {
      id: '4',
      name: 'Temperature Guardian',
      description: 'Keep battery in optimal temp range for 7 days',
      icon: <Crown className="w-4 h-4" />,
      unlocked: false,
      progress: 5,
      maxProgress: 7,
      rarity: 'common'
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, username: 'EcoDriver_Pro', score: 12450, level: 18, badge: 'Tesla Master' },
    { rank: 2, username: 'GreenMachine', score: 11280, level: 16, badge: 'Eco Elite' },
    { rank: 3, username: 'BatteryWiz', score: 10890, level: 15, badge: 'Tech Guru' },
    { rank: 4, username: 'You', score: ecoScore, level: currentLevel, badge: 'Rising Star' },
    { rank: 5, username: 'CleanEnergy', score: 8340, level: 12, badge: 'Efficiency Expert' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-muted-foreground border-muted-foreground/30';
      case 'rare': return 'text-electric border-electric/30';
      case 'epic': return 'text-lime border-lime/30';
      case 'legendary': return 'text-warning border-warning/30';
      default: return 'text-muted-foreground border-muted-foreground/30';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'epic': return 'glow-accent';
      case 'legendary': return 'glow-warning';
      default: return '';
    }
  };

  const levelProgress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Player Progress */}
      <Card className="data-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-warning/20 glow-warning">
            <Trophy className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-glow">Your Progress</h3>
            <p className="text-sm text-muted-foreground">Level up through optimal battery usage</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Level Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning" />
                <span className="text-lg font-bold text-warning text-glow">Level {currentLevel}</span>
              </div>
              <span className="text-sm text-muted-foreground">{currentXP} / {nextLevelXP} XP</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
            <div className="text-xs text-muted-foreground text-center">
              {nextLevelXP - currentXP} XP to next level
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-electric/10 border border-electric/30">
              <div className="text-2xl font-bold text-electric text-glow">{ecoScore.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Eco Score</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-lime/10 border border-lime/30">
              <div className="text-2xl font-bold text-lime text-glow">{achievements.filter(a => a.unlocked).length}</div>
              <div className="text-xs text-muted-foreground">Achievements</div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Medal className="w-4 h-4 text-lime" />
              Achievements Progress
            </h4>
            <div className="space-y-3">
              {achievements.slice(0, 2).map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-3 rounded-lg border ${getRarityColor(achievement.rarity)} ${achievement.unlocked ? getRarityGlow(achievement.rarity) : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded ${achievement.unlocked ? 'bg-lime/20' : 'bg-muted/20'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{achievement.name}</span>
                        {achievement.unlocked && <Badge className="bg-lime/20 text-lime text-xs">Unlocked</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <div className="mt-2">
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-1" 
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                          {achievement.progress} / {achievement.maxProgress}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="data-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-electric/20 glow-ring">
            <TrendingUp className="w-5 h-5 text-electric" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-glow">Community Leaderboard</h3>
            <p className="text-sm text-muted-foreground">Top EV efficiency champions</p>
          </div>
        </div>

        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div 
              key={entry.rank} 
              className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                entry.username === 'You' 
                  ? 'bg-electric/10 border border-electric/30 glow-ring' 
                  : 'bg-muted/5 hover:bg-muted/10'
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                entry.rank === 1 ? 'bg-warning/20 text-warning' :
                entry.rank === 2 ? 'bg-muted/30 text-muted-foreground' :
                entry.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                'bg-muted/20 text-muted-foreground'
              }`}>
                {entry.rank === 1 ? <Crown className="w-4 h-4" /> :
                 entry.rank === 2 ? <Medal className="w-4 h-4" /> :
                 entry.rank === 3 ? <Trophy className="w-4 h-4" /> :
                 entry.rank}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${entry.username === 'You' ? 'text-electric text-glow' : ''}`}>
                    {entry.username}
                  </span>
                  <Badge variant="outline" className="text-xs border-muted-foreground/30">
                    {entry.badge}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">Level {entry.level}</div>
              </div>
              
              <div className="text-right">
                <div className={`font-bold ${entry.username === 'You' ? 'text-electric' : 'text-foreground'}`}>
                  {entry.score.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Eco Points</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-lime/10 border border-lime/30">
          <div className="flex items-center gap-2 text-sm">
            <Leaf className="w-4 h-4 text-lime" />
            <span className="text-lime font-medium">Earn points by:</span>
          </div>
          <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-6">
            <li>• Maintaining optimal charging patterns</li>
            <li>• Keeping battery temperature in green zone</li>
            <li>• Participating in circular economy programs</li>
            <li>• Completing weekly challenges</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};