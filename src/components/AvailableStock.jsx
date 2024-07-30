import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import sampleData from '../../sampleData.json';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const AvailableStock = () => {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (sampleData && sampleData.formEntries) {
      console.log('Form entries loaded:', sampleData.formEntries);
      setEntries(sampleData.formEntries);
    } else {
      console.error('Form entries not found in sampleData.json');
    }
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEntries = entries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(entries.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4 text-[#EF4923]">Available Stock</h2>
      {entries.length > 0 ? (
        <>
          <Table className="shadow-lg">
            <TableCaption>List of available stock entries as of {format(new Date(), 'PPP')}</TableCaption>
            <TableHeader>
              <TableRow className="bg-[#BFE6FB] hover:bg-[#BFE6FB]">
                <TableHead className="font-bold text-sm text-[#EF4923]">Vessel Name</TableHead>
                <TableHead className="font-bold text-sm text-[#EF4923]">Quantity (MT)</TableHead>
                <TableHead className="font-bold text-sm text-[#EF4923]">Quantity (m³)</TableHead>
                <TableHead className="font-bold text-sm text-[#EF4923]">Supplier</TableHead>
                <TableHead className="font-bold text-sm text-[#EF4923]">Product</TableHead>
                <TableHead className="font-bold text-sm text-[#EF4923]">C.O.D</TableHead>
                <TableHead className="font-bold text-sm text-[#EF4923]">Invoice Amount (USD)</TableHead>
                <TableHead className="font-bold text-sm text-[#EF4923]">Price (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEntries.map((entry, index) => (
                <TableRow key={index} className={`font-semibold hover:bg-[#BFE6FB] ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <TableCell>{entry.vesselName}</TableCell>
                  <TableCell>{entry.quantityMT}</TableCell>
                  <TableCell>{entry.quantityM3}</TableCell>
                  <TableCell>{entry.supplier}</TableCell>
                  <TableCell>{entry.product}</TableCell>
                  <TableCell>{format(new Date(entry.cod), 'PPP')}</TableCell>
                  <TableCell>${entry.invoiceAmount.toLocaleString()}</TableCell>
                  <TableCell>${entry.price.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-[#EF4923] text-white"
            >
              Previous
            </Button>
            <span className="text-[#EF4923]">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-[#EF4923] text-white"
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p className="text-[#EF4923] text-lg">No available stock entries found.</p>
      )}
    </div>
  );
};

export default AvailableStock;