
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Search, MapPin, Phone, Users, Clock, HomeIcon, Bike, Car } from 'lucide-react';
import Layout from '@/components/Layout';

interface Shelter {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  capacity: number;
  occupancy: number;
  type: 'evacuation' | 'long-term' | 'medical';
  amenities: string[];
  distance: number;
  openingHours: string;
  hasAvailability: boolean;
  hasAccessibility: boolean;
  hasPets: boolean;
  hasFood: boolean;
  hasWater: boolean;
  hasMedical: boolean;
  hasInternet: boolean;
  hasShower: boolean;
}

const Shelters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxDistance, setMaxDistance] = useState(50);
  const [filters, setFilters] = useState({
    hasAvailability: true,
    hasAccessibility: false,
    hasPets: false,
    hasFood: false,
    hasMedical: false,
  });

  // Mock data for shelters
  const sheltersData: Shelter[] = [
    {
      id: 1,
      name: 'Central Community Center',
      address: '123 Main St',
      city: 'Lincoln',
      state: 'NE',
      zipCode: '68508',
      phone: '(402) 555-1234',
      capacity: 200,
      occupancy: 120,
      type: 'evacuation',
      amenities: ['Food', 'Water', 'Medical', 'Restrooms', 'Charging Stations'],
      distance: 2.3,
      openingHours: '24/7 during emergencies',
      hasAvailability: true,
      hasAccessibility: true,
      hasPets: true,
      hasFood: true,
      hasWater: true,
      hasMedical: true,
      hasInternet: true,
      hasShower: true,
    },
    {
      id: 2,
      name: 'Eastside High School',
      address: '456 Oak Ave',
      city: 'Lincoln',
      state: 'NE',
      zipCode: '68510',
      phone: '(402) 555-5678',
      capacity: 350,
      occupancy: 280,
      type: 'evacuation',
      amenities: ['Food', 'Water', 'Restrooms', 'Charging Stations'],
      distance: 4.7,
      openingHours: '8:00 AM - 10:00 PM',
      hasAvailability: true,
      hasAccessibility: true,
      hasPets: false,
      hasFood: true,
      hasWater: true,
      hasMedical: false,
      hasInternet: true,
      hasShower: true,
    },
    {
      id: 3,
      name: 'Westview Medical Shelter',
      address: '789 Elm St',
      city: 'Lincoln',
      state: 'NE',
      zipCode: '68512',
      phone: '(402) 555-9012',
      capacity: 120,
      occupancy: 110,
      type: 'medical',
      amenities: ['Medical Care', 'Food', 'Water', 'Restrooms', 'Accessibility'],
      distance: 6.1,
      openingHours: '24/7',
      hasAvailability: true,
      hasAccessibility: true,
      hasPets: false,
      hasFood: true,
      hasWater: true,
      hasMedical: true,
      hasInternet: true,
      hasShower: true,
    },
    {
      id: 4,
      name: 'Northside Church',
      address: '321 Pine Rd',
      city: 'Lincoln',
      state: 'NE',
      zipCode: '68521',
      phone: '(402) 555-3456',
      capacity: 150,
      occupancy: 60,
      type: 'evacuation',
      amenities: ['Food', 'Water', 'Restrooms', 'Pet Area'],
      distance: 8.4,
      openingHours: '7:00 AM - 9:00 PM',
      hasAvailability: true,
      hasAccessibility: false,
      hasPets: true,
      hasFood: true,
      hasWater: true,
      hasMedical: false,
      hasInternet: false,
      hasShower: false,
    },
    {
      id: 5,
      name: 'Southside Long Term Relief Center',
      address: '987 Cedar Blvd',
      city: 'Lincoln',
      state: 'NE',
      zipCode: '68516',
      phone: '(402) 555-7890',
      capacity: 200,
      occupancy: 190,
      type: 'long-term',
      amenities: ['Food', 'Water', 'Restrooms', 'Laundry', 'Counseling'],
      distance: 10.2,
      openingHours: '24/7',
      hasAvailability: true,
      hasAccessibility: true,
      hasPets: true,
      hasFood: true,
      hasWater: true,
      hasMedical: true,
      hasInternet: true,
      hasShower: true,
    },
  ];

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters({
      ...filters,
      [key]: !filters[key],
    });
  };

  const filteredShelters = sheltersData
    .filter((shelter) => {
      // Filter by search query
      if (searchQuery && !shelter.name.toLowerCase().includes(searchQuery.toLowerCase())
        && !shelter.city.toLowerCase().includes(searchQuery.toLowerCase())
        && !shelter.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by distance
      if (shelter.distance > maxDistance) {
        return false;
      }
      
      // Filter by amenities and availability
      if (filters.hasAvailability && shelter.occupancy >= shelter.capacity) {
        return false;
      }
      if (filters.hasAccessibility && !shelter.hasAccessibility) {
        return false;
      }
      if (filters.hasPets && !shelter.hasPets) {
        return false;
      }
      if (filters.hasFood && !shelter.hasFood) {
        return false;
      }
      if (filters.hasMedical && !shelter.hasMedical) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => a.distance - b.distance);

  const getOccupancyStatusColor = (capacity: number, occupancy: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage < 50) return 'bg-success text-white';
    if (percentage < 80) return 'bg-alert text-white';
    return 'bg-emergency text-white';
  };

  const getShelterTypeColor = (type: string) => {
    switch (type) {
      case 'evacuation':
        return 'bg-blue-100 text-info-dark';
      case 'long-term':
        return 'bg-green-100 text-success-dark';
      case 'medical':
        return 'bg-red-100 text-emergency-dark';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <HomeIcon className="mr-2 h-6 w-6 text-primary" />
              Shelter Locator
            </h1>
            <p className="text-muted-foreground">
              Find emergency shelters and safe locations near you
            </p>
          </div>
          
          <div className="relative w-full md:w-auto mt-4 md:mt-0 flex gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search shelters..."
                className="pl-8 w-full md:w-[260px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              <MapPin className="mr-2 h-4 w-4" /> Use My Location
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Filter Shelters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Maximum Distance</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    defaultValue={[maxDistance]}
                    max={100}
                    step={5}
                    onValueChange={(value) => setMaxDistance(value[0])}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-10 text-right">
                    {maxDistance} mi
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="mb-3 font-medium">Shelter Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasAvailability"
                      checked={filters.hasAvailability}
                      onCheckedChange={() => handleFilterChange('hasAvailability')}
                    />
                    <Label htmlFor="hasAvailability">Has Availability</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasAccessibility"
                      checked={filters.hasAccessibility}
                      onCheckedChange={() => handleFilterChange('hasAccessibility')}
                    />
                    <Label htmlFor="hasAccessibility">Accessibility Features</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasPets"
                      checked={filters.hasPets}
                      onCheckedChange={() => handleFilterChange('hasPets')}
                    />
                    <Label htmlFor="hasPets">Accepts Pets</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasFood"
                      checked={filters.hasFood}
                      onCheckedChange={() => handleFilterChange('hasFood')}
                    />
                    <Label htmlFor="hasFood">Food Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasMedical"
                      checked={filters.hasMedical}
                      onCheckedChange={() => handleFilterChange('hasMedical')}
                    />
                    <Label htmlFor="hasMedical">Medical Services</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shelter listings */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="list">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="map">Map View</TabsTrigger>
                </TabsList>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredShelters.length} shelters
                </div>
              </div>

              <TabsContent value="list" className="space-y-4">
                {filteredShelters.length > 0 ? (
                  filteredShelters.map((shelter) => (
                    <Card key={shelter.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{shelter.name}</CardTitle>
                            <div className="text-sm text-muted-foreground flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {shelter.address}, {shelter.city}, {shelter.state} {shelter.zipCode}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge className={getShelterTypeColor(shelter.type)}>
                              {shelter.type.charAt(0).toUpperCase() + shelter.type.slice(1)} Shelter
                            </Badge>
                            <div className="text-sm flex items-center">
                              <Badge variant="outline" className="mr-2">
                                <Car className="h-3 w-3 mr-1" /> {shelter.distance} mi
                              </Badge>
                              <Badge className={getOccupancyStatusColor(shelter.capacity, shelter.occupancy)}>
                                {shelter.capacity - shelter.occupancy} spots left
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
                          {shelter.hasFood && (
                            <Badge variant="outline" className="justify-center">Food</Badge>
                          )}
                          {shelter.hasWater && (
                            <Badge variant="outline" className="justify-center">Water</Badge>
                          )}
                          {shelter.hasMedical && (
                            <Badge variant="outline" className="justify-center">Medical</Badge>
                          )}
                          {shelter.hasInternet && (
                            <Badge variant="outline" className="justify-center">Internet</Badge>
                          )}
                          {shelter.hasShower && (
                            <Badge variant="outline" className="justify-center">Showers</Badge>
                          )}
                          {shelter.hasPets && (
                            <Badge variant="outline" className="justify-center">Pets Allowed</Badge>
                          )}
                          {shelter.hasAccessibility && (
                            <Badge variant="outline" className="justify-center">Accessible</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>
                              {shelter.occupancy}/{shelter.capacity} Occupancy
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{shelter.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{shelter.openingHours}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <Button variant="outline">
                          <Phone className="mr-2 h-4 w-4" /> Contact
                        </Button>
                        <Button>
                          <MapPin className="mr-2 h-4 w-4" /> Get Directions
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No shelters found</h3>
                    <p className="text-muted-foreground">Try adjusting your search criteria</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="map" className="h-[600px] bg-muted rounded-md">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Map View Coming Soon</h3>
                    <p className="text-muted-foreground">This feature will be available in the next update.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shelters;
