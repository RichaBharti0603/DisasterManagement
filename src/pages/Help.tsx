
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, MessageSquare, Mail, MapPin, Clock, Info, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

const Help = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setUrgency('');
      
      setIsSubmitting(false);
    }, 1500);
  };

  // FAQ data
  const faqItems = [
    {
      category: 'general',
      questions: [
        {
          question: 'How do I sign up for emergency alerts?',
          answer: 'You can sign up for emergency alerts by creating an account and enabling notifications in your profile settings. You can customize the types of alerts you want to receive and your preferred notification methods (email, SMS, push notifications).'
        },
        {
          question: 'What should I do during an evacuation order?',
          answer: 'When an evacuation order is issued, you should: 1) Gather your emergency kit and important documents, 2) Secure your home, 3) Follow designated evacuation routes, 4) Check in at evacuation centers if needed, and 5) Stay informed through official channels. Our app provides real-time evacuation routes and shelter locations.'
        },
        {
          question: 'How can I volunteer during a disaster?',
          answer: 'You can volunteer by visiting the Community & Volunteers section of our app. There, you can register as a volunteer, view current opportunities, and sign up for specific roles based on your skills and availability.'
        },
      ]
    },
    {
      category: 'shelters',
      questions: [
        {
          question: 'Are pets allowed in emergency shelters?',
          answer: 'Pet policies vary by shelter. Our Shelter Locator includes information about which shelters accept pets. Look for the "Pets Allowed" indicator when searching for shelters. We recommend having a pet emergency plan in place before disasters occur.'
        },
        {
          question: 'What should I bring to an emergency shelter?',
          answer: 'You should bring: 1) Personal identification, 2) Essential medications and medical supplies, 3) Basic toiletries, 4) Change of clothes, 5) Blankets or sleeping bags, 6) Comfort items for children, 7) Mobile phone and charger, and 8) Small games or books for entertainment. Shelter space is limited, so bring only essential items.'
        },
        {
          question: 'How long can I stay at an emergency shelter?',
          answer: 'Emergency shelters typically provide temporary accommodation during the immediate disaster period. The length of stay varies depending on the disaster severity and your specific situation. Shelter staff work with displaced individuals to find longer-term solutions if needed.'
        },
      ]
    },
    {
      category: 'recovery',
      questions: [
        {
          question: 'How do I apply for disaster assistance?',
          answer: 'You can apply for disaster assistance through our Recovery page, which links to various aid programs. You'll need to provide documentation about your identity, residence, and disaster-related damages. Our app provides guidance for each step of the application process.'
        },
        {
          question: 'What documents should I have ready for insurance claims?',
          answer: 'You should have: 1) Insurance policy information, 2) Photos/videos of damage, 3) Inventory of damaged items, 4) Estimates for repairs, 5) Any temporary housing receipts, and 6) Communication records with insurance companies. Our app allows you to securely store these documents for easy access.'
        },
        {
          question: 'How can I find contractors for home repairs after a disaster?',
          answer: 'Our Recovery section includes verified contractor listings and resources for finding reputable services. Always check credentials, get multiple estimates, and beware of repair scams after disasters. You can also connect with community members for recommendations.'
        },
      ]
    },
    {
      category: 'account',
      questions: [
        {
          question: 'How do I update my emergency contacts?',
          answer: 'You can update your emergency contacts by going to your profile page and selecting "Emergency Contacts." There, you can add, edit, or remove contacts. We recommend having at least two emergency contacts who live in different areas.'
        },
        {
          question: 'Can I use the app without creating an account?',
          answer: 'Yes, basic features like viewing alerts and finding shelters are available without an account. However, creating an account allows you to receive personalized alerts, save your emergency plan, store important documents, and access additional features.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'To reset your password, click on "Forgot Password" on the login page. Enter your email address, and we'll send you a link to create a new password. For security reasons, password reset links expire after 24 hours.'
        },
      ]
    },
  ];

  // Emergency contact centers
  const emergencyContacts = [
    {
      name: 'Emergency Operations Center',
      phone: '911',
      hours: '24/7',
      description: 'For immediate life-threatening emergencies',
    },
    {
      name: 'Disaster Response Hotline',
      phone: '1-800-555-HELP',
      hours: '24/7 during active disasters',
      description: 'Current disaster information and guidance',
    },
    {
      name: 'Recovery Assistance Center',
      phone: '1-800-555-RECOVER',
      hours: 'Mon-Fri, 8am-6pm',
      description: 'Support for disaster recovery and resources',
    },
    {
      name: 'Mental Health Crisis Line',
      phone: '1-800-555-CRISIS',
      hours: '24/7',
      description: 'Emotional support during and after disasters',
    },
  ];

  // Support centers
  const supportCenters = [
    {
      name: 'Main Support Center',
      address: '123 Help St, Lincoln, NE 68508',
      phone: '(402) 555-1234',
      hours: 'Mon-Fri: 9am-5pm',
    },
    {
      name: 'Northside Community Hub',
      address: '456 Support Ave, Lincoln, NE 68521',
      phone: '(402) 555-5678',
      hours: 'Mon-Sat: 10am-4pm',
    },
    {
      name: 'Eastside Assistance Center',
      address: '789 Resource Blvd, Lincoln, NE 68510',
      phone: '(402) 555-9012',
      hours: 'Mon-Fri: 8am-7pm, Sat: 9am-3pm',
    },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Phone className="mr-2 h-6 w-6 text-primary" />
            Contact & Help
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Get assistance, find answers to common questions, and connect with our support team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <Card className="lg:col-span-2">
            <Tabs defaultValue="contact">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="faq">FAQs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact" className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-4">Send us a message</h2>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="urgency">Urgency</Label>
                        <Select value={urgency} onValueChange={setUrgency}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - General question</SelectItem>
                            <SelectItem value="medium">Medium - Need assistance</SelectItem>
                            <SelectItem value="high">High - Urgent issue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="What's your message about?"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="How can we help you?"
                          className="min-h-[150px]"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </div>
                  
                  <div className="flex-1 md:border-l md:pl-6 space-y-8">
                    <div>
                      <h2 className="text-xl font-bold mb-4">Emergency Contacts</h2>
                      <div className="space-y-4">
                        {emergencyContacts.map((contact, index) => (
                          <div key={index} className="border rounded-md p-4">
                            <h3 className="font-medium mb-1">{contact.name}</h3>
                            <div className="flex items-center text-sm mb-1">
                              <Phone className="h-4 w-4 mr-1 text-emergency" />
                              <span className="font-medium">{contact.phone}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{contact.hours}</span>
                            </div>
                            <p className="text-sm">{contact.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h2 className="text-xl font-bold mb-4">Email Support</h2>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 mr-2 text-primary" />
                          <a href="mailto:support@disasterhaven.org" className="hover:underline">
                            support@disasterhaven.org
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Response time: Within 24-48 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                  
                  <Tabs defaultValue="general">
                    <TabsList className="mb-4">
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="shelters">Shelters</TabsTrigger>
                      <TabsTrigger value="recovery">Recovery</TabsTrigger>
                      <TabsTrigger value="account">Account</TabsTrigger>
                    </TabsList>
                    
                    {faqItems.map((category) => (
                      <TabsContent key={category.category} value={category.category}>
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                              <AccordionTrigger>{faq.question}</AccordionTrigger>
                              <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </TabsContent>
                    ))}
                  </Tabs>
                  
                  <div className="mt-8 p-4 bg-muted rounded-md flex items-start">
                    <Info className="h-5 w-5 text-info mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">
                      Didn't find what you're looking for? Contact our support team for more assistance.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Support Centers
              </CardTitle>
              <CardDescription>
                Visit one of our in-person support centers for assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {supportCenters.map((center, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium mb-2">{center.name}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                      <span>{center.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{center.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{center.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <MapPin className="mr-2 h-4 w-4" />
                View on Map
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-emergency" />
              Report an Emergency Situation
            </CardTitle>
            <CardDescription>
              If you need immediate assistance during an emergency, please call 911.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-emergency/10 border border-emergency/20 rounded-md p-4">
              <h3 className="font-medium mb-2 text-emergency-dark">Emergency Resources:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-emergency" />
                  <span><strong>Emergency Services:</strong> 911</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-emergency" />
                  <span><strong>Disaster Relief Hotline:</strong> 1-800-555-HELP</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-emergency" />
                  <span><strong>Poison Control:</strong> 1-800-222-1222</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-emergency" />
                  <span><strong>Mental Health Crisis Line:</strong> 1-800-555-CRISIS</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Feedback and Suggestions</CardTitle>
            <CardDescription>
              Help us improve the DisasterHaven platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Feedback Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of feedback" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="praise">Praise</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your thoughts, suggestions, or report issues"
                  className="min-h-[120px]"
                />
              </div>
              <Button className="w-full">
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Help;
