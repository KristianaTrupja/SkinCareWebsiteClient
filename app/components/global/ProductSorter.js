"use client";
import { useState } from "react";


const ProductSorter = ({ products, onSort }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (order) => {
    setSortOrder(order);

    // Sorting based on 'sp' price if available, otherwise using 'mrp'
    const sortedProducts = [...products].sort((a, b) => {
      const priceA = a.sp ?? a.mrp;
      const priceB = b.sp ?? b.mrp;
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });

    // Pass sorted data back to parent component
    onSort(sortedProducts);
  };

  return (
    <div className="p-4">
      <label className="mr-2 font-semibold">Rendit sipas cmimit:</label>
      <select
        className="border p-2 rounded"
        value={sortOrder}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="asc">Cmimi me i ulet</option>
        <option value="desc">Cmimi me i larte</option>
      </select>
    </div>
  );
};

export default ProductSorter;
