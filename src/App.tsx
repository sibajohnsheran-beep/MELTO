
import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./App.css";

/* ==========================================
   CUSTOMER COMPONENTS
========================================== */

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import SignaturePicks from "./components/SignaturePicks/SignaturePicks";
import HomepagePromos from "./components/HomepagePromos/HomepagePromos";
import FlavoursPage from "./components/FlavoursPage/FlavoursPage";
import IceCreamCustomizer from "./components/IceCreamCustomizer/IceCreamCustomizer";
import SpecialOffers from "./components/SpecialOffers/SpecialOffers";
import OurStory from "./components/OurStory/OurStory";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

/* ==========================================
   CART AND ADMIN LOGIN
========================================== */

import CartDrawer from "./components/CartDrawer/CartDrawer";
import AdminLogin from "./components/AdminLogin/AdminLogin";

/* ==========================================
   ADMIN DASHBOARD
========================================== */

import AdminLayout from "./components/AdminLayout/AdminLayout";

/* ==========================================
   CHECKOUT
========================================== */

import Checkout, {
  type DemoOrder,
} from "./components/Checkout/Checkout";

import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";

/* ==========================================
   PRODUCT TYPES
========================================== */

import type {
  CartItem,
  Product,
} from "./data/products";

type AppScreen =
  | "shop"
  | "checkout"
  | "confirmation";

/* ==========================================
   HANDLE PAGE AND SECTION SCROLLING
========================================== */

function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    let animationFrame = 0;

    if (location.hash) {
      const targetId = decodeURIComponent(
        location.hash.substring(1)
      );

      let attempts = 0;

      const scrollToSection = () => {
        const element =
          document.getElementById(targetId);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          return;
        }

        if (attempts < 12) {
          attempts += 1;

          animationFrame =
            requestAnimationFrame(
              scrollToSection
            );
        }
      };

      animationFrame =
        requestAnimationFrame(
          scrollToSection
        );
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [location.pathname, location.hash]);

  return null;
}

/* ==========================================
   MAIN MELTO APPLICATION
========================================== */

function MeltoAppContent() {
  const navigate = useNavigate();

  /* ========================================
     SCREEN STATE
  ======================================== */

  const [screen, setScreen] =
    useState<AppScreen>("shop");

  /* ========================================
     ADMIN DEMO STATE

     WORKS ON LOCALHOST AND VERCEL
  ======================================== */

  const [adminOpen, setAdminOpen] =
    useState(false);

  const [
    demoAdminLoggedIn,
    setDemoAdminLoggedIn,
  ] = useState(false);

  /* ========================================
     CART STATE
  ======================================== */

  const [cartOpen, setCartOpen] =
    useState(false);

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  /* ========================================
     ORDER STATE
  ======================================== */

  const [demoOrder, setDemoOrder] =
    useState<DemoOrder | null>(null);

  /* ========================================
     ADD PRODUCT TO CART
  ======================================== */

  const handleAddToCart = (product: Product) => {
    setCartItems((previous) => {
      const existing = previous.find(
        (item) =>
          item.product.id === product.id
      );

      if (existing) {
        return previous.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          product,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  /* ========================================
     CHANGE PRODUCT QUANTITY
  ======================================== */

  const handleQuantityChange = (
    productId: string,
    change: number
  ) => {
    setCartItems((previous) =>
      previous.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity + change
              ),
            }
          : item
      )
    );
  };

  /* ========================================
     REMOVE PRODUCT FROM CART
  ======================================== */

  const handleRemoveProduct = (
    productId: string
  ) => {
    setCartItems((previous) =>
      previous.filter(
        (item) =>
          item.product.id !== productId
      )
    );
  };

  /* ========================================
     CART COUNT
  ======================================== */

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  /* ========================================
     OPEN CHECKOUT
     WORKS FROM HOME AND FLAVOURS
  ======================================== */

  const handleOpenCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    setCartOpen(false);
    setScreen("checkout");

    navigate("/");

    window.scrollTo(0, 0);
  };

  /* ========================================
     BACK TO CUSTOMER HOMEPAGE
  ======================================== */

  const handleBackToShop = () => {
    setScreen("shop");
    setCartOpen(false);

    navigate("/");

    window.scrollTo(0, 0);
  };

  /* ========================================
     CONFIRM DEMO ORDER
  ======================================== */

  const handleDemoConfirm = (
    order: DemoOrder
  ) => {
    setDemoOrder(order);
    setScreen("confirmation");

    navigate("/");

    window.scrollTo(0, 0);
  };

  /* ========================================
     CONTINUE SHOPPING
  ======================================== */

  const handleContinueShopping = () => {
    setCartItems([]);
    setDemoOrder(null);
    setCartOpen(false);
    setScreen("shop");

    navigate("/");

    window.scrollTo(0, 0);
  };

  /* ========================================
     ADMIN LOGIN SUCCESS

     NO DEVELOPMENT-ONLY RESTRICTION
  ======================================== */

  const handleAdminLoginSuccess = () => {
    setDemoAdminLoggedIn(true);

    setAdminOpen(false);
    setCartOpen(false);
    setScreen("shop");

    navigate("/admin");

    window.scrollTo(0, 0);
  };

  /* ========================================
     ADMIN LOGOUT
  ======================================== */

  const handleAdminLogout = () => {
    setDemoAdminLoggedIn(false);

    setAdminOpen(false);
    setCartOpen(false);
    setScreen("shop");

    navigate("/", {
      replace: true,
    });

    window.scrollTo(0, 0);
  };

  /* ========================================
     SHARED NAVBAR

     SAME NAVBAR FOR:
     - HOMEPAGE
     - FLAVOURS PAGE
  ======================================== */

  const customerNavbar = (
    <Navbar
      onAdminOpen={() =>
        setAdminOpen(true)
      }
      onCartOpen={() =>
        setCartOpen(true)
      }
      cartCount={cartCount}
    />
  );

  /* ========================================
     SHARED CUSTOMER OVERLAYS

     ONE CART AND ONE ADMIN LOGIN
  ======================================== */

  const customerOverlays = (
    <>
      <AdminLogin
        isOpen={adminOpen}
        onClose={() =>
          setAdminOpen(false)
        }
        onLoginSuccess={
          handleAdminLoginSuccess
        }
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
        items={cartItems}
        onQuantityChange={
          handleQuantityChange
        }
        onRemove={
          handleRemoveProduct
        }
        onCheckout={
          handleOpenCheckout
        }
      />
    </>
  );

  /* ========================================
     APPLICATION ROUTES
  ======================================== */

  return (
    <>
      <ScrollHandler />

      <Routes>

        {/* =================================
            CUSTOMER HOMEPAGE
        ================================= */}

        <Route
          path="/"
          element={
            <div className="melto-app">

              {screen === "shop" && (
                <>
                  {/* NAVBAR */}

                  {customerNavbar}

                  {/* HERO */}

                  <Hero />

                  {/* SIX SIGNATURE PRODUCTS */}

                  <SignaturePicks
                    onAddToCart={
                      handleAddToCart
                    }
                  />

                  {/* HOMEPAGE PROMOTIONS */}

                  <HomepagePromos />

                  {/* 3D ICE CREAM CUSTOMIZER */}

                  <div
                    id="melto-customizer-section"
                  >
                    <IceCreamCustomizer
                      onAddToCart={
                        handleAddToCart
                      }
                    />
                  </div>

                  {/* SPECIAL OFFERS */}

                  <div
                    id="melto-offers-products"
                  >
                    <SpecialOffers
                      onAddToCart={
                        handleAddToCart
                      }
                    />
                  </div>

                  {/* OUR STORY */}

                  <OurStory />

                  {/* CONTACT */}

                  <Contact />

                  {/* FOOTER */}

                  <Footer />

                  {/* CART AND ADMIN LOGIN */}

                  {customerOverlays}
                </>
              )}

              {/* ===========================
                  CHECKOUT
              =========================== */}

              {screen === "checkout" && (
                <Checkout
                  items={cartItems}
                  onBack={
                    handleBackToShop
                  }
                  onConfirm={
                    handleDemoConfirm
                  }
                />
              )}

              {/* ===========================
                  ORDER CONFIRMATION
              =========================== */}

              {screen === "confirmation" &&
                demoOrder !== null && (
                  <OrderConfirmation
                    order={demoOrder}
                    onContinueShopping={
                      handleContinueShopping
                    }
                  />
                )}

            </div>
          }
        />

        {/* =================================
            FLAVOURS COLLECTION PAGE
        ================================= */}

        <Route
          path="/flavours"
          element={
            <div className="melto-app">

              {/* SAME NAVBAR */}

              {customerNavbar}

              {/* ALL SIX PRODUCTS */}

              <FlavoursPage
                onAddToCart={
                  handleAddToCart
                }
              />

              {/* SAME FOOTER */}

              <Footer />

              {/* SAME CART AND ADMIN LOGIN */}

              {customerOverlays}

            </div>
          }
        />

        {/* =================================
            ADMIN DASHBOARD

            DEMO ACCESS ENABLED IN
            BOTH DEVELOPMENT AND PRODUCTION
        ================================= */}

        <Route
          path="/admin"
          element={
            demoAdminLoggedIn ? (
              <AdminLayout
                onBackToShop={
                  handleAdminLogout
                }
              />
            ) : (
              <Navigate
                to="/"
                replace
              />
            )
          }
        />

        {/* =================================
            UNKNOWN ROUTES
        ================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </>
  );
}

/* ==========================================
   ROOT APP
========================================== */

function App() {
  return (
    <BrowserRouter>
      <MeltoAppContent />
    </BrowserRouter>
  );
}

export default App;
