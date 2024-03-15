import "./css/App.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"; // Import Suspense for lazy loading

// Import other components
import LoginPage from "./components/Login/LoginPage";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/Home/HomePage";
import Errorpage from "./components/Error/ErrorPage";
import Products from "./components/Product/Products";
import Blogs from "./components/Product/Blogs";
import Contact from "./pages/Contact";
import Compare from "./pages/Compare";
import Wishlist from "./pages/Wishlist";
import RegisterPage from "./components/Login/RegisterPage";
import LoginWithOtp from "./components/Login/LoginWithOtp";
import BlogPage from "./pages/SingleBlogPage";
import SingleProductPage from "./pages/SingleProductPage";
import Cart from "./components/cart/Cart";
import Checkout from "./components/cart/Checkout";
import ResetPassword from "./components/Login/ResetPassword";
import Cancel from "./pages/Cancel";
import Sucess from "./pages/Sucess";
import Orders from "./components/Product/Orders";
import SearchProd from "./pages/SearchProd";
import { PrivateRoutes } from "./components/Error/PrivateRoutes";

// Lazy-loaded components
const Productss = lazy(() => import("./pages/admin/productss"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const ProductManagement = lazy(() => import("./pages/admin/management/productmanagement"));
const TransactionManagement = lazy(() => import("./pages/admin/management/transactionmanagement"));

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchProd />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoutes>
                <Checkout />
              </PrivateRoutes>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoutes>
                <Orders />
              </PrivateRoutes>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otplogin" element={<LoginWithOtp />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/reset/:id" element={<ResetPassword />} />
        <Route path="/compare" element={<Compare />} />
        <Route
          path="/sucess"
          element={
            <PrivateRoutes>
              <Sucess />
            </PrivateRoutes>
          }
        />
        <Route
          path="/cancel"
          element={
            <PrivateRoutes>
              <Cancel />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<Errorpage />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </>
  );
};

// Nested Routes for Admin Section
const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/products" element={<Productss />} />
        <Route path="/customer" element={<Customers />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/products/:id" element={<ProductManagement />} />
        <Route path="/transaction/:id" element={<TransactionManagement />} />

        <Route path="*" element={<Errorpage />} />
      </Routes>
    </Suspense>
  );
};

export default App;


