
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, MapPin, Users, Heart, Shield, Bell } from 'lucide-react';
import Layout from '@/components/Layout';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Real-time Alerts',
      description: 'Get immediate notifications about emergencies and critical updates in your area.',
      icon: <Bell className="h-10 w-10 text-primary" />,
      path: '/alerts',
      color: 'bg-primary/10',
    },
    {
      title: 'Shelter Locator',
      description: 'Find nearby emergency shelters and safe zones with directions.',
      icon: <MapPin className="h-10 w-10 text-emergency" />,
      path: '/shelters',
      color: 'bg-emergency/10',
    },
    {
      title: 'Donation & Support',
      description: 'Contribute to relief efforts and provide assistance to affected areas.',
      icon: <Heart className="h-10 w-10 text-secondary" />,
      path: '/donation',
      color: 'bg-secondary/10',
    },
    {
      title: 'Post-Disaster Recovery',
      description: 'Access resources and guidance for recovery after a disaster.',
      icon: <Shield className="h-10 w-10 text-info" />,
      path: '/recovery',
      color: 'bg-info/10',
    },
    {
      title: 'Community Volunteering',
      description: 'Join volunteer efforts and help your community during emergencies.',
      icon: <Users className="h-10 w-10 text-alert" />,
      path: '/community',
      color: 'bg-alert/10',
    },
  ];

  const recentDisasters = [
    {
      id: 1,
      title: 'Hurricane',
      location: 'Florida Coast',
      severity: 'High',
      date: '2023-06-15',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Wildfire',
      location: 'California',
      severity: 'Medium',
      date: '2023-07-01',
      status: 'Contained',
    },
    {
      id: 3,
      title: 'Flood',
      location: 'Mississippi River',
      severity: 'High',
      date: '2023-05-20',
      status: 'Recovery',
    },
  ];

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'alert-badge alert-badge-emergency';
      case 'medium':
        return 'alert-badge alert-badge-warning';
      case 'low':
        return 'alert-badge alert-badge-info';
      default:
        return 'alert-badge alert-badge-info';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'animate-pulse-alert bg-emergency text-white px-2 py-1 rounded-full text-xs';
      case 'contained':
        return 'bg-alert text-white px-2 py-1 rounded-full text-xs';
      case 'recovery':
        return 'bg-info text-white px-2 py-1 rounded-full text-xs';
      default:
        return 'bg-gray-500 text-white px-2 py-1 rounded-full text-xs';
    }
  };

  return (
    <Layout>
      <div className="px-4 py-6 lg:px-8">
        {/* Hero section */}
        <div className="relative bg-gradient-to-r from-primary to-info rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative p-8 md:p-16 text-white">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-10 w-10 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold">NamasteNow</h1>
            </div>
            <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Your safe space in times of crisis—real-time alerts, quick response tools, and trusted recovery support. Stay prepared, stay protected, stay home
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate('/alerts')}
              >
                View Alerts
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate('/login')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        {/* Recent disasters section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Disasters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentDisasters.map((disaster) => (
              <Card key={disaster.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{disaster.title}</CardTitle>
                    <span className={getStatusBadgeClass(disaster.status)}>
                      {disaster.status}
                    </span>
                  </div>
                  <CardDescription>{disaster.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {new Date(disaster.date).toLocaleDateString()}
                    </span>
                    <span className={getSeverityBadgeClass(disaster.severity)}>
                      {disaster.severity} Severity
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/alerts')}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Features section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`p-4 rounded-full w-fit mb-4 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(feature.path)}
                  >
                    Explore
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Be Prepared for Any Emergency</h2>
          <p className="mb-6 max-w-2xl mx-auto text-muted-foreground">
            Join our community today to access all features and stay ahead of disasters.
            Together, we can build a safer and more resilient community.
          </p>
          <Button 
            size="lg" 
            className="bg-secondary hover:bg-secondary/90 text-white"
            onClick={() => navigate('/signup')}
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
