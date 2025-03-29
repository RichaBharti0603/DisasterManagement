
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle, Bell, MapPin, Users, Heart, Shield, Search, CheckCircle2, Plus, Edit, Trash2, ChevronDown, ChevronUp, Filter, Download, Settings, AlertCircle, UserCog } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

const Admin = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [alertSearchQuery, setAlertSearchQuery] = useState('');
  const [isCreatingAlert, setIsCreatingAlert] = useState(false);
  
  // Stats data
  const statsData = {
    activeAlerts: 8,
    registeredUsers: 2542,
    activeShelters: 12,
    volunteers: 486,
    donations: '$24,350',
  };

  // Mock data for users
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'User',
      status: 'Active',
      location: 'Lincoln, NE',
      lastActive: '2023-09-14T10:30:00',
      joinDate: '2023-03-25',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Admin',
      status: 'Active',
      location: 'Omaha, NE',
      lastActive: '2023-09-15T08:45:00',
      joinDate: '2023-02-12',
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      role: 'User',
      status: 'Inactive',
      location: 'Lincoln, NE',
      lastActive: '2023-08-30T14:20:00',
      joinDate: '2023-05-08',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'Volunteer',
      status: 'Active',
      location: 'Grand Island, NE',
      lastActive: '2023-09-15T11:10:00',
      joinDate: '2023-04-17',
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael@example.com',
      role: 'User',
      status: 'Active',
      location: 'Lincoln, NE',
      lastActive: '2023-09-14T16:05:00',
      joinDate: '2023-06-22',
    },
  ];

  // Mock data for alerts
  const alerts = [
    {
      id: 1,
      title: 'Hurricane Warning',
      type: 'Weather',
      severity: 'Critical',
      location: 'Florida Coast',
      status: 'Active',
      created: '2023-09-14T08:30:00',
      updatedBy: 'Jane Smith',
      recipients: 1254,
    },
    {
      id: 2,
      title: 'Flash Flood Warning',
      type: 'Weather',
      severity: 'High',
      location: 'Mississippi River Basin',
      status: 'Active',
      created: '2023-09-14T14:15:00',
      updatedBy: 'Jane Smith',
      recipients: 892,
    },
    {
      id: 3,
      title: 'Wildfire Alert',
      type: 'Fire',
      severity: 'High',
      location: 'Northern California',
      status: 'Active',
      created: '2023-09-10T11:20:00',
      updatedBy: 'Admin System',
      recipients: 745,
    },
    {
      id: 4,
      title: 'Earthquake Advisory',
      type: 'Geological',
      severity: 'Medium',
      location: 'Central California',
      status: 'Inactive',
      created: '2023-09-05T02:45:00',
      updatedBy: 'Admin System',
      recipients: 1103,
    },
    {
      id: 5,
      title: 'Tornado Watch',
      type: 'Weather',
      severity: 'Medium',
      location: 'Oklahoma',
      status: 'Inactive',
      created: '2023-09-01T16:30:00',
      updatedBy: 'Jane Smith',
      recipients: 658,
    },
  ];

  // Mock data for shelters
  const shelters = [
    {
      id: 1,
      name: 'Central Community Center',
      address: '123 Main St, Lincoln, NE 68508',
      capacity: 200,
      occupancy: 120,
      status: 'Open',
      lastUpdated: '2023-09-15T07:30:00',
    },
    {
      id: 2,
      name: 'Eastside High School',
      address: '456 Oak Ave, Lincoln, NE 68510',
      capacity: 350,
      occupancy: 280,
      status: 'Open',
      lastUpdated: '2023-09-15T08:15:00',
    },
    {
      id: 3,
      name: 'Westview Medical Shelter',
      address: '789 Elm St, Lincoln, NE 68512',
      capacity: 120,
      occupancy: 110,
      status: 'Open',
      lastUpdated: '2023-09-15T06:45:00',
    },
    {
      id: 4,
      name: 'Northside Church',
      address: '321 Pine Rd, Lincoln, NE 68521',
      capacity: 150,
      occupancy: 60,
      status: 'Open',
      lastUpdated: '2023-09-15T09:00:00',
    },
  ];

  // Check if the user is authenticated and an admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the admin dashboard.",
        variant: "destructive",
      });
      navigate('/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate, toast]);

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    if (!userSearchQuery) return true;
    return (
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(userSearchQuery.toLowerCase())
    );
  });

  // Filter alerts based on search query
  const filteredAlerts = alerts.filter(alert => {
    if (!alertSearchQuery) return true;
    return (
      alert.title.toLowerCase().includes(alertSearchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(alertSearchQuery.toLowerCase()) ||
      alert.type.toLowerCase().includes(alertSearchQuery.toLowerCase())
    );
  });

  const handleCreateAlert = () => {
    toast({
      title: "Alert Created",
      description: "Your alert has been created and sent to recipients.",
    });
    setIsCreatingAlert(false);
  };

  const handleDeleteAlert = (alertId: number) => {
    toast({
      title: "Alert Deleted",
      description: "The alert has been deleted successfully.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-emergency text-white';
      case 'high':
        return 'bg-alert text-white';
      case 'medium':
        return 'bg-info text-white';
      case 'low':
        return 'bg-success text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success text-white';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'open':
        return 'bg-success text-white';
      case 'closed':
        return 'bg-destructive text-white';
      case 'limited':
        return 'bg-alert text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-primary text-white';
      case 'volunteer':
        return 'bg-secondary text-white';
      case 'user':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Settings className="mr-2 h-6 w-6 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage alerts, users, and resources for the disaster management platform
            </p>
          </div>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard" className="flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="shelters" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Shelters
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Donations
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-alert" />
                    Active Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{statsData.activeAlerts}</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {alerts.filter(a => a.status === 'Active').length} emergency alerts currently active
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('alerts')}>
                    Manage Alerts
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Registered Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{statsData.registeredUsers}</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {users.filter(u => u.status === 'Active').length} active in the last 24 hours
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('users')}>
                    Manage Users
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-secondary" />
                    Active Shelters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{statsData.activeShelters}</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {shelters.filter(s => s.status === 'Open').length} shelters currently open
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('shelters')}>
                    Manage Shelters
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest actions from the admin panel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 rounded-full p-1.5">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          New alert created: Flash Flood Warning
                        </p>
                        <p className="text-xs text-muted-foreground">
                          By Jane Smith • {formatDate('2023-09-14T14:15:00')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 rounded-full p-1.5">
                        <MapPin className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Shelter status updated: Central Community Center
                        </p>
                        <p className="text-xs text-muted-foreground">
                          By Admin System • {formatDate('2023-09-15T07:30:00')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 rounded-full p-1.5">
                        <UserCog className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          User role changed: Sarah Wilson to Volunteer
                        </p>
                        <p className="text-xs text-muted-foreground">
                          By Jane Smith • {formatDate('2023-09-14T10:45:00')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-red-100 rounded-full p-1.5">
                        <AlertCircle className="h-4 w-4 text-emergency" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Alert status changed: Earthquake Advisory to Inactive
                        </p>
                        <p className="text-xs text-muted-foreground">
                          By Admin System • {formatDate('2023-09-06T08:20:00')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>
                    Current platform status and metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-success rounded-full mr-2"></div>
                        <span className="text-sm font-medium">Alert System</span>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success">
                        Operational
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-success rounded-full mr-2"></div>
                        <span className="text-sm font-medium">User Authentication</span>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success">
                        Operational
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-success rounded-full mr-2"></div>
                        <span className="text-sm font-medium">Resource Management</span>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success">
                        Operational
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-alert rounded-full mr-2"></div>
                        <span className="text-sm font-medium">SMS Notifications</span>
                      </div>
                      <Badge variant="outline" className="bg-alert/10 text-alert">
                        Degraded
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-success rounded-full mr-2"></div>
                        <span className="text-sm font-medium">Map Services</span>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success">
                        Operational
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">System Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Response Time</p>
                        <p className="text-lg font-bold">315ms</p>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Uptime</p>
                        <p className="text-lg font-bold">99.9%</p>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Alerts Sent Today</p>
                        <p className="text-lg font-bold">1,254</p>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Active Sessions</p>
                        <p className="text-lg font-bold">432</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View System Logs
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-auto py-4 flex flex-col" onClick={() => {
                    setActiveTab('alerts');
                    setIsCreatingAlert(true);
                  }}>
                    <Bell className="h-8 w-8 mb-2" />
                    <span>Create New Alert</span>
                  </Button>
                  <Button className="h-auto py-4 flex flex-col" variant="outline" onClick={() => setActiveTab('shelters')}>
                    <MapPin className="h-8 w-8 mb-2" />
                    <span>Update Shelter Status</span>
                  </Button>
                  <Button className="h-auto py-4 flex flex-col" variant="outline" onClick={() => setActiveTab('users')}>
                    <Users className="h-8 w-8 mb-2" />
                    <span>Manage Users</span>
                  </Button>
                  <Button className="h-auto py-4 flex flex-col" variant="outline">
                    <Shield className="h-8 w-8 mb-2" />
                    <span>Recovery Resources</span>
                  </Button>
                  <Button className="h-auto py-4 flex flex-col" variant="outline">
                    <Download className="h-8 w-8 mb-2" />
                    <span>Export Reports</span>
                  </Button>
                  <Button className="h-auto py-4 flex flex-col" variant="outline">
                    <Settings className="h-8 w-8 mb-2" />
                    <span>System Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Manage Alerts</CardTitle>
                    <CardDescription>
                      Create, edit, and manage emergency alerts
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search alerts..."
                        className="pl-8 w-full md:w-[260px]"
                        value={alertSearchQuery}
                        onChange={(e) => setAlertSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button onClick={() => setIsCreatingAlert(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Alert
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isCreatingAlert ? (
                  <div className="border rounded-md p-4 mb-6">
                    <h3 className="text-lg font-medium mb-4">Create New Alert</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Alert Title</label>
                          <Input placeholder="Enter alert title" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Alert Type</label>
                          <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                            <option value="">Select type</option>
                            <option value="weather">Weather</option>
                            <option value="fire">Fire</option>
                            <option value="geological">Geological</option>
                            <option value="health">Health</option>
                            <option value="security">Security</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Severity</label>
                          <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                            <option value="">Select severity</option>
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Location</label>
                          <Input placeholder="Enter affected location" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Alert Description</label>
                        <textarea 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[100px]"
                          placeholder="Enter detailed alert information"
                        ></textarea>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Instructions</label>
                        <textarea 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[100px]"
                          placeholder="Enter instructions for recipients"
                        ></textarea>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={() => setIsCreatingAlert(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateAlert}>
                          Create & Send Alert
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell className="font-medium">{alert.title}</TableCell>
                          <TableCell>{alert.type}</TableCell>
                          <TableCell>{alert.location}</TableCell>
                          <TableCell>
                            <Badge className={getSeverityBadgeClass(alert.severity)}>
                              {alert.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeClass(alert.status)}>
                              {alert.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(alert.created)}</TableCell>
                          <TableCell>{alert.recipients.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-destructive"
                                onClick={() => handleDeleteAlert(alert.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredAlerts.length} of {alerts.length} alerts
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Manage Users</CardTitle>
                    <CardDescription>
                      View and manage user accounts
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search users..."
                        className="pl-8 w-full md:w-[260px]"
                        value={userSearchQuery}
                        onChange={(e) => setUserSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getRoleBadgeClass(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={user.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.location}</TableCell>
                          <TableCell>{formatDate(user.lastActive)}</TableCell>
                          <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredUsers.length} of {users.length} users
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Shelters Tab */}
          <TabsContent value="shelters">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Manage Shelters</CardTitle>
                    <CardDescription>
                      View and update shelter information
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Shelter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Occupancy</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shelters.map((shelter) => (
                        <TableRow key={shelter.id}>
                          <TableCell className="font-medium">{shelter.name}</TableCell>
                          <TableCell>{shelter.address}</TableCell>
                          <TableCell>{shelter.capacity}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-xs">
                                {shelter.occupancy}/{shelter.capacity} ({Math.round((shelter.occupancy / shelter.capacity) * 100)}%)
                              </div>
                              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary" 
                                  style={{ width: `${(shelter.occupancy / shelter.capacity) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeClass(shelter.status)}>
                              {shelter.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(shelter.lastUpdated)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {shelters.length} shelters
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Shelter Data
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle>Manage Donations</CardTitle>
                <CardDescription>
                  Track financial and supply donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Financial Donations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{statsData.donations}</div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Total donations received
                      </p>
                      
                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Hurricane Relief</span>
                            <span>$14,250</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: '58%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Wildfire Recovery</span>
                            <span>$6,780</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-secondary" style={{ width: '28%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Flood Response</span>
                            <span>$3,320</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-info" style={{ width: '14%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Donation Details
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Supply Donations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead>Needed</TableHead>
                              <TableHead>Received</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Canned Food</TableCell>
                              <TableCell>500</TableCell>
                              <TableCell>320</TableCell>
                              <TableCell>
                                <Badge className="bg-alert text-white">Needed</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Blankets</TableCell>
                              <TableCell>300</TableCell>
                              <TableCell>150</TableCell>
                              <TableCell>
                                <Badge className="bg-alert text-white">Needed</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Baby Formula</TableCell>
                              <TableCell>100</TableCell>
                              <TableCell>25</TableCell>
                              <TableCell>
                                <Badge className="bg-emergency text-white">Urgent</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Water Bottles</TableCell>
                              <TableCell>1000</TableCell>
                              <TableCell>800</TableCell>
                              <TableCell>
                                <Badge className="bg-success text-white">Good</Badge>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Update Supply Needs
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Donation Activity</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Donor</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount/Items</TableHead>
                          <TableHead>Campaign</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{formatDate('2023-09-15T10:23:00')}</TableCell>
                          <TableCell>Anonymous</TableCell>
                          <TableCell>Financial</TableCell>
                          <TableCell>$250.00</TableCell>
                          <TableCell>Hurricane Relief</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{formatDate('2023-09-15T09:15:00')}</TableCell>
                          <TableCell>John Doe</TableCell>
                          <TableCell>Financial</TableCell>
                          <TableCell>$100.00</TableCell>
                          <TableCell>Wildfire Recovery</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{formatDate('2023-09-14T15:40:00')}</TableCell>
                          <TableCell>Local Grocery Store</TableCell>
                          <TableCell>Supplies</TableCell>
                          <TableCell>200 Water Bottles</TableCell>
                          <TableCell>General</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{formatDate('2023-09-14T13:20:00')}</TableCell>
                          <TableCell>Sarah Wilson</TableCell>
                          <TableCell>Financial</TableCell>
                          <TableCell>$50.00</TableCell>
                          <TableCell>Flood Response</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Create Donation Campaign</Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Donation Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
