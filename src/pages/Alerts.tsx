
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, MapPin, Clock, Info } from 'lucide-react';
import Layout from '@/components/Layout';

interface Alert {
  id: number;
  type: string;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  instructions: string;
  isActive: boolean;
}

const Alerts = () => {
  // Mock data for alerts
  const alertsData: Alert[] = [
    {
      id: 1,
      type: 'Hurricane',
      title: 'Hurricane Warning',
      description: 'Hurricane approaching the southern coast. Expected to make landfall in 24 hours.',
      location: 'Ranchi',
      timestamp: '2023-09-15T08:30:00',
      severity: 'critical',
      instructions: 'Evacuate immediately if in evacuation zones. Secure property and prepare emergency supplies.',
      isActive: true,
    },
    {
      id: 2,
      type: 'Flood',
      title: 'Flash Flood Warning',
      description: 'Heavy rainfall causing rapid flooding in low-lying areas.',
      location: 'Mumbai Bandra',
      timestamp: '2023-09-14T14:15:00',
      severity: 'high',
      instructions: 'Avoid flooded areas. Do not attempt to cross flowing streams. Move to higher ground.',
      isActive: true,
    },
    {
      id: 3,
      type: 'Wildfire',
      title: 'Wildfire Alert',
      description: 'Rapidly spreading wildfire threatening residential areas.',
      location: 'Ayanagar',
      timestamp: '2023-09-10T11:20:00',
      severity: 'high',
      instructions: 'Be ready to evacuate. Pack essential items and important documents. Follow evacuation routes.',
      isActive: true,
    },
    {
      id: 4,
      type: 'Earthquake',
      title: 'Earthquake Advisory',
      description: '5.2 magnitude earthquake detected. Aftershocks possible.',
      location: 'Khanpur',
      timestamp: '2023-09-05T02:45:00',
      severity: 'medium',
      instructions: 'Check for injuries and damage. Be prepared for aftershocks. Stay away from damaged buildings.',
      isActive: false,
    },
    {
      id: 5,
      type: 'Tornado',
      title: 'Tornado Watch',
      description: 'Conditions are favorable for tornado development in the next few hours.',
      location: 'Saket',
      timestamp: '2023-09-01T16:30:00',
      severity: 'medium',
      instructions: 'Stay alert for changing weather conditions. Have an emergency plan ready.',
      isActive: false,
    },
  ];
  const [activeTab, setActiveTab] = useState('all');
  const [subscribedAlerts, setSubscribedAlerts] = useState<number[]>([1, 2]);
  const filteredAlerts = () => {
    switch (activeTab) {
      case 'active':
        return alertsData.filter(alert => alert.isActive);
      case 'subscribed':
        return alertsData.filter(alert => subscribedAlerts.includes(alert.id));
      default:
        return alertsData;
    }
  };
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-emergency text-white';
      case 'high':
        return 'bg-alert text-white';
      case 'medium':
        return 'bg-info text-white';
      case 'low':
        return 'bg-success text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  const toggleSubscription = (alertId: number) => {
    if (subscribedAlerts.includes(alertId)) {
      setSubscribedAlerts(subscribedAlerts.filter(id => id !== alertId));
    } else {
      setSubscribedAlerts([...subscribedAlerts, alertId]);
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-emergency" />
              Emergency Alerts
            </h1>
            <p className="text-muted-foreground">
              Stay informed about emergencies and critical events in your area
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-secondary hover:bg-secondary/90">
            <Bell className="mr-2 h-4 w-4" /> Enable Notifications
          </Button>
        </div>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="grid grid-cols-1 gap-6">
          {filteredAlerts().map((alert) => (
            <Card key={alert.id} className={alert.isActive ? 'border-l-4 border-l-emergency' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <CardTitle className="text-xl flex items-center">
                      {alert.title}
                      {alert.isActive && (
                        <span className="ml-2 animate-pulse-alert inline-flex h-2 w-2 rounded-full bg-emergency"></span>
                      )}
                    </CardTitle>
                    <CardDescription>
                      <span className="inline-flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {alert.location}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityClass(alert.severity)}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </Badge>
                    <Badge variant="outline">{alert.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{alert.description}</p>
                
                <div className="bg-muted p-4 rounded-md border border-border">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-2" /> Safety Instructions
                  </h4>
                  <p className="text-sm">{alert.instructions}</p>
                </div>

                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> 
                  {formatDate(alert.timestamp)}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline">
                  View Details
                </Button>
                <Button
                  variant={subscribedAlerts.includes(alert.id) ? "default" : "outline"}
                  onClick={() => toggleSubscription(alert.id)}
                >
                  {subscribedAlerts.includes(alert.id) ? "Subscribed" : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};
import { Bell } from 'lucide-react';
export default Alerts;
