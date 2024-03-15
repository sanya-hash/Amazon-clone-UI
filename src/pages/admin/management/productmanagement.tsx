
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { base_url } from "../../../static/staticData";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
const Productmanagement = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
const [product, setProduct] = useState<any>({ images: [] });

  

  useEffect(() => {
    // Fetch product details from backend API based on product ID
    axios.get(`${base_url}/product/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
        const { id, price, quantity } = product;
        const updatedProduct = { id, price, quantity };
        const response = await axios.put(`${base_url}/product/update`, updatedProduct);
        // console.log('Product updated:', response.data);
        toast.success("Product updated");
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

async function handleDelete(): Promise<void> {
  try {
    const { id } = product;
    const response = await axios.delete(`${base_url}/product/${id}`);
    toast.success("Product deleted");
    navigate("/admin/products");

  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID - {product.id}</strong>
        <img src={product.images?.[0]?.url} alt="Product" />{/* Assuming images is an array */}
          <p>{product.title}</p>
          {product.quantity > 0 ? (
            <span className="green">{product.quantity} Available</span>
          ) : (
            <span className="red"> Not Available</span>
          )}
          <h3>${product.price}</h3>
        </section>
        <article>
          <button onClick={handleDelete} className="product-delete-btn">
            <FaTrash />
          </button>
          <form onSubmit={handleSubmit}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={product.title || ''}
                // onChange={handleInputChange}
                readOnly
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                name="quantity"
                placeholder="Stock"
                value={product.quantity || ''}
                onChange={handleInputChange}
              />
            </div>

          
            
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Productmanagement;
