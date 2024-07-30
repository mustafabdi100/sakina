import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Ship, Droplet, Package } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const EntryForm = () => {
  const [formData, setFormData] = useState({
    vesselName: '',
    quantityM3: '',
    product: '',
    entryDate: new Date(),
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    const newExpiryDate = new Date(date);
    newExpiryDate.setDate(newExpiryDate.getDate() + 30);
    setFormData(prevData => ({
      ...prevData,
      entryDate: date,
      expiryDate: newExpiryDate
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted', formData);
  };

  return (
    <div className="container mx-auto py-4 px-4 md:px-8 lg:px-16 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#EF4923]">Entry Form</h2>
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardContent className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vesselName" className="flex items-center space-x-2 text-[#EF4923]">
                <Ship className="w-4 h-4" />
                <span>Vessel Name</span>
              </Label>
              <Input
                id="vesselName"
                name="vesselName"
                value={formData.vesselName}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter vessel name"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantityM3" className="flex items-center space-x-2 text-[#EF4923]">
                <Droplet className="w-4 h-4" />
                <span>Quantity (m³)</span>
              </Label>
              <Input
                id="quantityM3"
                name="quantityM3"
                value={formData.quantityM3}
                onChange={handleInputChange}
                type="number"
                placeholder="Enter quantity in m³"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product" className="flex items-center space-x-2 text-[#EF4923]">
                <Package className="w-4 h-4" />
                <span>Product</span>
              </Label>
              <Select onValueChange={(value) => handleSelectChange('product', value)}>
                <SelectTrigger id="product" className="w-full">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AGO">AGO</SelectItem>
                  <SelectItem value="PMS">PMS</SelectItem>
                  <SelectItem value="IK">IK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="entryDate" className="flex items-center space-x-2 text-[#EF4923]">
                <CalendarIcon className="w-4 h-4" />
                <span>Entry Date</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.entryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.entryDate ? format(formData.entryDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.entryDate}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="flex items-center space-x-2 text-[#EF4923]">
                <CalendarIcon className="w-4 h-4" />
                <span>Expiry Date</span>
              </Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate ? format(formData.expiryDate, "PPP") : ""}
                readOnly
                className="w-full"
              />
            </div>

            <Separator />

            <Button 
              type="submit" 
              onClick={handleSubmit} 
              className="w-full bg-[#EF4923] text-white hover:bg-[#EF4923]/90"
            >
              Submit 
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntryForm;
