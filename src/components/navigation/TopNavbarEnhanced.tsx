import { useState, useRef, useEffect } from "react";
import { Bell, Settings, User, Battery, LogOut, QrCode, Camera, Shield, Palette, Database, Wifi, Smartphone, UserCircle, Activity, Zap, AlertTriangle, CheckCircle, Info, Edit, Save, X, Mail, Phone, MapPin, Calendar, Globe, Briefcase, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
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
  const [isDragging, setIsDragging] = useState(false);
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

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        toast.success("Profile image updated successfully!");
      };
      reader.onerror = () => {
        toast.error("Failed to upload image. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImage("");
    toast.success("Profile image removed successfully!");
  };

  const handleImageFromCamera = () => {
    // Simulate camera functionality
    toast.info("Camera functionality would be available on mobile devices");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        toast.success("Profile image uploaded successfully via drag & drop!");
      };
      reader.onerror = () => {
        toast.error("Failed to upload image. Please try again.");
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

  return (
    <div className="flex items-center justify-between p-4 glass-panel border-b border-white/10">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Battery className="h-8 w-8 text-electric animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-electric to-lime bg-clip-text text-transparent">
            BatteryEco Pro
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-white/10">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0 glass-panel border-white/20" align="end">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-electric" />
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                )}
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${
                    notification.unread ? 'bg-white/5' : ''
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-electric rounded-full flex-shrink-0 ml-2"></div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          {notification.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Profile */}
        <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-white/10">
                  <Avatar className="h-10 w-10 border-2 border-electric/50">
                    <AvatarImage src={profileImage || ""} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-electric to-lime text-black font-bold">
                      {userProfile.firstName[0]}{userProfile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 glass-panel border-white/20" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-electric/50">
                        <AvatarImage src={profileImage || ""} alt="Profile" />
                        <AvatarFallback className="bg-gradient-to-br from-electric to-lime text-black font-bold text-lg">
                          {userProfile.firstName[0]}{userProfile.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium leading-none">{userProfile.firstName} {userProfile.lastName}</p>
                        <p className="text-xs leading-none text-muted-foreground pt-1">{userProfile.email}</p>
                        <Badge className="w-fit mt-2 bg-gradient-to-r from-electric to-lime text-black">
                          Pro Member
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded bg-background/30">
                        <div className="text-lg font-bold text-green-400">97.3%</div>
                        <div className="text-xs text-muted-foreground">Battery Health</div>
                      </div>
                      <div className="p-2 rounded bg-background/30">
                        <div className="text-lg font-bold text-blue-400">847</div>
                        <div className="text-xs text-muted-foreground">Days Active</div>
                      </div>
                      <div className="p-2 rounded bg-background/30">
                        <div className="text-lg font-bold text-purple-400">23</div>
                        <div className="text-xs text-muted-foreground">Optimizations</div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsSettingsDialogOpen(true)} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-400 hover:text-red-300">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogTrigger>
          <DialogContent className="max-w-2xl glass-panel border-white/20">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <UserCircle className="h-6 w-6 text-electric" />
                {isEditingProfile ? 'Edit Profile' : 'Profile Overview'}
              </DialogTitle>
              <DialogDescription>
                {isEditingProfile ? 'Update your personal information and preferences' : 'View and manage your profile information'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Profile Image */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-2 border-electric/50">
                    <AvatarImage src={profileImage || ""} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-electric to-lime text-black font-bold text-2xl">
                      {userProfile.firstName[0]}{userProfile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {profileImage && !isEditingProfile && (
                    <div className="absolute -top-1 -right-1">
                      <Badge className="h-6 w-6 p-0 rounded-full bg-green-500 hover:bg-green-600">
                        <CheckCircle className="h-3 w-3" />
                      </Badge>
                    </div>
                  )}
                </div>
                {isEditingProfile ? (
                  <div className="flex-1 space-y-4">
                    {/* Drag and Drop Area */}
                    <div 
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                        isDragging 
                          ? 'border-electric bg-electric/10 scale-105' 
                          : 'border-gray-600 hover:border-electric/50 hover:bg-electric/5'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="space-y-3">
                        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-electric to-lime rounded-full flex items-center justify-center">
                          <Camera className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Drag & drop your image here</p>
                          <p className="text-xs text-muted-foreground">or click to browse</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gradient-to-r from-electric/10 to-lime/10 border-electric/30 hover:border-electric/50"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Browse Files
                        </Button>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleImageFromCamera}
                        className="flex-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/30 hover:border-green-400/50"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Camera
                      </Button>
                      {profileImage && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleRemoveProfileImage}
                          className="flex-1 bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-400/30 hover:border-red-400/50 text-red-400 hover:text-red-300"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                    
                    {/* File Requirements */}
                    <div className="bg-background/30 rounded-lg p-3 border border-white/10">
                      <h4 className="text-xs font-medium mb-2 flex items-center gap-2">
                        <Info className="h-3 w-3 text-blue-400" />
                        Upload Requirements
                      </h4>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>• Supported formats: JPEG, PNG, GIF, WebP</p>
                        <p>• Maximum size: 5MB</p>
                        <p>• Recommended: Square images (1:1 ratio)</p>
                        <p>• Minimum resolution: 200x200 pixels</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Profile Picture</div>
                    <div className="text-xs text-muted-foreground">
                      {profileImage ? "Custom image uploaded" : "Using initials as avatar"}
                    </div>
                    {profileImage && (
                      <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Image Active
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Profile Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditingProfile ? (
                    <Input 
                      id="firstName"
                      value={userProfile.firstName}
                      onChange={(e) => handleProfileInputChange('firstName', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 rounded bg-background/30 border border-white/10">
                      {userProfile.firstName}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  {isEditingProfile ? (
                    <Input 
                      id="lastName"
                      value={userProfile.lastName}
                      onChange={(e) => handleProfileInputChange('lastName', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 rounded bg-background/30 border border-white/10">
                      {userProfile.lastName}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditingProfile ? (
                    <Input 
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => handleProfileInputChange('email', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 rounded bg-background/30 border border-white/10 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-400" />
                      {userProfile.email}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  {isEditingProfile ? (
                    <Input 
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) => handleProfileInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 rounded bg-background/30 border border-white/10 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-400" />
                      {userProfile.phone}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  {isEditingProfile ? (
                    <Input 
                      id="location"
                      value={userProfile.location}
                      onChange={(e) => handleProfileInputChange('location', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 rounded bg-background/30 border border-white/10 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-400" />
                      {userProfile.location}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  {isEditingProfile ? (
                    <Input 
                      id="company"
                      value={userProfile.company}
                      onChange={(e) => handleProfileInputChange('company', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 rounded bg-background/30 border border-white/10 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-purple-400" />
                      {userProfile.company}
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  {isEditingProfile ? (
                    <Input 
                      id="website"
                      value={userProfile.website}
                      onChange={(e) => handleProfileInputChange('website', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 rounded bg-background/30 border border-white/10 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-cyan-400" />
                      {userProfile.website}
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditingProfile ? (
                    <Textarea 
                      id="bio"
                      value={userProfile.bio}
                      onChange={(e) => handleProfileInputChange('bio', e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <div className="p-2 rounded bg-background/30 border border-white/10">
                      {userProfile.bio}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                {isEditingProfile ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleProfileSave} className="bg-gradient-to-r from-electric to-lime text-black">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditingProfile(true)} className="bg-gradient-to-r from-electric to-lime text-black">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
          <DialogContent className="max-w-4xl glass-panel border-white/20">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Settings className="h-6 w-6" />
                Settings
              </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="preferences" className="w-full">
              <TabsList className="grid w-full grid-cols-4 glass-panel">
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="battery">Battery Settings</TabsTrigger>
                <TabsTrigger value="journey">Battery Journey</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preferences" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <select className="w-full p-2 rounded glass-panel border border-white/20">
                      <option>Dark Mode</option>
                      <option>Light Mode</option>
                      <option>Auto</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <select className="w-full p-2 rounded glass-panel border border-white/20">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Notifications</Label>
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <span>Enable notifications</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Auto-sync</Label>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <span>Sync data automatically</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="battery" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Battery Alert Threshold</Label>
                    <Slider
                      defaultValue={[20]}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-400">Alert when battery drops below 20%</span>
                  </div>
                  <div className="space-y-2">
                    <Label>Monitoring Frequency</Label>
                    <select className="w-full p-2 rounded glass-panel border border-white/20">
                      <option>Real-time</option>
                      <option>Every 5 minutes</option>
                      <option>Every 15 minutes</option>
                      <option>Every hour</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Temperature Monitoring</Label>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <span>Monitor battery temperature</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Health Predictions</Label>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <span>Enable AI health predictions</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="journey" className="space-y-4">
                <div className="p-6 glass-panel rounded-lg border border-white/20">
                  <h3 className="font-semibold mb-4">Battery Life Journey Tracker</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Battery Cycles</span>
                      <Badge variant="secondary">1,247</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Estimated Health</span>
                      <Badge variant="default" className="bg-green-600">87%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Days Since Purchase</span>
                      <Badge variant="outline">365</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Expected Replacement</span>
                      <Badge variant="destructive">In 2.3 years</Badge>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Label>Journey Milestones</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">First 100 cycles completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">One year of usage milestone</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">1000+ cycles milestone (upcoming)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>Data Export</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Export CSV
                      </Button>
                      <Button variant="outline" size="sm">
                        Export JSON
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Reset Options</Label>
                    <div className="flex gap-2">
                      <Button variant="destructive" size="sm">
                        Reset Settings
                      </Button>
                      <Button variant="destructive" size="sm">
                        Clear All Data
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Developer Options</Label>
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <span>Enable debug mode</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
