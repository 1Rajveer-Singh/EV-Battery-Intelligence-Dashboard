import { useState } from "react";
import { X, Monitor, Palette, Zap, Bell, Shield, Database, Wifi, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Record<string, unknown>;
  onSettingsChange: (settings: Record<string, unknown>) => void;
}

export const SettingsPanel = ({ isOpen, onClose, settings, onSettingsChange }: SettingsPanelProps) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const updateSetting = (key: string, value: unknown) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl glass-panel border-l border-white/10 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-glow">Advanced Settings</h2>
              <p className="text-muted-foreground">Customize your EV dashboard experience</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="premium-glow">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Tabs defaultValue="display" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 glass-panel">
              <TabsTrigger value="display" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Display
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Features
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Alerts
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Advanced
              </TabsTrigger>
            </TabsList>

            {/* Display Settings */}
            <TabsContent value="display" className="space-y-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-electric" />
                    Theme & Appearance
                  </CardTitle>
                  <CardDescription>Customize the visual appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <Switch 
                        checked={localSettings.darkMode} 
                        onCheckedChange={(value) => updateSetting('darkMode', value)}
                      />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Animation Speed</Label>
                    <Slider
                      value={[localSettings.animationSpeed || 50]}
                      onValueChange={(value) => updateSetting('animationSpeed', value[0])}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Slow</span>
                      <span>Fast</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Glow Effects</Label>
                      <p className="text-sm text-muted-foreground">Enable premium glow animations</p>
                    </div>
                    <Switch 
                      checked={localSettings.glowEffects} 
                      onCheckedChange={(value) => updateSetting('glowEffects', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Particle Effects</Label>
                      <p className="text-sm text-muted-foreground">Show background particle animations</p>
                    </div>
                    <Switch 
                      checked={localSettings.particleEffects} 
                      onCheckedChange={(value) => updateSetting('particleEffects', value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feature Settings */}
            <TabsContent value="features" className="space-y-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-electric" />
                    Dashboard Features
                  </CardTitle>
                  <CardDescription>Enable or disable dashboard components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'batteryHealthMeter', label: 'Battery Health Meter', desc: 'Main battery status display' },
                    { key: 'circularEconomy', label: 'Circular Economy', desc: 'Material recovery visualization' },
                    { key: 'predictiveDegradation', label: 'Predictive Engine', desc: 'ML-powered battery forecasting' },
                    { key: 'qrScanner', label: 'QR Battery Scanner', desc: 'Battery lifecycle tracking' },
                    { key: 'gamification', label: 'Gamified Experience', desc: 'Badges and achievement system' },
                    { key: 'environmentalTracker', label: 'Environmental Impact', desc: 'CO₂ and efficiency metrics' },
                    { key: 'realTimeMonitor', label: 'Real-time Monitor', desc: 'Live battery data streams' },
                    { key: 'aiInsights', label: 'AI Insights', desc: 'Machine learning analytics' },
                    { key: 'batteryComparison', label: 'Battery Comparison', desc: 'Performance benchmarking' }
                  ].map((feature) => (
                    <div key={feature.key} className="flex items-center justify-between p-3 rounded-lg border border-white/10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Label>{feature.label}</Label>
                          <Badge variant="outline" className="text-xs">Pro</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                      <Switch 
                        checked={localSettings.features?.[feature.key] !== false} 
                        onCheckedChange={(value) => updateSetting('features', { ...localSettings.features, [feature.key]: value })}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alert Settings */}
            <TabsContent value="alerts" className="space-y-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-electric" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Configure alert thresholds and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Battery Health Alert Threshold (%)</Label>
                    <Slider
                      value={[localSettings.healthThreshold || 80]}
                      onValueChange={(value) => updateSetting('healthThreshold', value[0])}
                      max={100}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10%</span>
                      <span className="text-warning">{localSettings.healthThreshold || 80}%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Temperature Alert (°C)</Label>
                    <Slider
                      value={[localSettings.tempThreshold || 45]}
                      onValueChange={(value) => updateSetting('tempThreshold', value[0])}
                      max={60}
                      min={20}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>20°C</span>
                      <span className="text-warning">{localSettings.tempThreshold || 45}°C</span>
                      <span>60°C</span>
                    </div>
                  </div>

                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive alerts via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
                    { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Critical alerts via SMS' },
                    { key: 'soundAlerts', label: 'Sound Alerts', desc: 'Audio notifications' }
                  ].map((alert) => (
                    <div key={alert.key} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>{alert.label}</Label>
                        <p className="text-sm text-muted-foreground">{alert.desc}</p>
                      </div>
                      <Switch 
                        checked={localSettings.notifications?.[alert.key] !== false} 
                        onCheckedChange={(value) => updateSetting('notifications', { ...localSettings.notifications, [alert.key]: value })}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Settings */}
            <TabsContent value="advanced" className="space-y-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-electric" />
                    Data & Performance
                  </CardTitle>
                  <CardDescription>Advanced configuration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Data Refresh Rate (seconds)</Label>
                    <Slider
                      value={[localSettings.refreshRate || 5]}
                      onValueChange={(value) => updateSetting('refreshRate', value[0])}
                      max={60}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1s</span>
                      <span className="text-electric">{localSettings.refreshRate || 5}s</span>
                      <span>60s</span>
                    </div>
                  </div>

                  {[
                    { key: 'dataLogging', label: 'Data Logging', desc: 'Store historical battery data' },
                    { key: 'cloudSync', label: 'Cloud Synchronization', desc: 'Sync data across devices' },
                    { key: 'analyticsTracking', label: 'Analytics Tracking', desc: 'Anonymous usage analytics' },
                    { key: 'debugMode', label: 'Debug Mode', desc: 'Show detailed technical information' },
                    { key: 'experimentalFeatures', label: 'Experimental Features', desc: 'Enable beta features' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>{setting.label}</Label>
                        <p className="text-sm text-muted-foreground">{setting.desc}</p>
                      </div>
                      <Switch 
                        checked={localSettings.advanced?.[setting.key] !== false} 
                        onCheckedChange={(value) => updateSetting('advanced', { ...localSettings.advanced, [setting.key]: value })}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-panel border-warning/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-warning">
                    <Shield className="h-5 w-5" />
                    Reset & Recovery
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full border-warning/50 text-warning hover:bg-warning/10">
                    Reset to Default Settings
                  </Button>
                  <Button variant="outline" className="w-full">
                    Export Settings
                  </Button>
                  <Button variant="outline" className="w-full">
                    Import Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};