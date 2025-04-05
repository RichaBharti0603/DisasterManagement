
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertTriangle, MailQuestion, Shield, HelpCircle } from 'lucide-react';
import Layout from '@/components/Layout';

const Help = () => {
  // FAQ data
  const faqItems = [
    {
      category: 'general',
      title: 'General Inquiries',
      icon: <HelpCircle className="h-5 w-5 mr-2" />,
      questions: [
        {
          question: 'What is DisasterHaven?',
          answer: 'DisasterHaven is a platform designed to provide real-time alerts, resources, and community support during natural disasters and emergencies. Our goal is to ensure quick response and coordination to help keep communities safe.'
        },
        {
          question: 'How do I sign up for alerts?',
          answer: 'You can sign up for alerts by creating an account on our Signup page. Once registered, you can customize your alert preferences to receive notifications relevant to your location and interests.'
        },
        {
          question: 'Is my data secure?',
          answer: 'Yes, we take data security seriously. We use industry-standard encryption and security measures to protect your personal information. Please review our Privacy Policy for more details.'
        }
      ]
    },
    {
      category: 'alerts',
      title: 'Alerts & Notifications',
      icon: <AlertTriangle className="h-5 w-5 mr-2" />,
      questions: [
        {
          question: 'How do I customize my alert preferences?',
          answer: 'After logging in, navigate to your profile settings. Here, you can specify the types of alerts you wish to receive, set your location preferences, and manage notification settings.'
        },
        {
          question: 'What types of alerts does DisasterHaven provide?',
          answer: 'We provide alerts for a variety of natural disasters and emergencies, including hurricanes, floods, wildfires, earthquakes, and more. Our alerts are sourced from reliable public emergency APIs to ensure accuracy.'
        },
        {
          question: 'How quickly will I receive alerts?',
          answer: 'Our alert system is designed to provide real-time notifications. You should receive alerts as soon as they are issued by official sources, ensuring you have timely information to stay safe.'
        }
      ]
    },
    {
      category: 'donation',
      title: 'Donation & Support',
      icon: <Heart className="h-5 w-5 mr-2" />,
      questions: [
        {
          question: 'How can I donate to disaster relief efforts?',
          answer: 'You can donate to disaster relief efforts through our Donation page. We partner with reputable organizations to ensure your contributions reach those in need. We accept various forms of payment for your convenience.'
        },
        {
          question: 'Are my donations tax-deductible?',
          answer: 'Donations made through our platform to registered non-profit organizations are typically tax-deductible. Please check with the specific organization and consult your tax advisor for confirmation.'
        },
        {
          question: 'How does DisasterHaven ensure donations are used effectively?',
          answer: 'We carefully vet our partner organizations to ensure they have a proven track record of effective disaster relief. We also provide transparency reports to show how donations are being used to support affected communities.'
        }
      ]
    },
    {
      category: 'recovery',
      title: 'Recovery Resources',
      icon: <Shield className="h-5 w-5 mr-2" />,
      questions: [
        {
          question: 'How do I apply for disaster assistance?',
          answer: "You can apply for disaster assistance through our Recovery page, which links to various aid programs. You'll need to provide documentation about your identity, residence, and disaster-related damages. Our app provides guidance for each step of the application process."
        },
        {
          question: 'What resources are available for temporary housing?',
          answer: 'We provide a list of resources for temporary housing on our Shelters page. These resources include emergency shelters, transitional housing programs, and assistance with finding temporary accommodation.'
        },
        {
          question: 'How can I get help with mental health support?',
          answer: 'We offer a directory of mental health resources on our Community page. These resources include counseling services, support groups, and crisis hotlines to help you cope with the emotional impact of disasters.'
        }
      ]
    },
    {
      category: 'contact',
      title: 'Contact & Support',
      icon: <MailQuestion className="h-5 w-5 mr-2" />,
      questions: [
        {
          question: 'How can I contact DisasterHaven support?',
          answer: 'You can contact our support team through the Contact Us form on our Help page. We aim to respond to all inquiries within 24 hours. You can also reach us via phone during business hours.'
        },
        {
          question: 'What if I have a suggestion for improving the app?',
          answer: 'We welcome your suggestions! Please use the Contact Us form on our Help page to submit your ideas. Our team reviews all feedback to improve our platform and better serve our users.'
        },
        {
          question: 'How do I report a bug or technical issue?',
          answer: 'If you encounter a bug or technical issue, please report it through the Contact Us form on our Help page. Provide as much detail as possible, including the steps to reproduce the issue, so our team can resolve it quickly.'
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">Find answers to common questions about DisasterHaven and how to use our platform.</p>

        <div className="space-y-6">
          {faqItems.map((category) => (
            <Card key={category.category}>
              <CardHeader className="flex flex-row items-center">
                {category.icon}
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {category.questions.map((item, index) => (
                    <AccordionItem key={index} value={`item-${category.category}-${index}`}>
                      <AccordionTrigger className="flex justify-between items-center py-3">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="py-2">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

import { Heart } from 'lucide-react';
export default Help;
