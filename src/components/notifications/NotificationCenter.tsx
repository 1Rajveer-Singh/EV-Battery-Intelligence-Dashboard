import { useState, useEffect } from "react";
import { X, AlertTriangle, CheckCircle, Info, Zap, Battery, Thermometer, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  batteryId?: string;
  isRead: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Battery Temperature Alert',
      message: 'Battery #EV-001 temperature exceeded 45°C threshold',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      batteryId: 'EV-001',
      isRead: false,
      action: {
        label: 'View Details',
        onClick: () => console.log('Navigate to battery details')
      }
    },
    {
      id: '2',
      type: 'warning',
      title: 'Battery Health Degradation',
      message: 'Battery #EV-002 health dropped below 85%',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      batteryId: 'EV-002',
      isRead: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Charging Cycle Complete',
      message: 'Battery #EV-003 successfully charged to 100%',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      batteryId: 'EV-003',
      isRead: true
    },
    {
      id: '4',
      type: 'info',
      title: 'System Update Available',
      message: 'New AI prediction model v2.1 is ready for deployment',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: false
    },
    {
      id: '5',
      type: 'warning',
      title: 'Maintenance Reminder',
      message: 'Battery #EV-001 is due for scheduled maintenance',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      batteryId: 'EV-001',
      isRead: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-lime" />;
      case 'info':
        return <Info className="h-4 w-4 text-electric" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-destructive/50 bg-destructive/5';
      case 'warning':
        return 'border-warning/50 bg-warning/5';
      case 'success':
        return 'border-lime/50 bg-lime/5';
      case 'info':
        return 'border-electric/50 bg-electric/5';
      default:
        return 'border-white/10';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md glass-panel border-l border-white/10">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-glow">Notifications</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={unreadCount > 0 ? "destructive" : "secondary"}>
                  {unreadCount} unread
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {notifications.length} total
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={onClose} className="premium-glow">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="glass-panel">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-electric" />
                  <div>
                    <div className="text-sm font-bold">3</div>
                    <div className="text-xs text-muted-foreground">Battery Alerts</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-panel">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-lime" />
                  <div>
                    <div className="text-sm font-bold">1</div>
                    <div className="text-xs text-muted-foreground">System Updates</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`glass-panel cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    getNotificationColor(notification.type)
                  } ${!notification.isRead ? 'ring-1 ring-white/20' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <div className="flex items-center gap-1">
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-electric rounded-full" />
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatTimestamp(notification.timestamp)}
                            {notification.batteryId && (
                              <>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">
                                  {notification.batteryId}
                                </Badge>
                              </>
                            )}
                          </div>
                          
                          {notification.action && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs h-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                notification.action?.onClick();
                              }}
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};