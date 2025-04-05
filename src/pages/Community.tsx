import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, Calendar, MapPin, Clock, Users, Search, CheckCircle2, User, MessageSquare, ThumbsUp, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

const Community = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Mock data for volunteer opportunities
  const volunteerOpportunities = [
    {
      id: 1,
      title: 'Flood Relief Volunteers',
      organization: 'Red Cross',
      location: 'Odisha',
      date: '2023-09-25',
      startTime: '09:00 AM',
      endTime: '04:00 PM',
      description: 'Help distribute supplies, clean up debris, and assist affected families in flood-damaged areas.',
      skills: ['Physical Labor', 'Customer Service', 'Organization'],
      volunteersNeeded: 25,
      volunteersSignedUp: 18,
      image: 'red-cross.jpg',
    },
    {
      id: 2,
      title: 'Wildfire Recovery Team',
      organization: 'Community Rebuild',
      location: 'Delhi',
      date: '2023-10-05',
      startTime: '08:00 AM',
      endTime: '03:00 PM',
      description: 'Join our team to help rebuild structures and clear land damaged by recent wildfires.',
      skills: ['Construction', 'Landscaping', 'Teamwork'],
      volunteersNeeded: 15,
      volunteersSignedUp: 10,
      image: 'community-rebuild.jpg',
    },
    {
      id: 3,
      title: 'Hurricane Evacuation Center Support',
      organization: 'Disaster Relief Network',
      location: 'Saket, Delhi',
      date: '2023-09-18',
      startTime: '10:00 AM',
      endTime: '06:00 PM',
      description: 'Provide support and assistance at hurricane evacuation centers, including meal distribution and check-in services.',
      skills: ['Compassion', 'Organization', 'Communication'],
      volunteersNeeded: 30,
      volunteersSignedUp: 22,
      image: 'disaster-relief.jpg',
    },
    {
      id: 4,
      title: 'Emergency Supply Distribution',
      organization: 'Local Emergency Management',
      location: 'Ayanagar, Delhi',
      date: '2023-09-30',
      startTime: '07:00 AM',
      endTime: '02:00 PM',
      description: 'Help sort, package, and distribute emergency supplies to affected communities.',
      skills: ['Organization', 'Physical Labor', 'Attention to Detail'],
      volunteersNeeded: 20,
      volunteersSignedUp: 8,
      image: 'emergency-management.jpg',
    },
  ];

  // Mock data for community discussions
  const communityDiscussions = [
    {
      id: 1,
      title: 'Tips for Preparing an Emergency Kit',
      author: 'Richa Bharti',
      authorRole: 'Emergency Preparedness Specialist',
      date: '2023-09-10',
      content: 'I wanted to share some essential items that every household should have in their emergency kit. Based on my experience...',
      replies: 24,
      likes: 45,
      avatar: 'sarah-johnson.jpg',
    },
    {
      id: 2,
      title: 'Looking for volunteers for elderly check-ins',
      author: 'Mudita Jain',
      authorRole: 'Community Organizer',
      date: '2023-09-12',
      content: 'We need volunteers to check on elderly residents during the upcoming storm. Please comment if you can help...',
      replies: 18,
      likes: 32,
      avatar: 'michael-chen.jpg',
    },
    {
      id: 3,
      title: 'Shelter options for pets during evacuation',
      author: 'Jessica Martinez',
      authorRole: 'Animal Rescue Coordinator',
      date: '2023-09-14',
      content: "Many people don't know where they can bring their pets during evacuations. Here's a list of pet-friendly shelters in our area...",
      replies: 30,
      likes: 56,
      avatar: 'jessica-martinez.jpg',
    },
  ];

  // Mock data for success stories
  const successStories = [
    {
      id: 1,
      title: 'Rebuilding Together: Smithville Recovery',
      author: 'Revant Prabhas',
      date: '2023-08-25',
      content: 'After the tornado devastated our town, over 200 volunteers came together to rebuild the community center. This became our central hub for recovery efforts and brought our community closer than ever before.',
      image: 'smithville.jpg',
      likes: 89,
    },
    {
      id: 2,
      title: 'Senior Rescue During Flash Floods',
      author: 'Volunteer Rescue Team',
      date: '2023-07-15',
      content: 'When flash floods hit unexpectedly, our volunteer team was able to safely evacuate 45 seniors from the Oakridge Retirement Community. The coordination between volunteers and emergency services was remarkable.',
      image: 'flood-rescue.jpg',
      likes: 124,
    },
  ];

  const filteredOpportunities = volunteerOpportunities.filter(opportunity => {
    if (!searchQuery) return true;
    return (
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.organization.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleVolunteerSignup = (opportunityId: number) => {
    toast({
      title: "Thank you for volunteering!",
      description: "Your registration has been received. Check your email for more details.",
    });
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Post submitted!",
      description: "Your discussion post has been shared with the community.",
    });
  };

  const getVolunteerProgress = (signed: number, needed: number) => {
    return (signed / needed) * 100;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Users className="mr-2 h-6 w-6 text-alert" />
              Community & Volunteers
            </h1>
            <p className="text-muted-foreground">
              Connect with your community, find volunteer opportunities, and share resources
            </p>
          </div>
          
          <div className="relative w-full md:w-auto mt-4 md:mt-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search opportunities..."
              className="pl-8 w-full md:w-[260px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="opportunities" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
            <TabsTrigger value="opportunities">Volunteer</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
          </TabsList>

          {/* Volunteer Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row justify-between md:items-center">
                        <div>
                          <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                          <CardDescription>
                            <span className="font-medium">{opportunity.organization}</span>
                          </CardDescription>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Badge variant="outline" className="mr-2">
                            <Calendar className="mr-1 h-3 w-3" />
                            {formatDate(opportunity.date)}
                          </Badge>
                          <Badge variant="outline">
                            <MapPin className="mr-1 h-3 w-3" />
                            {opportunity.location}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="mb-4">{opportunity.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {opportunity.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Volunteers:</span>
                            <span className="font-medium">
                              {opportunity.volunteersSignedUp} / {opportunity.volunteersNeeded}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div 
                              className="bg-info h-2.5 rounded-full" 
                              style={{ width: `${getVolunteerProgress(opportunity.volunteersSignedUp, opportunity.volunteersNeeded)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{opportunity.startTime} - {opportunity.endTime}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>
                              {opportunity.volunteersNeeded - opportunity.volunteersSignedUp} spots left
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button variant="outline">
                        View Details
                      </Button>
                      <Button onClick={() => handleVolunteerSignup(opportunity.id)}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Sign Up
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </div>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Register as a Volunteer</CardTitle>
                <CardDescription>
                  Sign up to receive notifications about new volunteer opportunities that match your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Richa" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="(91) 9876543210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="City, State" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills & Experience</Label>
                    <Textarea
                      id="skills"
                      placeholder="List your skills and relevant experience"
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Textarea
                      id="availability"
                      placeholder="When are you available to volunteer? (days, times)"
                      className="min-h-[80px]"
                    />
                  </div>
                  <Button className="w-full">
                    Register as Volunteer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            {/* New Post Form */}
            <Card>
              <CardHeader>
                <CardTitle>Start a Discussion</CardTitle>
                <CardDescription>
                  Share resources, ask questions, or coordinate with your community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Title</Label>
                    <Input id="post-title" placeholder="What's your discussion about?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-content">Content</Label>
                    <Textarea
                      id="post-content"
                      placeholder="Share your thoughts, questions, or resources..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button type="submit">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Post Discussion
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Discussion List */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Recent Discussions</h2>
              
              {communityDiscussions.map((discussion) => (
                <Card key={discussion.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <CardTitle>{discussion.title}</CardTitle>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(discussion.date)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={discussion.avatar} alt={discussion.author} />
                        <AvatarFallback>{discussion.author.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm font-medium">{discussion.author}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {discussion.authorRole}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm">{discussion.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MessageSquare className="h-3.5 w-3.5 mr-1" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Discussion
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="success" className="space-y-6">
            <div className="grid gap-6">
              {successStories.map((story) => (
                <Card key={story.id} className="overflow-hidden">
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{story.title}</CardTitle>
                      <Badge variant="outline">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {formatDate(story.date)}
                      </Badge>
                    </div>
                    <CardDescription>
                      Shared by {story.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{story.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-muted-foreground">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{story.likes} people found this inspiring</span>
                    </div>
                    <Button variant="outline">
                      Read Full Story
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Share Your Success Story</CardTitle>
                <CardDescription>
                  Inspire others by sharing how your community came together during disaster recovery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="story-title">Title</Label>
                    <Input id="story-title" placeholder="Give your story a title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="story-content">Your Story</Label>
                    <Textarea
                      id="story-content"
                      placeholder="Share your community's success story..."
                      className="min-h-[150px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="story-image">Add Images (Optional)</Label>
                    <Input id="story-image" type="file" />
                  </div>
                  <Button className="w-full">
                    Submit Your Story
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Community;
