import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import { BookProvider } from "./context/bookcontext";
import { CartProvider } from "./context/cartcontext";
import { LoginProvider } from "./context/logincontext";
import { ModeProvider } from "./context/modecontext";
import Cart from "./pages/cart";
import Hero from "./pages/hero";
import Login from "./pages/login";
import Register from "./pages/register";
import UserProfile from "./pages/userProfile";

function App() {
  return (
    <LoginProvider>
      <BookProvider>
        <ModeProvider>
          <CartProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </CartProvider>
        </ModeProvider>
      </BookProvider>
    </LoginProvider>
  );
}

function AppRoutes() {
  const location = useLocation();
  const showElement = location.pathname !== "/login" && location.pathname !== "/register";
  return (
    <>
      {showElement && <Header />}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
      {showElement && <Footer />}
    </>
  );
}

export default App;
