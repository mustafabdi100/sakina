import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalendarIcon } from "lucide-react";

const OrderForm = () => {
  const [activeTab, setActiveTab] = useState("order");
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('entries') || '[]');
    setEntries(storedEntries);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Order form submitted');
  };

  const EntryTooltip = ({ entry }) => (
    <TooltipContent>
      <div className="p-2">
        <p><strong>Entry Number:</strong> {entry.entryNumber}</p>
        <p><strong>Type:</strong> {entry.type.toUpperCase()}</p>
        <p><strong>Quantity:</strong> {entry.quantity} L</p>
      </div>
    </TooltipContent>
  );


  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Loading Order Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="order">Order Details</TabsTrigger>
            <TabsTrigger value="planning">Compartment Planning</TabsTrigger>
            <TabsTrigger value="authorization">Authorization</TabsTrigger>
          </TabsList>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <TabsContent value="order">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Input id="customer" type="text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="localForeign">Local/Foreign</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="foreign">Foreign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seriesId">Series ID</Label>
                  <Input id="seriesId" type="text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? date.toDateString() : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" type="text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle</Label>
                  <Input id="vehicle" type="text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Driver</Label>
                  <Input id="driver" type="text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverId">Driver ID</Label>
                  <Input id="driverId" type="text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amountPaid">Amount Paid</Label>
                  <Input id="amountPaid" type="number" />
                </div>
                {/* AGO Fields */}
                <div className="space-y-2">
                  <Label htmlFor="ago">AGO (L)</Label>
                  <Input id="ago" type="number" />
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-700">Remaining Qty:</span>
                    <span className="text-sm font-bold text-blue-600 ml-1">68,231 L</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agoKraEntry">KRA Entry #</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select AGO entry" />
                      </SelectTrigger>
                      <SelectContent>
                        <TooltipProvider>
                          {entries.filter(entry => entry.type === 'ago').map(entry => (
                            <Tooltip key={entry.id}>
                              <TooltipTrigger asChild>
                                <SelectItem value={entry.entryNumber}>
                                  {entry.entryNumber}
                                </SelectItem>
                              </TooltipTrigger>
                              <EntryTooltip entry={entry} />
                            </Tooltip>
                          ))}
                        </TooltipProvider>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* PMS Fields */}
                <div className="space-y-2">
                  <Label htmlFor="pms">PMS (L)</Label>
                  <Input id="pms" type="number" />
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-700">Remaining Qty:</span>
                    <span className="text-sm font-bold text-blue-600 ml-1">25,847 L</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pmsKraEntry">KRA Entry #</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select PMS entry" />
                      </SelectTrigger>
                      <SelectContent>
                        <TooltipProvider>
                          {entries.filter(entry => entry.type === 'pms').map(entry => (
                            <Tooltip key={entry.id}>
                              <TooltipTrigger asChild>
                                <SelectItem value={entry.entryNumber}>
                                  {entry.entryNumber}
                                </SelectItem>
                              </TooltipTrigger>
                              <EntryTooltip entry={entry} />
                            </Tooltip>
                          ))}
                        </TooltipProvider>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* IK Fields */}
                <div className="space-y-2">
                  <Label htmlFor="ik">IK (L)</Label>
                  <Input id="ik" type="number" />
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-700">Remaining Qty:</span>
                    <span className="text-sm font-bold text-blue-600 ml-1">0 L</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ikKraEntry">KRA Entry #</Label>
                    <Input id="ikKraEntry" type="text" />
                  </div>
                </div>
              </div>

            </TabsContent>
            <TabsContent value="planning">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Prod. ID</TableHead>
                    <TableHead>Compartment</TableHead>
                    <TableHead>Volume(L)</TableHead>
                    <TableHead>Capacity(L)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3].map((row) => (
                    <TableRow key={row}>
                      <TableCell>{row}</TableCell>
                      <TableCell><Input type="text" className="w-full" /></TableCell>
                      <TableCell><Input type="text" className="w-full" /></TableCell>
                      <TableCell><Input type="text" className="w-full" /></TableCell>
                      <TableCell><Input type="number" className="w-full" /></TableCell>
                      <TableCell><Input type="number" className="w-full" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="authorization">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Authorization Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-green-700">Funds Confirmed</span>
                    </div>
                    <Input placeholder="Funds Remarks" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-green-700">Authorized to load</span>
                    </div>
                    <Input placeholder="Auth. Remarks" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finalRemarks">Final Remarks</Label>
                  <textarea
                    id="finalRemarks"
                    rows={5}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap justify-between gap-4 w-full">
          <div className="flex flex-wrap gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="secondary">New</Button>
            <Button type="button" variant="destructive">Cancel Order</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" className="bg-green-500 hover:bg-green-600 text-white">APPROVE ORDER</Button>
            <Button type="button" variant="outline">View Rem Qty</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderForm;