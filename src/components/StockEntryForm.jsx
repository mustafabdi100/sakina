import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Ship, DollarSign, Droplet, Building, Package } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const StockEntryForm = () => {
  const [formData, setFormData] = useState({
    vesselName: '',
    quantityMT: '',
    quantityM3: '',
    supplier: '',
    product: '',
    cod: null,
    invoiceAmount: '',
    price: '',
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
    setFormData(prevData => ({
      ...prevData,
      cod: date
    }));
  };

  useEffect(() => {
    if (formData.invoiceAmount && formData.quantityM3) {
      const calculatedPrice = (parseFloat(formData.invoiceAmount) / parseFloat(formData.quantityM3) + 50).toFixed(2);
      setFormData(prevData => ({
        ...prevData,
        price: calculatedPrice
      }));
    }
  }, [formData.invoiceAmount, formData.quantityM3]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted', formData);
  };

  return (
    <div className="container mx-auto py-4 px-4 md:px-8 lg:px-16">
     <h2 className="text-2xl font-bold mb-4 text-center text-[#EF4923]">Stock Entry Form</h2>
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

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="quantityMT" className="flex items-center space-x-2 text-[#EF4923]">
                  <Droplet className="w-4 h-4" />
                  <span>Quantity in MT</span>
                </Label>
                <Input
                  id="quantityMT"
                  name="quantityMT"
                  value={formData.quantityMT}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="Enter quantity in MT"
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="quantityM3" className="flex items-center space-x-2 text-[#EF4923]">
                  <Droplet className="w-4 h-4" />
                  <span>Quantity in m³</span>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier" className="flex items-center space-x-2 text-[#EF4923]">
                <Building className="w-4 h-4" />
                <span>Supplier</span>
              </Label>
              <Select onValueChange={(value) => handleSelectChange('supplier', value)}>
                <SelectTrigger id="supplier" className="w-full">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GALANA ENERGIES LIMITED">GALANA ENERGIES LIMITED</SelectItem>
                  <SelectItem value="GULF ENERGY LIMITED">GULF ENERGY LIMITED</SelectItem>
                  <SelectItem value="ONE PETROLEUM LIMITED">ONE PETROLEUM LIMITED</SelectItem>
                  <SelectItem value="ASHARAMA SYNERGY LIMITED">ASHARAMA SYNERGY LIMITED</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="cod" className="flex items-center space-x-2 text-[#EF4923]">
                <CalendarIcon className="w-4 h-4" />
                <span>C.O.D (Date)</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.cod && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.cod ? format(formData.cod, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.cod}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoiceAmount" className="flex items-center space-x-2 text-[#EF4923]">
                <DollarSign className="w-4 h-4" />
                <span>Invoice Amount (USD)</span>
              </Label>
              <Input
                id="invoiceAmount"
                name="invoiceAmount"
                value={formData.invoiceAmount}
                onChange={handleInputChange}
                type="number"
                step="0.01"
                placeholder="Enter invoice amount"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center space-x-2 text-[#EF4923]">
                <DollarSign className="w-4 h-4" />
                <span>Price (USD)</span>
              </Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                type="number"
                step="0.01"
                placeholder="Calculated price"
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

export default StockEntryForm;
