
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin, Bell, Calendar, Clock, CheckCircle2, AlertCircle, Info, Shield, MapIcon, ScrollText, Settings } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Mock data for user's safety status
  const safetyStatus = {
    checklist: {
      total: 8,
      completed: 5,
    },
    contacts: {
      total: 5,
      added: 3,
    },
    documents: {
      total: 6,
      uploaded: 4,
    },
  };

  // Mock data for alerts relevant to the user
  const userAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Flash Flood Warning',
      description: 'Flash flooding possible in your area. Stay vigilant and avoid low-lying areas.',
      location: 'Lincoln, NE',
      time: '2 hours ago',
      severity: 'high',
    },
    {
      id: 2,
      type: 'info',
      title: 'Weather Advisory',
      description: 'Heavy rainfall expected in the next 24 hours. Be prepared for potential flooding.',
      location: 'Lincoln, NE',
      time: '5 hours ago',
      severity: 'medium',
    },
    {
      id: 3,
      type: 'status',
      title: 'Power Restoration Update',
      description: 'Crews working to restore power in your area. Estimated restoration by 8PM today.',
      location: 'Lincoln, NE',
      time: '7 hours ago',
      severity: 'low',
    },
  ];

  // Mock data for nearby resources
  const nearbyResources = [
    {
      id: 1,
      type: 'shelter',
      name: 'Central Community Center',
      distance: 2.3,
      status: 'open',
      capacity: {
        total: 200,
        current: 120,
      },
    },
    {
      id: 2,
      type: 'medical',
      name: 'Westview Medical Shelter',
      distance: 6.1,
      status: 'open',
      capacity: {
        total: 120,
        current: 110,
      },
    },
    {
      id: 3,
      type: 'supplies',
      name: 'Northside Supply Distribution',
      distance: 3.7,
      status: 'open',
      schedule: '9AM-6PM',
    },
  ];

  // Mock data for upcoming volunteer activities
  const volunteerActivities = [
    {
      id: 1,
      title: 'Flood Relief Volunteers',
      organization: 'Red Cross',
      date: '2023-09-25',
      time: '9:00 AM - 4:00 PM',
      location: 'Mississippi River Basin',
    },
    {
      id: 2,
      title: 'Emergency Supply Distribution',
      organization: 'Local Emergency Management',
      date: '2023-09-30',
      time: '7:00 AM - 2:00 PM',
      location: 'Lincoln, NE',
    },
  ];

  // Calculate overall preparedness percentage
  const calculatePreparedness = () => {
    const totalItems = safetyStatus.checklist.total + safetyStatus.contacts.total + safetyStatus.documents.total;
    const completedItems = safetyStatus.checklist.completed + safetyStatus.contacts.added + safetyStatus.documents.uploaded;
    return Math.round((completedItems / totalItems) * 100);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-alert" />;
      case 'info':
        return <Info className="h-5 w-5 text-info" />;
      case 'status':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getAlertBadgeClass = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-emergency/20 text-emergency-dark';
      case 'medium':
        return 'bg-alert/20 text-alert-dark';
      case 'low':
        return 'bg-info/20 text-info-dark';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'shelter':
        return <MapPin className="h-5 w-5 text-primary" />;
      case 'medical':
        return <Shield className="h-5 w-5 text-emergency" />;
      case 'supplies':
        return <ScrollText className="h-5 w-5 text-alert" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-success/20 text-success-dark';
      case 'limited':
        return 'bg-alert/20 text-alert-dark';
      case 'closed':
        return 'bg-emergency/20 text-emergency-dark';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {localStorage.getItem('userName') || 'User'}</h1>
            <p className="text-muted-foreground">
              Your personal disaster assistant is here...
            </p>
          </div>
          
          <Button variant="outline" className="mt-4 md:mt-0" onClick={() => navigate('/profile')}>
            <Settings className="mr-2 h-4 w-4" />
            Manage Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Preparedness Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-24 h-24">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="5"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-primary stroke-current"
                        strokeWidth="5"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={2 * Math.PI * 45 * (1 - calculatePreparedness() / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <span className="absolute text-2xl font-bold">{calculatePreparedness()}%</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Overall Preparedness</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Emergency Checklist</span>
                      <span className="text-sm text-muted-foreground">
                        {safetyStatus.checklist.completed}/{safetyStatus.checklist.total}
                      </span>
                    </div>
                    <Progress value={(safetyStatus.checklist.completed / safetyStatus.checklist.total) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Emergency Contacts</span>
                      <span className="text-sm text-muted-foreground">
                        {safetyStatus.contacts.added}/{safetyStatus.contacts.total}
                      </span>
                    </div>
                    <Progress value={(safetyStatus.contacts.added / safetyStatus.contacts.total) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Important Documents</span>
                      <span className="text-sm text-muted-foreground">
                        {safetyStatus.documents.uploaded}/{safetyStatus.documents.total}
                      </span>
                    </div>
                    <Progress value={(safetyStatus.documents.uploaded / safetyStatus.documents.total) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Complete Your Profile
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">{alert.title}</h3>
                        <Badge className={`ml-2 text-xs ${getAlertBadgeClass(alert.severity)}`}>
                          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm">{alert.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{alert.location}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate('/alerts')}>
                <Bell className="mr-2 h-4 w-4" />
                View All Alerts
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Nearby Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nearbyResources.map((resource) => (
                  <div key={resource.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2">
                        <div className="mt-0.5">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{resource.name}</h3>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <MapIcon className="h-3 w-3 mr-1" /> {resource.distance} miles away
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusBadgeClass(resource.status)}>
                        {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                      </Badge>
                    </div>
                    {resource.capacity && (
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span>Capacity</span>
                          <span>
                            {resource.capacity.current}/{resource.capacity.total}
                          </span>
                        </div>
                        <Progress 
                          value={(resource.capacity.current / resource.capacity.total) * 100} 
                          className="h-1"
                        />
                      </div>
                    )}
                    {resource.schedule && (
                      <div className="text-xs flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Hours: {resource.schedule}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate('/shelters')}>
                <MapPin className="mr-2 h-4 w-4" />
                Find Resources
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Checklist</CardTitle>
              <CardDescription>
                Complete these items to prepare for emergencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Create an emergency plan</h3>
                    <p className="text-xs text-muted-foreground">
                      Completed on Sep 5, 2023
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Prepare emergency kit</h3>
                    <p className="text-xs text-muted-foreground">
                      Completed on Sep 10, 2023
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-muted rounded-full p-1 mr-2 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Identify evacuation routes</h3>
                    <p className="text-xs text-muted-foreground">
                      Not completed
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Add emergency contacts</h3>
                    <p className="text-xs text-muted-foreground">
                      Completed on Sep 8, 2023
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-muted rounded-full p-1 mr-2 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Create a communication plan</h3>
                    <p className="text-xs text-muted-foreground">
                      Not completed
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Checklist
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Volunteer Activities</CardTitle>
              <CardDescription>
                Upcoming volunteer opportunities you've signed up for
              </CardDescription>
            </CardHeader>
            <CardContent>
              {volunteerActivities.length > 0 ? (
                <div className="space-y-4">
                  {volunteerActivities.map((activity) => (
                    <div key={activity.id} className="border rounded-md p-4">
                      <h3 className="font-medium mb-1">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.organization}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{new Date(activity.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center col-span-2">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No volunteer activities</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You haven't signed up for any volunteer opportunities yet
                  </p>
                  <Button onClick={() => navigate('/community')}>
                    Find Opportunities
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate('/community')}>
                View All Opportunities
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Activity</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="donations">Donations</TabsTrigger>
                <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className="border-l-2 border-muted pl-4 ml-2 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Volunteered for Flood Relief</h3>
                    <p className="text-xs">You signed up to volunteer with Red Cross for flood relief efforts.</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                
                <div className="border-l-2 border-muted pl-4 ml-2 relative">
                  <div className="absolute w-3 h-3 bg-emergency rounded-full -left-[7px] top-1"></div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Alert Received: Flash Flood Warning</h3>
                    <p className="text-xs">You received a high priority alert for your area.</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                
                <div className="border-l-2 border-muted pl-4 ml-2 relative">
                  <div className="absolute w-3 h-3 bg-success rounded-full -left-[7px] top-1"></div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Completed: Prepare Emergency Kit</h3>
                    <p className="text-xs">You marked the "Prepare Emergency Kit" task as completed.</p>
                    <p className="text-xs text-muted-foreground">5 days ago</p>
                  </div>
                </div>
                
                <div className="border-l-2 border-muted pl-4 ml-2 relative">
                  <div className="absolute w-3 h-3 bg-secondary rounded-full -left-[7px] top-1"></div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Donation Made: $50</h3>
                    <p className="text-xs">You donated $50 to the Wildfire Recovery Initiative.</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="alerts" className="space-y-4">
                <div className="border-l-2 border-muted pl-4 ml-2 relative">
                  <div className="absolute w-3 h-3 bg-emergency rounded-full -left-[7px] top-1"></div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Alert Received: Flash Flood Warning</h3>
                    <p className="text-xs">You received a high priority alert for your area.</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="donations" className="space-y-4">
                <div className="border-l-2 border-muted pl-4 ml-2 relative">
                  <div className="absolute w-3 h-3 bg-secondary rounded-full -left-[7px] top-1"></div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Donation Made: $50</h3>
                    <p className="text-xs">You donated $50 to the Wildfire Recovery Initiative.</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="volunteer" className="space-y-4">
                <div className="border-l-2 border-muted pl-4 ml-2 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Volunteered for Flood Relief</h3>
                    <p className="text-xs">You signed up to volunteer with Red Cross for flood relief efforts.</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
