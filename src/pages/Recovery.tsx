
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, FileText, Shield, Home, Phone, Landmark, Users, Briefcase, MessageSquare } from 'lucide-react';
import Layout from '@/components/Layout';

const Recovery = () => {
  const resourcesByCategory = {
    financial: [
      {
        id: 1,
        title: 'Disaster Assistance Application',
        organization: 'Federal Emergency Management Agency',
        description: 'Apply for financial assistance for housing and essential needs after a disaster.',
        link: '#',
        phone: '1-800-621-3362',
        deadline: 'Within 60 days of disaster declaration',
        eligibility: 'Affected residents in declared disaster areas',
      },
      {
        id: 2,
        title: 'Small Business Disaster Loans',
        organization: 'Small Business Administration',
        description: 'Low-interest loans to businesses, homeowners, and renters to repair or replace disaster-damaged property.',
        link: '#',
        phone: '1-800-659-2955',
        deadline: 'Varies by disaster',
        eligibility: 'Business owners, homeowners, and renters in declared disaster areas',
      },
      {
        id: 3,
        title: 'Disaster Unemployment Assistance',
        organization: 'Department of Labor',
        description: 'Financial assistance to individuals who lost their jobs as a direct result of a major disaster.',
        link: '#',
        phone: 'Contact state unemployment office',
        deadline: '30 days after announcement',
        eligibility: 'Workers who lost jobs due to disaster and don't qualify for regular unemployment',
      },
    ],
    housing: [
      {
        id: 1,
        title: 'Transitional Sheltering Assistance',
        organization: 'Federal Emergency Management Agency',
        description: 'Provides temporary housing in hotels or motels for eligible disaster survivors.',
        link: '#',
        phone: '1-800-621-3362',
        deadline: 'Apply immediately after disaster',
        eligibility: 'Displaced individuals and families',
      },
      {
        id: 2,
        title: 'Housing Repair Assistance',
        organization: 'Department of Housing and Urban Development',
        description: 'Grants for home repairs not covered by insurance for low-income homeowners.',
        link: '#',
        phone: '1-800-569-4287',
        deadline: 'Within 180 days of disaster',
        eligibility: 'Low-income homeowners with disaster damage',
      },
    ],
    legal: [
      {
        id: 1,
        title: 'Disaster Legal Services',
        organization: 'American Bar Association',
        description: 'Free legal assistance to low-income disaster survivors for insurance claims, home repair contracts, etc.',
        link: '#',
        phone: '1-800-985-5990',
        deadline: 'None',
        eligibility: 'Low-income individuals affected by declared disasters',
      },
    ],
    mentalHealth: [
      {
        id: 1,
        title: 'Crisis Counseling Assistance',
        organization: 'Substance Abuse and Mental Health Services',
        description: 'Free, confidential counseling services to help people recover from disaster-related distress.',
        link: '#',
        phone: '1-800-985-5990',
        deadline: 'None',
        eligibility: 'Anyone affected by a disaster',
      },
    ],
  };

  const faqItems = [
    {
      question: 'How do I apply for FEMA assistance?',
      answer: 'You can apply for FEMA assistance online at DisasterAssistance.gov, by phone at 1-800-621-3362, or in person at a Disaster Recovery Center. You will need your Social Security number, address of the damaged property, description of the damage, insurance information, phone number, and bank account information for direct deposit.'
    },
    {
      question: 'What documents do I need for disaster assistance applications?',
      answer: 'Typically, you'll need proof of identity (driver's license, passport), proof of occupancy or ownership (deed, mortgage statement, utility bills), insurance information, and documentation of damage (photos, repair estimates). Having these documents ready will help speed up the application process.'
    },
    {
      question: 'How long does it take to receive disaster assistance?',
      answer: 'The timeline varies depending on the type of assistance and your specific situation. After applying, FEMA will inspect your property, typically within 7-10 days. Following inspection, you may receive initial funds within a week if approved. Other programs may take longer.'
    },
    {
      question: 'What if my home is uninhabitable due to a disaster?',
      answer: 'If your home is uninhabitable due to a disaster, you may be eligible for FEMA's Transitional Sheltering Assistance (hotel stays), rental assistance, or temporary housing units. Contact FEMA or visit a local Disaster Recovery Center to discuss your options.'
    },
    {
      question: 'Can I get help replacing lost important documents?',
      answer: 'Yes, you can get assistance replacing important documents lost in a disaster. Visit a Disaster Recovery Center for help with replacing driver's licenses, Social Security cards, birth certificates, tax records, and other important documents.'
    },
    {
      question: 'How do I handle insurance claims after a disaster?',
      answer: 'Contact your insurance company as soon as possible. Document all damage with photos and videos before cleaning up. Keep receipts for all repair work and temporary lodging. If you have difficulty with your claim, contact your state's insurance commissioner or seek free legal assistance through Disaster Legal Services.'
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financial':
        return <Landmark className="h-5 w-5" />;
      case 'housing':
        return <Home className="h-5 w-5" />;
      case 'legal':
        return <FileText className="h-5 w-5" />;
      case 'mentalHealth':
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'financial':
        return 'Financial Assistance';
      case 'housing':
        return 'Housing Support';
      case 'legal':
        return 'Legal Services';
      case 'mentalHealth':
        return 'Mental Health';
      default:
        return category;
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Shield className="mr-2 h-6 w-6 text-info" />
            Post-Disaster Recovery
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Access resources and support to help you recover from disasters. Find assistance with housing, 
            financial aid, legal help, and mental health services during the rebuilding process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-financial-gradient bg-info/10">
            <CardHeader>
              <Landmark className="h-10 w-10 text-info mb-2" />
              <CardTitle>Financial Aid</CardTitle>
              <CardDescription>
                Disaster assistance grants, loans, and unemployment benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Access financial resources to help with recovery expenses, rebuilding costs, and income replacement.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => document.getElementById('financial-tab')?.click()}>
                View Resources
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-housing-gradient bg-success/10">
            <CardHeader>
              <Home className="h-10 w-10 text-success mb-2" />
              <CardTitle>Housing Support</CardTitle>
              <CardDescription>
                Temporary shelter, home repairs, and relocation assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Find temporary housing solutions and get help rebuilding or repairing your damaged home.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => document.getElementById('housing-tab')?.click()}>
                View Resources
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-legal-gradient bg-secondary/10">
            <CardHeader>
              <MessageSquare className="h-10 w-10 text-secondary mb-2" />
              <CardTitle>Recovery Support</CardTitle>
              <CardDescription>
                Legal assistance, mental health services, and more
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Get help navigating insurance claims, contracts, mental health services, and other recovery needs.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => document.getElementById('legal-tab')?.click()}>
                View Resources
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="financial" className="mb-10">
          <TabsList className="mb-4">
            <TabsTrigger value="financial" id="financial-tab">Financial Assistance</TabsTrigger>
            <TabsTrigger value="housing" id="housing-tab">Housing Support</TabsTrigger>
            <TabsTrigger value="legal" id="legal-tab">Legal Services</TabsTrigger>
            <TabsTrigger value="mentalHealth" id="mental-health-tab">Mental Health</TabsTrigger>
          </TabsList>

          {Object.keys(resourcesByCategory).map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="flex items-center mb-4">
                {getCategoryIcon(category)}
                <h2 className="text-xl font-semibold ml-2">
                  {getCategoryName(category)} Resources
                </h2>
              </div>

              {resourcesByCategory[category as keyof typeof resourcesByCategory].map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{resource.title}</CardTitle>
                        <CardDescription>
                          {resource.organization}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        Deadline: {resource.deadline}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{resource.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{resource.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Eligibility: {resource.eligibility}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      <Phone className="mr-2 h-4 w-4" /> Call
                    </Button>
                    <Button>
                      Apply Online
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <div className="mb-10">
          <div className="flex items-center mb-6">
            <Briefcase className="h-6 w-6 mr-2 text-primary" />
            <h2 className="text-2xl font-bold">Recovery Checklist</h2>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-muted rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Document Damage</h3>
                    <p className="text-sm text-muted-foreground">
                      Take photos and videos of all damage before cleaning up or making repairs.
                      Make a detailed list of damaged items.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-muted rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Contact Insurance</h3>
                    <p className="text-sm text-muted-foreground">
                      File claims with your homeowners, flood, or other relevant insurance.
                      Keep records of all conversations with insurance representatives.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-muted rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Apply for Assistance</h3>
                    <p className="text-sm text-muted-foreground">
                      Register with FEMA at DisasterAssistance.gov or call 1-800-621-3362.
                      Visit a local Disaster Recovery Center if one is available.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-muted rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Restore Utilities</h3>
                    <p className="text-sm text-muted-foreground">
                      Contact utility companies to restore services or report outages.
                      Have electrical systems inspected before turning power back on if there was flooding.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-muted rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Clean and Repair</h3>
                    <p className="text-sm text-muted-foreground">
                      Follow safety guidelines for cleanup, wear protective gear.
                      Hire licensed contractors for major repairs and check references.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-muted rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Replace Documents</h3>
                    <p className="text-sm text-muted-foreground">
                      Replace lost identification, property deeds, medical records, and other important documents.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-muted rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Seek Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with disaster case managers and community resources.
                      Don't neglect mental health needs during recovery.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center mb-6">
            <MessageSquare className="h-6 w-6 mr-2 text-primary" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Can't find your answer? Contact our support team for more assistance.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Recovery;
