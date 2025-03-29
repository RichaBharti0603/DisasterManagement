
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Bell, MapPin, Key, Upload, Users, Phone, Mail, Home, Trash2, Plus, Settings, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

const Profile = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // User profile form state
  const [userProfile, setUserProfile] = useState({
    name: localStorage.getItem('userName') || 'John Doe',
    email: localStorage.getItem('userEmail') || 'john@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St',
    city: 'Lincoln',
    state: 'Nebraska',
    zipCode: '68508',
    emergencyContact1Name: 'Jane Doe',
    emergencyContact1Phone: '(555) 987-6543',
    emergencyContact1Relation: 'Spouse',
    emergencyContact2Name: 'Bob Smith',
    emergencyContact2Phone: '(555) 456-7890',
    emergencyContact2Relation: 'Brother',
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushAlerts: true,
    smsAlerts: true,
    emailUpdates: true,
    pushUpdates: false,
    smsUpdates: false,
    alertTypes: {
      emergency: true,
      weather: true,
      community: true,
      recovery: true,
      volunteer: false,
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };
  
  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting as keyof typeof notificationSettings],
    });
  };

  const handleAlertTypeToggle = (type: string) => {
    setNotificationSettings({
      ...notificationSettings,
      alertTypes: {
        ...notificationSettings.alertTypes,
        [type]: !notificationSettings.alertTypes[type as keyof typeof notificationSettings.alertTypes],
      },
    });
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store name and email in localStorage for demo purposes
      localStorage.setItem('userName', userProfile.name);
      localStorage.setItem('userEmail', userProfile.email);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
      
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      });
      
      setIsSaving(false);
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold mb-1">{userProfile.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{userProfile.email}</p>
                  
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline" className="bg-primary/10">User</Badge>
                    <Badge variant="outline" className="bg-success/10">Volunteer</Badge>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    Log Out
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Shield className="h-4 w-4 mr-2 text-success" />
                      <span>Personal Info</span>
                    </div>
                    <Badge>Complete</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-success" />
                      <span>Emergency Contacts</span>
                    </div>
                    <Badge>Complete</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Bell className="h-4 w-4 mr-2 text-success" />
                      <span>Notification Settings</span>
                    </div>
                    <Badge>Complete</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Upload className="h-4 w-4 mr-2 text-alert" />
                      <span>Document Upload</span>
                    </div>
                    <Badge variant="outline">2/5</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Key className="h-4 w-4 mr-2 text-alert" />
                      <span>Security Settings</span>
                    </div>
                    <Badge variant="outline">Incomplete</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <Key className="mr-2 h-4 w-4" />
                  Security
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                          Update your personal details and emergency contacts
                        </CardDescription>
                      </div>
                      {!isEditing ? (
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProfile} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          {isEditing ? (
                            <Input
                              id="name"
                              name="name"
                              value={userProfile.name}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-muted/30">{userProfile.name}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          {isEditing ? (
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={userProfile.email}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-muted/30">{userProfile.email}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          {isEditing ? (
                            <Input
                              id="phone"
                              name="phone"
                              value={userProfile.phone}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-muted/30">{userProfile.phone}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Street Address</Label>
                          {isEditing ? (
                            <Input
                              id="address"
                              name="address"
                              value={userProfile.address}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-muted/30">{userProfile.address}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          {isEditing ? (
                            <Input
                              id="city"
                              name="city"
                              value={userProfile.city}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-muted/30">{userProfile.city}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          {isEditing ? (
                            <Input
                              id="state"
                              name="state"
                              value={userProfile.state}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-muted/30">{userProfile.state}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          {isEditing ? (
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={userProfile.zipCode}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-muted/30">{userProfile.zipCode}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Emergency Contacts</h3>
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Contact
                          </Button>
                        )}
                      </div>

                      <div className="space-y-6">
                        <div className="border rounded-md p-4">
                          <h4 className="font-medium mb-3">Primary Emergency Contact</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="emergencyContact1Name">Name</Label>
                              {isEditing ? (
                                <Input
                                  id="emergencyContact1Name"
                                  name="emergencyContact1Name"
                                  value={userProfile.emergencyContact1Name}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <div className="p-2 border rounded-md bg-muted/30">{userProfile.emergencyContact1Name}</div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="emergencyContact1Phone">Phone Number</Label>
                              {isEditing ? (
                                <Input
                                  id="emergencyContact1Phone"
                                  name="emergencyContact1Phone"
                                  value={userProfile.emergencyContact1Phone}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <div className="p-2 border rounded-md bg-muted/30">{userProfile.emergencyContact1Phone}</div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="emergencyContact1Relation">Relationship</Label>
                              {isEditing ? (
                                <Input
                                  id="emergencyContact1Relation"
                                  name="emergencyContact1Relation"
                                  value={userProfile.emergencyContact1Relation}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <div className="p-2 border rounded-md bg-muted/30">{userProfile.emergencyContact1Relation}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-md p-4">
                          <div className="flex justify-between mb-3">
                            <h4 className="font-medium">Secondary Emergency Contact</h4>
                            {isEditing && (
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="emergencyContact2Name">Name</Label>
                              {isEditing ? (
                                <Input
                                  id="emergencyContact2Name"
                                  name="emergencyContact2Name"
                                  value={userProfile.emergencyContact2Name}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <div className="p-2 border rounded-md bg-muted/30">{userProfile.emergencyContact2Name}</div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="emergencyContact2Phone">Phone Number</Label>
                              {isEditing ? (
                                <Input
                                  id="emergencyContact2Phone"
                                  name="emergencyContact2Phone"
                                  value={userProfile.emergencyContact2Phone}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <div className="p-2 border rounded-md bg-muted/30">{userProfile.emergencyContact2Phone}</div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="emergencyContact2Relation">Relationship</Label>
                              {isEditing ? (
                                <Input
                                  id="emergencyContact2Relation"
                                  name="emergencyContact2Relation"
                                  value={userProfile.emergencyContact2Relation}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <div className="p-2 border rounded-md bg-muted/30">{userProfile.emergencyContact2Relation}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>
                          Manage how you receive alerts and notifications
                        </CardDescription>
                      </div>
                      <Button onClick={handleSaveNotifications} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Preferences"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Alert Notifications</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Critical alerts about emergencies and hazards in your area
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="emailAlerts">Email Alerts</Label>
                          </div>
                          <Switch
                            id="emailAlerts"
                            checked={notificationSettings.emailAlerts}
                            onCheckedChange={() => handleNotificationToggle('emailAlerts')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="pushAlerts">Push Notifications</Label>
                          </div>
                          <Switch
                            id="pushAlerts"
                            checked={notificationSettings.pushAlerts}
                            onCheckedChange={() => handleNotificationToggle('pushAlerts')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="smsAlerts">SMS Alerts</Label>
                          </div>
                          <Switch
                            id="smsAlerts"
                            checked={notificationSettings.smsAlerts}
                            onCheckedChange={() => handleNotificationToggle('smsAlerts')}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Application Updates</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Non-critical updates about platform features and community activities
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="emailUpdates">Email Updates</Label>
                          </div>
                          <Switch
                            id="emailUpdates"
                            checked={notificationSettings.emailUpdates}
                            onCheckedChange={() => handleNotificationToggle('emailUpdates')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="pushUpdates">Push Notifications</Label>
                          </div>
                          <Switch
                            id="pushUpdates"
                            checked={notificationSettings.pushUpdates}
                            onCheckedChange={() => handleNotificationToggle('pushUpdates')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="smsUpdates">SMS Updates</Label>
                          </div>
                          <Switch
                            id="smsUpdates"
                            checked={notificationSettings.smsUpdates}
                            onCheckedChange={() => handleNotificationToggle('smsUpdates')}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Alert Types</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select which types of alerts you want to receive
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-emergency" />
                            <Label htmlFor="emergency">Emergency Alerts</Label>
                          </div>
                          <Switch
                            id="emergency"
                            checked={notificationSettings.alertTypes.emergency}
                            onCheckedChange={() => handleAlertTypeToggle('emergency')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Cloud className="h-4 w-4 text-info" />
                            <Label htmlFor="weather">Weather Alerts</Label>
                          </div>
                          <Switch
                            id="weather"
                            checked={notificationSettings.alertTypes.weather}
                            onCheckedChange={() => handleAlertTypeToggle('weather')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-alert" />
                            <Label htmlFor="community">Community Updates</Label>
                          </div>
                          <Switch
                            id="community"
                            checked={notificationSettings.alertTypes.community}
                            onCheckedChange={() => handleAlertTypeToggle('community')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-success" />
                            <Label htmlFor="recovery">Recovery Resources</Label>
                          </div>
                          <Switch
                            id="recovery"
                            checked={notificationSettings.alertTypes.recovery}
                            onCheckedChange={() => handleAlertTypeToggle('recovery')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <HandHeart className="h-4 w-4 text-secondary" />
                            <Label htmlFor="volunteer">Volunteer Opportunities</Label>
                          </div>
                          <Switch
                            id="volunteer"
                            checked={notificationSettings.alertTypes.volunteer}
                            onCheckedChange={() => handleAlertTypeToggle('volunteer')}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Documents Tab */}
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Important Documents</CardTitle>
                    <CardDescription>
                      Store and access your critical documents for emergency situations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Uploaded Documents</h3>
                        <Button>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload New Document
                        </Button>
                      </div>
                      
                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                              <p className="font-medium">Insurance Policy.pdf</p>
                              <p className="text-xs text-muted-foreground">
                                Uploaded on Aug 15, 2023
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                              <p className="font-medium">Medical Information.docx</p>
                              <p className="text-xs text-muted-foreground">
                                Uploaded on Sep 3, 2023
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-medium mb-4">Recommended Documents</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        These documents will help you recover quickly after a disaster
                      </p>
                      
                      <div className="space-y-4">
                        <div className="border rounded-md p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-success mr-2" />
                              Identification
                            </h4>
                            <ul className="text-sm space-y-1 pl-6 list-disc">
                              <li>Driver's License</li>
                              <li>Passport</li>
                              <li>Birth Certificate</li>
                              <li>Social Security Card</li>
                            </ul>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-success mr-2" />
                              Financial
                            </h4>
                            <ul className="text-sm space-y-1 pl-6 list-disc">
                              <li>Insurance Policies</li>
                              <li>Property Deeds</li>
                              <li>Tax Records</li>
                              <li>Banking Information</li>
                            </ul>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-success mr-2" />
                              Medical
                            </h4>
                            <ul className="text-sm space-y-1 pl-6 list-disc">
                              <li>Medical Insurance</li>
                              <li>Immunization Records</li>
                              <li>Prescription Information</li>
                              <li>Medical History</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm text-muted-foreground">
                      All documents are encrypted and securely stored.
                    </p>
                    <Button variant="outline">
                      Document Checklist
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and privacy settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Password</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" />
                          </div>
                        </div>
                        <Button>
                          Update Password
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch />
                        </div>
                        <Button variant="outline">
                          Setup Two-Factor Authentication
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Profile Visibility</p>
                            <p className="text-sm text-muted-foreground">
                              Control who can see your profile information
                            </p>
                          </div>
                          <Select defaultValue="private">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="contacts">Contacts Only</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Location Sharing</p>
                            <p className="text-sm text-muted-foreground">
                              Share your location during emergencies
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-destructive">Danger Zone</h3>
                      <div className="border border-destructive/20 rounded-md p-4">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                          <div>
                            <p className="font-medium">Delete Account</p>
                            <p className="text-sm text-muted-foreground">
                              Permanently delete your account and all data
                            </p>
                          </div>
                          <Button variant="destructive">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Missing imports
import { Cloud, HandHeart, FileText } from 'lucide-react';

export default Profile;
