import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Category from "./components/Category";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ProductsTable from "./components/ProductsTable";
import UsersTable from "./components/UsersTable";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <div className="font-poppins text-gray-800">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Category />
              <Products />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<PrivateRoute> <ProductsTable /> </PrivateRoute>} />
          <Route path="/usuarios" element={<PrivateRoute> <UsersTable /> </PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}
