
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, CreditCard, Truck, HandHeart, Users, Gift, Package, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

const Donation = () => {
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [causeType, setCauseType] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleAmountSelect = (amount: string) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setDonationAmount('custom');
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!donationAmount || (donationAmount === 'custom' && !customAmount)) {
      toast({
        title: "Error",
        description: "Please select or enter a donation amount",
        variant: "destructive",
      });
      return;
    }
    
    if (!donorName && !isAnonymous) {
      toast({
        title: "Error",
        description: "Please enter your name or choose to donate anonymously",
        variant: "destructive",
      });
      return;
    }
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for your donation!",
        description: "Your contribution will help those affected by disasters.",
      });
      
      // Reset form
      setDonationAmount('');
      setCustomAmount('');
      setDonorName('');
      setEmail('');
      setPhoneNumber('');
      setPaymentMethod('credit-card');
      setIsMonthly(false);
      setIsAnonymous(false);
      setCauseType('');
      setMessage('');
      
      setIsSubmitting(false);
    }, 1500);
  };

  // Mock data for active campaigns
  const disasterCampaigns = [
    {
      id: 1,
      title: 'Hurricane Relief Fund',
      description: 'Supporting families affected by recent hurricanes with shelter, food, and essential supplies.',
      raised: 85000,
      goal: 100000,
      donorsCount: 1250,
      daysLeft: 12,
      image: 'hurricane.jpg',
    },
    {
      id: 2,
      title: 'Wildfire Recovery Initiative',
      description: 'Helping communities rebuild after devastating wildfires destroyed homes and infrastructure.',
      raised: 45000,
      goal: 75000,
      donorsCount: 560,
      daysLeft: 20,
      image: 'wildfire.jpg',
    },
    {
      id: 3,
      title: 'Flood Response & Rebuilding',
      description: 'Immediate aid and long-term support for families displaced by severe flooding.',
      raised: 32000,
      goal: 50000,
      donorsCount: 430,
      daysLeft: 15,
      image: 'flood.jpg',
    },
  ];

  // Mock data for supply needs
  const supplyNeeds = [
    {
      id: 1,
      item: 'Canned Food',
      needed: 500,
      received: 320,
      priority: 'high',
    },
    {
      id: 2,
      item: 'Blankets',
      needed: 300,
      received: 150,
      priority: 'high',
    },
    {
      id: 3,
      item: 'Baby Formula',
      needed: 100,
      received: 25,
      priority: 'critical',
    },
    {
      id: 4,
      item: 'Water Bottles',
      needed: 1000,
      received: 800,
      priority: 'medium',
    },
    {
      id: 5,
      item: 'First Aid Kits',
      needed: 200,
      received: 90,
      priority: 'high',
    },
  ];

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-white bg-emergency';
      case 'high':
        return 'text-white bg-alert';
      case 'medium':
        return 'text-white bg-info';
      default:
        return 'text-white bg-gray-500';
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Heart className="mr-2 h-6 w-6 text-secondary" />
              Donation & Support
            </h1>
            <p className="text-muted-foreground">
              Help communities affected by disasters through donations and support
            </p>
          </div>
        </div>

        <Tabs defaultValue="money">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="money">Financial Donation</TabsTrigger>
            <TabsTrigger value="supplies">Supply Donation</TabsTrigger>
          </TabsList>

          {/* Financial Donations Tab */}
          <TabsContent value="money" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Donation Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Make a Donation
                  </CardTitle>
                  <CardDescription>
                    Your financial support can make a real difference in disaster relief efforts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonateSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label>Donation Amount</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          type="button"
                          variant={donationAmount === '10' ? "default" : "outline"}
                          onClick={() => handleAmountSelect('10')}
                        >
                          &#8377;10
                        </Button>
                        <Button
                          type="button"
                          variant={donationAmount === '25' ? "default" : "outline"}
                          onClick={() => handleAmountSelect('25')}
                        >
                          &#8377;25
                        </Button>
                        <Button
                          type="button"
                          variant={donationAmount === '50' ? "default" : "outline"}
                          onClick={() => handleAmountSelect('50')}
                        >
                          &#8377;50
                        </Button>
                        <Button
                          type="button"
                          variant={donationAmount === '100' ? "default" : "outline"}
                          onClick={() => handleAmountSelect('100')}
                        >
                          &#8377;100
                        </Button>
                        <Button
                          type="button"
                          variant={donationAmount === '250' ? "default" : "outline"}
                          onClick={() => handleAmountSelect('250')}
                        >
                          &#8377;250
                        </Button>
                        <Button
                          type="button"
                          variant={donationAmount === 'custom' ? "default" : "outline"}
                          onClick={() => handleAmountSelect('custom')}
                        >
                          Custom
                        </Button>
                      </div>
                      {donationAmount === 'custom' && (
                        <div className="mt-2">
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="monthly"
                          checked={isMonthly}
                          onCheckedChange={setIsMonthly}
                        />
                        <Label htmlFor="monthly">Make this a monthly donation</Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Support a Specific Cause</Label>
                      <Select value={causeType} onValueChange={setCauseType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a disaster relief fund" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hurricane">Hurricane Relief</SelectItem>
                          <SelectItem value="wildfire">Wildfire Recovery</SelectItem>
                          <SelectItem value="flood">Flood Response</SelectItem>
                          <SelectItem value="earthquake">Earthquake Aid</SelectItem>
                          <SelectItem value="general">General Disaster Fund</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="name">Name</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="anonymous"
                              checked={isAnonymous}
                              onCheckedChange={setIsAnonymous}
                            />
                            <Label htmlFor="anonymous" className="text-xs">Donate Anonymously</Label>
                          </div>
                        </div>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          disabled={isAnonymous}
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="9891181040"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal">PayPal</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Leave a message of support"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    onClick={handleDonateSubmit}
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        {donationAmount === 'custom'
                          ? `Donate $${customAmount || '0'}`
                          : `Donate $${donationAmount || '0'}`}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {/* Active Campaigns */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HandHeart className="mr-2 h-5 w-5" />
                      Active Campaigns
                    </CardTitle>
                    <CardDescription>
                      Current disaster relief efforts that need support
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {disasterCampaigns.map((campaign) => (
                      <div key={campaign.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{campaign.title}</h3>
                          <span className="text-xs px-2 py-1 bg-muted rounded-full">
                            {campaign.daysLeft} days left
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {campaign.description}
                        </p>
                        <Progress
                          value={(campaign.raised / campaign.goal) * 100}
                          className="h-2"
                        />
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">
                            ${campaign.raised.toLocaleString()} raised
                          </span>
                          <span className="text-muted-foreground">
                            of ${campaign.goal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          {campaign.donorsCount} donors
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            handleAmountSelect('50');
                            setCauseType(campaign.title.toLowerCase().split(' ')[0]);
                          }}
                        >
                          Support This Cause
                        </Button>
                        {campaign.id !== disasterCampaigns.length && (
                          <div className="border-t my-4" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Supply Donations Tab */}
          <TabsContent value="supplies" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="mr-2 h-5 w-5" />
                    Donate Supplies
                  </CardTitle>
                  <CardDescription>
                    Contribute essential items to help those affected by disasters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Current Supply Needs</h3>
                    <div className="rounded-md border">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Item
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Needed
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Received
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Priority
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-card divide-y divide-border">
                          {supplyNeeds.map((item) => (
                            <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {item.item}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {item.needed.toLocaleString()} units
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex items-center">
                                  <span className="mr-2">
                                    {item.received.toLocaleString()} units
                                  </span>
                                  <Progress
                                    value={(item.received / item.needed) * 100}
                                    className="h-2 w-20"
                                  />
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClass(item.priority)}`}>
                                  {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Drop-off Locations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Central Relief Center</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Abc Corporate Office, Kolkata
                          </p>
                          <p className="text-sm mb-2">
                            <span className="font-medium">Hours:</span> 9am-5pm, Mon-Sat
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Phone:</span> 9891580834
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Eastside Community Hub</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            XYZ- Street, New Delhi-20
                          </p>
                          <p className="text-sm mb-2">
                            <span className="font-medium">Hours:</span> 10am-7pm, Mon-Fri
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Phone:</span> 9891580834
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Schedule a Pickup</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="your@email.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="9891580834" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date">Pickup Date</Label>
                          <Input id="date" type="date" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="Street address" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="City" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="State" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">Zip Code</Label>
                          <Input id="zip" placeholder="Zip code" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="items">Items to Donate</Label>
                        <Textarea
                          id="items"
                          placeholder="Please list the items you wish to donate and their approximate quantities"
                          className="min-h-[80px]"
                        />
                      </div>
                      <Button className="w-full">
                        <Truck className="mr-2 h-4 w-4" />
                        Schedule Pickup
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-1">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="mr-2 h-5 w-5" />
                      Donation Guidelines
                    </CardTitle> 
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Acceptable Items</h3>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Non-perishable food items</li>
                        <li>Bottled water</li>
                        <li>New clothing and blankets</li>
                        <li>Personal hygiene products</li>
                        <li>Baby supplies</li>
                        <li>First aid supplies</li>
                        <li>Cleaning supplies</li>
                        <li>Batteries and flashlights</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">We Cannot Accept</h3>
                      <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                        <li>Used clothing in poor condition</li>
                        <li>Expired food or medication</li>
                        <li>Homemade food items</li>
                        <li>Opened personal care items</li>
                        <li>Hazardous materials</li>
                        <li>Large furniture</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-muted rounded-md flex items-start">
                      <AlertTriangle className="h-5 w-5 text-alert mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-xs">
                        All donations should be clean, in good condition, and ready for
                        immediate distribution to those in need.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Gift className="mr-2 h-5 w-5" />
                      Your Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">
                      Your donations directly help disaster survivors with:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-info/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-info text-xs font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Emergency Shelter</h4>
                          <p className="text-xs text-muted-foreground">
                            Providing safe places for displaced families
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-info/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-info text-xs font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Food & Clean Water</h4>
                          <p className="text-xs text-muted-foreground">
                            Essential nutrition and hydration during emergencies
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-info/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-info text-xs font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Medical Assistance</h4>
                          <p className="text-xs text-muted-foreground">
                            Critical healthcare for the injured and vulnerable
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-info/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-info text-xs font-bold">4</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Recovery Support</h4>
                          <p className="text-xs text-muted-foreground">
                            Long-term rebuilding of homes and communities
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="pt-2">
                      <Button variant="outline" className="w-full">
                        See Success Stories
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Donation;
