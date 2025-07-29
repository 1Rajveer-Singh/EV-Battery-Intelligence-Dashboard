import { useState, useRef, useEffect } from "react";
import { Bell, Settings, User, Battery, LogOut, QrCode, Camera, Shield, Palette, Database, Wifi, Smartphone, UserCircle, Activity, Zap, AlertTriangle, CheckCircle, Info, Edit, Save, X, Mail, Phone, MapPin, Calendar, Globe, Briefcase, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TopNavbarProps {
  onSettingsOpen?: () => void;
  onNotificationsOpen?: () => void;
  activeNotifications?: number;
}

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'battery' | 'system' | 'update' | 'security';
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  bio: string;
  website: string;
  joinDate: string;
  batteryPreference: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  theme: 'dark' | 'light' | 'auto';
  language: string;
}

interface BatteryJourney {
  date: string;
  event: string;
  description: string;
  impact: number;
  type: 'charge' | 'discharge' | 'maintenance' | 'upgrade';
}

export const TopNavbar = ({ onSettingsOpen, onNotificationsOpen, activeNotifications }: TopNavbarProps) => {
  const [profileImage, setProfileImage] = useState<string>("");
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [qrCodeEnabled, setQrCodeEnabled] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "Alex",
    lastName: "Thompson", 
    email: "alex.thompson@batteryeco.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    company: "Tesla Energy Solutions",
    bio: "Passionate about sustainable energy and advanced battery technologies. Working towards a cleaner future through innovative battery management systems.",
    website: "https://alexthompson.dev",
    joinDate: "January 2024",
    batteryPreference: "lithium-ion",
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    theme: 'dark',
    language: 'en'
  });

  const [batteryJourney] = useState<BatteryJourney[]>([
    {
      date: "2024-07-29",
      event: "Battery Health Optimization",
      description: "Implemented quantum-level molecular analysis for 23% efficiency improvement",
      impact: 95,
      type: "upgrade"
    },
    {
      date: "2024-07-28", 
      event: "Preventive Maintenance",
      description: "Performed thermal calibration and electrolyte balance check",
      impact: 87,
      type: "maintenance"
    },
    {
      date: "2024-07-27",
      event: "Fast Charging Session",
      description: "Optimized charging protocol reduced charging time by 15%",
      impact: 92,
      type: "charge"
    },
    {
      date: "2024-07-26",
      event: "Deep Discharge Cycle",
      description: "Completed full discharge cycle for capacity recalibration",
      impact: 78,
      type: "discharge"
    },
    {
      date: "2024-07-25",
      event: "AI Model Update",
      description: "Neural network model updated with latest degradation patterns",
      impact: 96,
      type: "upgrade"
    }
  ]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "Quantum Analysis Complete",
      message: "Advanced molecular-level analysis has identified 23% optimization potential in your battery system.",
      time: "2 min ago",
      unread: true,
      type: 'success',
      category: 'battery'
    },
    {
      id: 2,
      title: "Predictive Maintenance Alert",
      message: "Battery cell #3 showing early degradation signs. Recommended replacement in 45 days.",
      time: "15 min ago", 
      unread: true,
      type: 'warning',
      category: 'battery'
    },
    {
      id: 3,
      title: "System Update Available",
      message: "New AI model v2.1 available with improved prediction accuracy (97.8%).",
      time: "1 hour ago",
      unread: false,
      type: 'info',
      category: 'update'
    },
    {
      id: 4,
      title: "Temperature Threshold Exceeded",
      message: "Battery temperature reached 42°C. Cooling system activated automatically.",
      time: "2 hours ago",
      unread: false,
      type: 'warning',
      category: 'system'
    },
    {
      id: 5,
      title: "Optimization Success",
      message: "Charging protocol optimization completed successfully. 15% faster charging achieved.",
      time: "3 hours ago",
      unread: false,
      type: 'success',
      category: 'battery'
    },
    {
      id: 6,
      title: "Security Scan Complete",
      message: "Weekly security scan completed. No vulnerabilities detected.",
      time: "1 day ago",
      unread: false,
      type: 'success',
      category: 'security'
    }
  ]);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const notificationTypes = [
        {
          title: "Real-time Update",
          messages: [
            "Battery voltage stabilized at 402.1V",
            "Charging efficiency optimized to 94.7%",
            "Temperature regulation system activated",
            "Neural network learning completed",
            "Fleet management sync successful"
          ],
          type: 'info' as const,
          category: 'system' as const
        },
        {
          title: "AI Insight",
          messages: [
            "Predictive model accuracy improved",
            "Battery lifespan extended by 180 days",
            "Usage pattern optimization detected",
            "Anomaly detection system updated"
          ],
          type: 'success' as const,
          category: 'update' as const
        }
      ];

      const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];
      
      const newNotification: NotificationItem = {
        id: Date.now(),
        title: randomType.title,
        message: randomMessage,
        time: "just now",
        unread: true,
        type: randomType.type,
        category: randomType.category
      };

      setNotificationsList(prev => [newNotification, ...prev.slice(0, 9)]); // Keep only 10 latest
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        toast.success("Profile image updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    setIsEditingProfile(false);
    toast.success("Profile updated successfully!");
  };

  const handleProfileInputChange = (field: keyof UserProfile, value: any) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: keyof UserProfile['notifications'], value: boolean) => {
    setUserProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, unread: false })));
    toast.success("All notifications marked as read");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'error': return <X className="h-4 w-4 text-red-400" />;
      default: return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  const getJourneyIcon = (type: string) => {
    switch (type) {
      case 'charge': return <Zap className="h-4 w-4 text-green-400" />;
      case 'discharge': return <Battery className="h-4 w-4 text-orange-400" />;
      case 'maintenance': return <Settings className="h-4 w-4 text-blue-400" />;
      case 'upgrade': return <Activity className="h-4 w-4 text-purple-400" />;
      default: return <Info className="h-4 w-4 text-gray-400" />;
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const openQrWindow = () => {
    if (!qrEnabled) {
      toast.error("QR Scanner is disabled. Enable it in settings first.");
      return;
    }

    const qrWindow = window.open('', 'QR_Scanner', 'width=600,height=700,resizable=yes,scrollbars=yes');
    if (qrWindow) {
      qrWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>EV Intelligence - QR Scanner</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
                color: white;
                margin: 0;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                min-height: 100vh;
                overflow-x: hidden;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .header h1 {
                background: linear-gradient(135deg, #22c55e, #3b82f6);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 28px;
                margin: 0;
                font-weight: bold;
              }
              .qr-container {
                background: rgba(255, 255, 255, 0.08);
                border-radius: 24px;
                padding: 40px;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(34, 197, 94, 0.3);
                text-align: center;
                box-shadow: 0 25px 50px rgba(34, 197, 94, 0.15);
                max-width: 400px;
                width: 100%;
                position: relative;
              }
              .qr-code {
                width: 220px;
                height: 220px;
                background: linear-gradient(135deg, #ffffff, #f8fafc);
                margin: 20px auto;
                border-radius: 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: 'Courier New', monospace;
                font-size: 10px;
                color: #1e293b;
                box-shadow: inset 0 2px 10px rgba(0,0,0,0.1);
                border: 3px solid #22c55e;
              }
              .device-id {
                margin-top: 15px;
                font-size: 11px;
                color: #64748b;
                font-weight: 600;
              }
              .status-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-top: 25px;
              }
              .status-card {
                background: rgba(34, 197, 94, 0.1);
                border-radius: 12px;
                padding: 15px;
                border: 1px solid rgba(34, 197, 94, 0.2);
                text-align: center;
              }
              .status-icon {
                font-size: 24px;
                margin-bottom: 8px;
                display: block;
              }
              .button-group {
                display: flex;
                gap: 15px;
                margin-top: 30px;
                flex-wrap: wrap;
                justify-content: center;
              }
              .btn {
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 12px;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
                transition: all 0.3s ease;
                min-width: 120px;
              }
              .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
              }
              .btn-secondary {
                background: linear-gradient(135deg, #64748b, #475569);
              }
              .pulse {
                animation: pulse 2s infinite;
              }
              .glow {
                animation: glow 3s ease-in-out infinite alternate;
              }
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
              }
              @keyframes glow {
                from { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
                to { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
              }
              .connecting {
                color: #fbbf24;
                animation: pulse 1s infinite;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🔋 EV Intelligence Platform</h1>
              <p>Advanced Battery Management System</p>
            </div>
            
            <div class="qr-container glow">
              <h2 style="margin-top: 0; color: #22c55e;">� Device Connection Portal</h2>
              <p style="margin-bottom: 20px; opacity: 0.8;">Scan with your EV device or mobile app</p>
              
              <div class="qr-code pulse">
                <div style="font-size: 12px; font-weight: bold; margin-bottom: 10px;">EV-DASH-QR</div>
                <div style="line-height: 1.2;">
                  ██████████████████<br/>
                  ██ ▄▄▄▄▄ █▀ █▄ ▄██<br/>
                  ██ █   █ █▀▀▀█  ██<br/>
                  ██ █▄▄▄█ ██▄ ▀ ███<br/>
                  ██▄▄▄▄▄▄▄█ ▀ █ ▀██<br/>
                  ██ ▄▀ ▄ ▄▀▀▀█▄▄ ██<br/>
                  ██▄█▄█▄▄█▄▄██▄▄██<br/>
                </div>
                <div class="device-id">
                  ID: EV-${Math.random().toString(36).substr(2, 8).toUpperCase()}
                </div>
              </div>
              
              <div class="status-grid">
                <div class="status-card">
                  <span class="status-icon">🔒</span>
                  <div style="font-size: 12px; font-weight: 600;">Secure</div>
                  <div style="font-size: 10px; opacity: 0.7;">End-to-End Encrypted</div>
                </div>
                <div class="status-card">
                  <span class="status-icon connecting">📶</span>
                  <div style="font-size: 12px; font-weight: 600;">Scanning</div>
                  <div style="font-size: 10px; opacity: 0.7;">Waiting for device...</div>
                </div>
              </div>
              
              <div class="button-group">
                <button class="btn" onclick="refreshQR()">🔄 Refresh QR</button>
                <button class="btn btn-secondary" onclick="window.close()">✕ Close</button>
              </div>
            </div>
            
            <script>
              let refreshCount = 0;
              function refreshQR() {
                refreshCount++;
                const deviceId = 'EV-' + Math.random().toString(36).substr(2, 8).toUpperCase();
                document.querySelector('.device-id').innerHTML = 'ID: ' + deviceId;
                
                if (refreshCount % 3 === 0) {
                  // Simulate successful connection
                  document.querySelector('.connecting').innerHTML = '✅';
                  document.querySelector('.connecting').className = '';
                  document.querySelector('.connecting').parentElement.children[1].innerHTML = 'Connected';
                  document.querySelector('.connecting').parentElement.children[2].innerHTML = 'Device paired successfully';
                  
                  setTimeout(() => {
                    alert('🎉 Device connected successfully!\\n\\nBattery data will now sync with EV Intelligence Platform.');
                  }, 500);
                }
              }
              
              // Auto-refresh every 10 seconds
              setInterval(() => {
                if (Math.random() > 0.7) {
                  refreshQR();
                }
              }, 10000);
            </script>
          </body>
        </html>
      `);
      qrWindow.document.close();
    }
    toast.success("QR Scanner opened! Scan with your EV device.");
  };

  return (
    <nav className="glass-panel border-b border-electric/20 px-6 py-4 mb-6 sticky top-0 z-50 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Battery className="h-9 w-9 text-electric drop-shadow-lg" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime rounded-full animate-pulse shadow-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-electric via-lime to-cyan bg-clip-text text-transparent drop-shadow-sm">
              EV Intelligence Platform
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Activity className="h-3 w-3 text-lime" />
              Next-Generation Battery Analytics & AI Optimization
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* System Status Indicators */}
          <div className="hidden lg:flex items-center gap-4 mr-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel bg-lime/10 border border-lime/30 premium-glow">
              <div className="w-2 h-2 bg-lime rounded-full animate-pulse" />
              <span className="text-xs text-lime font-medium">Neural Active</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel bg-electric/10 border border-electric/30">
              <Zap className="h-3 w-3 text-electric" />
              <span className="text-xs text-electric font-medium">AI Engine</span>
            </div>
          </div>

          {/* Enhanced Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-electric/10 transition-all duration-300 premium-glow">
                <Bell className="h-5 w-5 text-electric" />
                {notificationsList.filter(n => n.unread).length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-xs font-bold animate-pulse">
                    {notificationsList.filter(n => n.unread).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0 glass-panel border-electric/20 backdrop-blur-xl" align="end">
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-electric/10 to-lime/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-electric flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Notifications
                    </h3>
                    <p className="text-xs text-muted-foreground">Real-time system updates</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-xs hover:bg-white/10"
                  >
                    Mark all read
                  </Button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notificationsList.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No notifications yet</p>
                  </div>
                ) : (
                  notificationsList.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                        notification.unread ? 'bg-electric/5' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium truncate">{notification.title}</h4>
                            <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                              {notification.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-muted-foreground/70">{notification.time}</p>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-electric rounded-full animate-pulse" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 border-t border-white/10 bg-gradient-to-r from-background/50 to-background/80">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-xs hover:bg-white/10"
                  onClick={() => onNotificationsOpen?.()}
                >
                  View All Notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Enhanced Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-electric/50 transition-all duration-300 premium-glow">
                <Avatar className="h-10 w-10 border-2 border-electric/30">
                  <AvatarImage src={profileImage || "/placeholder-avatar.jpg"} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-electric to-lime text-primary-foreground font-bold text-sm">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-lime rounded-full border-2 border-background" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 glass-panel border-electric/20 backdrop-blur-xl" align="end">
              <DropdownMenuLabel className="p-4 bg-gradient-to-r from-electric/10 to-lime/10">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-14 w-14 border-2 border-electric/30">
                    <AvatarImage src={profileImage || "/placeholder-avatar.jpg"} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-electric to-lime text-primary-foreground text-lg font-bold">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base truncate">{userName}</p>
                    <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-lime rounded-full animate-pulse" />
                      <span className="text-xs text-lime font-medium">Online</span>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              
              {/* Profile Management */}
              <DropdownMenuItem className="cursor-pointer p-3 hover:bg-white/10" onClick={() => fileInputRef.current?.click()}>
                <Camera className="mr-3 h-4 w-4 text-electric" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Change Photo</span>
                  <span className="text-xs text-muted-foreground">Update profile picture</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer p-3 hover:bg-white/10">
                <UserCircle className="mr-3 h-4 w-4 text-electric" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Edit Profile</span>
                  <span className="text-xs text-muted-foreground">Manage account details</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/10" />

              {/* Settings Dialog */}
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer p-3 hover:bg-white/10" onSelect={(e) => e.preventDefault()}>
                    <Settings className="mr-3 h-4 w-4 text-electric" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Settings</span>
                      <span className="text-xs text-muted-foreground">Configure preferences</span>
                    </div>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto glass-panel border-electric/20 backdrop-blur-xl">
                  <DialogHeader className="pb-4">
                    <DialogTitle className="text-electric text-2xl flex items-center gap-2">
                      <Settings className="h-6 w-6" />
                      Advanced Settings
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      Configure your EV Intelligence Platform preferences and features
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    {/* QR Code Section - Enhanced */}
                    <Card className="feature-card border-lime/30 bg-gradient-to-r from-lime/5 to-electric/5">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <QrCode className="h-5 w-5 text-lime" />
                          QR Device Connection
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Connect and manage EV devices through QR code scanning
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/10">
                          <div className="flex items-center gap-3">
                            <QrCode className="h-4 w-4 text-lime" />
                            <div>
                              <Label className="text-sm font-medium">Enable QR Scanner</Label>
                              <p className="text-xs text-muted-foreground">Allow device connections via QR codes</p>
                            </div>
                          </div>
                          <Switch checked={qrEnabled} onCheckedChange={setQrEnabled} />
                        </div>
                        
                        <Button 
                          onClick={openQrWindow}
                          disabled={!qrEnabled}
                          className="w-full bg-gradient-to-r from-lime to-electric hover:from-lime/80 hover:to-electric/80 transition-all duration-300"
                        >
                          <Smartphone className="h-4 w-4 mr-2" />
                          Open QR Scanner Portal
                        </Button>
                        
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <div className="text-center p-3 rounded-lg bg-background/30 border border-white/10">
                            <div className="text-lg font-bold text-lime">3</div>
                            <div className="text-xs text-muted-foreground">Connected Devices</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-background/30 border border-white/10">
                            <div className="text-lg font-bold text-electric">12</div>
                            <div className="text-xs text-muted-foreground">Total Scans</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* System Preferences */}
                    <Card className="feature-card">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Palette className="h-5 w-5 text-electric" />
                          System Preferences
                        </CardTitle>
                        <CardDescription>Customize your dashboard experience</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-white/10">
                            <div className="flex items-center gap-3">
                              <Palette className="h-4 w-4 text-electric" />
                              <div>
                                <Label className="text-sm font-medium">Dark Theme</Label>
                                <p className="text-xs text-muted-foreground">Toggle between light and dark modes</p>
                              </div>
                            </div>
                            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                          </div>
                          
                          <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-white/10">
                            <div className="flex items-center gap-3">
                              <Bell className="h-4 w-4 text-electric" />
                              <div>
                                <Label className="text-sm font-medium">Push Notifications</Label>
                                <p className="text-xs text-muted-foreground">Receive real-time system alerts</p>
                              </div>
                            </div>
                            <Switch checked={notifications} onCheckedChange={setNotifications} />
                          </div>
                          
                          <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-white/10">
                            <div className="flex items-center gap-3">
                              <Database className="h-4 w-4 text-electric" />
                              <div>
                                <Label className="text-sm font-medium">Auto Data Sync</Label>
                                <p className="text-xs text-muted-foreground">Automatically sync device data</p>
                              </div>
                            </div>
                            <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Advanced Features */}
                    <Card className="feature-card border-electric/30">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Shield className="h-5 w-5 text-electric" />
                          Advanced Features
                        </CardTitle>
                        <CardDescription>Configure advanced system features</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-electric/30 hover:bg-electric/10"
                          onClick={() => {
                            setIsSettingsOpen(false);
                            onSettingsOpen?.();
                          }}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Open Full Settings Panel
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-warning/30 hover:bg-warning/10">
                          <Database className="h-4 w-4 mr-2" />
                          Export System Data
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-cyan/30 hover:bg-cyan/10">
                          <Wifi className="h-4 w-4 mr-2" />
                          Network Diagnostics
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
              </Dialog>

              <DropdownMenuSeparator className="bg-white/10" />
              
              {/* Logout */}
              <DropdownMenuItem 
                className="cursor-pointer p-3 text-destructive focus:text-destructive hover:bg-destructive/10" 
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Logout</span>
                  <span className="text-xs text-muted-foreground">Sign out of your account</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hidden file input for profile picture */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
    </nav>
  );
};
