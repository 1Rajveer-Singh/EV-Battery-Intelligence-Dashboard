import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Scan, History, MapPin, Calendar, Cpu } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface BatteryJourney {
  id: string;
  manufactureDate: string;
  manufacturer: string;
  location: string;
  previousOwners: number;
  totalCycles: number;
  recyclingPath: string[];
  certifications: string[];
}

export const QRBatteryScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [batteryJourney, setBatteryJourney] = useState<BatteryJourney | null>(null);

  const mockBatteryData: BatteryJourney = {
    id: "EV-BAT-78492-LFP",
    manufactureDate: "2022-03-15",
    manufacturer: "Tesla Gigafactory 1",
    location: "Nevada, USA",
    previousOwners: 2,
    totalCycles: 847,
    recyclingPath: ["Primary Use", "Secondary Market", "Material Recovery", "New Battery"],
    certifications: ["ISO 14001", "RBA Certified", "Carbon Neutral"]
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setBatteryJourney(mockBatteryData);
    }, 2000);
  };

  const resetScan = () => {
    setBatteryJourney(null);
  };

  return (
    <Card className="data-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-cyan/20 glow-ring">
          <QrCode className="w-5 h-5 text-cyan" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-glow">Battery Life Journey</h3>
          <p className="text-sm text-muted-foreground">QR-Code Blockchain Traceability</p>
        </div>
      </div>

      {!batteryJourney ? (
        <div className="text-center space-y-6">
          <div className="relative mx-auto w-32 h-32">
            {isScanning ? (
              <div className="w-full h-full border-2 border-dashed border-cyan rounded-lg flex items-center justify-center animate-pulse glow-ring">
                <Scan className="w-8 h-8 text-cyan animate-spin" />
              </div>
            ) : (
              <div className="w-full h-full border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center hover:border-cyan transition-colors cursor-pointer">
                <QrCode className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div>
            <Button 
              onClick={handleScan} 
              disabled={isScanning}
              className="bg-cyan/20 hover:bg-cyan/30 text-cyan border border-cyan/50 glow-ring"
            >
              {isScanning ? (
                <>
                  <Scan className="w-4 h-4 mr-2 animate-spin" />
                  Scanning Battery QR...
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan Battery QR Code
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Position QR code within the scanner frame
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Battery ID Header */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-electric text-glow">{batteryJourney.id}</h4>
              <p className="text-sm text-muted-foreground">Battery Identification</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetScan}
              className="border-muted-foreground/30"
            >
              <Scan className="w-4 h-4 mr-2" />
              Scan New
            </Button>
          </div>

          {/* Manufacturing Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/10 border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-lime" />
                <span className="text-sm font-medium">Manufactured</span>
              </div>
              <p className="text-sm text-foreground">{new Date(batteryJourney.manufactureDate).toLocaleDateString()}</p>
              <p className="text-xs text-muted-foreground">{batteryJourney.manufacturer}</p>
            </div>

            <div className="p-4 rounded-lg bg-muted/10 border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium">Origin</span>
              </div>
              <p className="text-sm text-foreground">{batteryJourney.location}</p>
              <p className="text-xs text-muted-foreground">Manufacturing Location</p>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-electric/10 border border-electric/30">
              <div className="text-2xl font-bold text-electric text-glow">{batteryJourney.totalCycles.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Charge Cycles</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-cyan/10 border border-cyan/30">
              <div className="text-2xl font-bold text-cyan text-glow">{batteryJourney.previousOwners}</div>
              <div className="text-xs text-muted-foreground">Previous Owners</div>
            </div>
          </div>

          {/* Recycling Path */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-lime" />
              <span className="text-sm font-medium">Circular Journey Path</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {batteryJourney.recyclingPath.map((step, index) => (
                <div key={index} className="flex items-center gap-2 flex-shrink-0">
                  <div className="px-3 py-1 rounded-full bg-lime/20 text-lime text-xs font-medium border border-lime/30">
                    {step}
                  </div>
                  {index < batteryJourney.recyclingPath.length - 1 && (
                    <div className="w-4 h-0.5 bg-gradient-to-r from-lime/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-electric" />
              <span className="text-sm font-medium">Certifications</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {batteryJourney.certifications.map((cert, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-electric/30 text-electric"
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};