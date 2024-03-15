import React, { useState, useEffect, CSSProperties } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { base_url } from "../../static/staticData";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import axios from "axios";
import { SyncLoader } from "react-spinners";
interface ProductData {
  photo: React.ReactElement;
  name: string;
  price: number;
  stock: number;
  id: string;
  action: React.ReactElement;

}
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const MainSpinner: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  width: 380,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%, -50%)",
};
const columns: Column<ProductData>[] = [
  {
    Header: <b>Photo</b>,
    accessor: "photo",
  },
  {
    Header: <b>Name</b>,
    accessor: "name",
  },
  {
    Header: <b>Price</b>,
    accessor: "price",
        Cell: ({ value }) => `$${value}` // Add a dollar sign before the amount

  },
  {
    Header: <b>Stock</b>,
    accessor: "stock",
  },
  {
    Header: <b>Action</b>,
    accessor: "action",
  },
  
];

const Products = () => {
  const [rows, setRows] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // Fetch products from backend API
    axios
      .get(`${base_url}/product/getproducts`)
      .then((response) => {
        const productsData: ProductData[] = response.data.map(
          (product: any) => ({
            photo: <img src={product.images[0].url} alt={product.title} />,
            name: product.title,
            price: product.price,
            stock: product.quantity,
            id: product.id,
             
            action: <Link to={`/admin/products/${product.id}`}>Manage</Link>,
          })
        );
        setRows(productsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Products:", error);
        setLoading(false);
      });
  }, []);

  const Table = TableHOC<ProductData>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {loading ? (
          <SyncLoader
            color="#361AE3"
            loading={loading}
            cssOverride={MainSpinner}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          Table
        )}
      </main>
    </div>
  );
};

export default Products;
