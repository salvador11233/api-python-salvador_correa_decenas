import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Category from "./components/Category";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Login from "./components/Login";

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
        </Routes>
      </div>
    </Router>
  );
}
