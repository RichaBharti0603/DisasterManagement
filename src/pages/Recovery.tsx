import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Home, FileText, Users, Building, Banknote } from 'lucide-react';
import Layout from '@/components/Layout';

const Recovery = () => {
  const resourcesByCategory = {
    financial: [
      {
        id: 1,
        title: 'FEMA Disaster Assistance',
        organization: 'Federal Emergency Management Agency',
        description: 'Grants for temporary housing, home repairs, and other disaster-related needs.',
        link: '#',
        phone: '1-800-621-FEMA (3362)',
        deadline: '60 days after disaster declaration',
        eligibility: 'US citizens, non-citizen nationals, and qualified aliens',
      },
      {
        id: 2,
        title: 'Small Business Administration (SBA) Disaster Loans',
        organization: 'Small Business Administration',
        description: 'Low-interest loans for homeowners, renters, and businesses of all sizes.',
        link: '#',
        phone: '1-800-659-2955',
        deadline: 'Varies by disaster',
        eligibility: 'Businesses and individuals in declared disaster areas',
      },
      {
        id: 3,
        title: 'Disaster Unemployment Assistance',
        organization: 'Department of Labor',
        description: 'Financial assistance to individuals who lost their jobs as a direct result of a major disaster.',
        link: '#',
        phone: 'Contact state unemployment office',
        deadline: '30 days after announcement',
        eligibility: "Workers who lost jobs due to disaster and don't qualify for regular unemployment",
      },
    ],
    housing: [
      {
        id: 4,
        title: 'HUD Disaster Assistance',
        organization: 'Department of Housing and Urban Development',
        description: 'Assistance for homeowners and renters affected by disasters, including mortgage assistance and housing vouchers.',
        link: '#',
        phone: 'Contact local HUD office',
        deadline: 'Varies by program',
        eligibility: 'Low-income homeowners and renters',
      },
      {
        id: 5,
        title: 'American Red Cross',
        organization: 'American Red Cross',
        description: 'Temporary shelter, food, and other assistance for disaster victims.',
        link: '#',
        phone: '1-800-RED-CROSS (733-2767)',
        deadline: 'Ongoing',
        eligibility: 'Anyone affected by a disaster',
      },
    ],
    legal: [
      {
        id: 6,
        title: 'Legal Aid Society',
        organization: 'Legal Aid Society',
        description: 'Free legal assistance for disaster victims.',
        link: '#',
        phone: 'Contact local Legal Aid Society office',
        deadline: 'Ongoing',
        eligibility: 'Low-income individuals',
      },
      {
        id: 7,
        title: 'Disaster Legal Services Program',
        organization: 'American Bar Association',
        description: 'Free legal assistance for disaster victims.',
        link: '#',
        phone: '1-800-285-2221',
        deadline: 'Ongoing',
        eligibility: 'Low-income individuals',
      },
    ],
    community: [
      {
        id: 8,
        title: 'Local Community Organizations',
        organization: 'Various',
        description: 'Local organizations that provide assistance to disaster victims.',
        link: '#',
        phone: 'Contact local organizations',
        deadline: 'Ongoing',
        eligibility: 'Varies by organization',
      },
      {
        id: 9,
        title: 'Volunteer Organizations Active in Disaster (VOAD)',
        organization: 'National VOAD',
        description: 'A coalition of organizations that provide assistance to disaster victims.',
        link: '#',
        phone: 'Contact local VOAD chapter',
        deadline: 'Ongoing',
        eligibility: 'Varies by organization',
      },
    ],
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-info" />
              Post-Disaster Recovery Resources
            </h1>
            <p className="text-muted-foreground">
              Find resources and support to help you recover after a disaster
            </p>
          </div>
        </div>

        <Tabs defaultValue="financial" className="mb-8">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="financial" className="flex items-center space-x-2">
              <Banknote className="h-4 w-4" />
              <span>Financial Assistance</span>
            </TabsTrigger>
            <TabsTrigger value="housing" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Housing Resources</span>
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Legal Services</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Community Support</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="financial" className="mt-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Banknote className="mr-2 h-5 w-5 text-info" />
              Financial Assistance
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {resourcesByCategory.financial.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.organization}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>{resource.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <span className="font-semibold">Phone:</span> {resource.phone}
                      </p>
                      <p>
                        <span className="font-semibold">Deadline:</span> {resource.deadline}
                      </p>
                      <p>
                        <span className="font-semibold">Eligibility:</span> {resource.eligibility}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        Learn More
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="housing" className="mt-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Home className="mr-2 h-5 w-5 text-info" />
              Housing Resources
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {resourcesByCategory.housing.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.organization}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>{resource.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <span className="font-semibold">Phone:</span> {resource.phone}
                      </p>
                      <p>
                        <span className="font-semibold">Deadline:</span> {resource.deadline}
                      </p>
                      <p>
                        <span className="font-semibold">Eligibility:</span> {resource.eligibility}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        Learn More
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="legal" className="mt-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-info" />
              Legal Services
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {resourcesByCategory.legal.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.organization}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>{resource.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <span className="font-semibold">Phone:</span> {resource.phone}
                      </p>
                      <p>
                        <span className="font-semibold">Deadline:</span> {resource.deadline}
                      </p>
                      <p>
                        <span className="font-semibold">Eligibility:</span> {resource.eligibility}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        Learn More
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2 h-5 w-5 text-info" />
              Community Support
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {resourcesByCategory.community.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.organization}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>{resource.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <span className="font-semibold">Phone:</span> {resource.phone}
                      </p>
                      <p>
                        <span className="font-semibold">Deadline:</span> {resource.deadline}
                      </p>
                      <p>
                        <span className="font-semibold">Eligibility:</span> {resource.eligibility}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        Learn More
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Recovery;
