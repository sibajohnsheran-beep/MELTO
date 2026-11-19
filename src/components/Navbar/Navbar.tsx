
import { useState } from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  Search,
  ShoppingCart,
  ShieldUser,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import "./Navbar.css";

/* ==========================================
   NAVBAR PROPS
========================================== */

interface NavbarProps {
  onAdminOpen: () => void;
  onCartOpen: () => void;
  cartCount?: number;
}

/* ==========================================
   MELTO NAVIGATION LINKS
========================================== */

const navLinks = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Flavours",
    to: "/flavours",
  },
  {
    name: "Build Your Scoop",
    to: "/#melto-customizer-section",
  },
  {
    name: "Offers",
    to: "/#melto-offers-products",
  },
  {
    name: "Our Story",
    to: "/#story",
  },
  {
    name: "Contact",
    to: "/#contact",
  },
];

/* ==========================================
   MELTO NAVBAR
========================================== */

function Navbar({
  onAdminOpen,
  onCartOpen,
  cartCount = 0,
}: NavbarProps) {
  const location = useLocation();

  /* MOBILE MENU STATE */

  const [mobileOpen, setMobileOpen] =
    useState(false);

  /* SEARCH PANEL STATE */

  const [searchOpen, setSearchOpen] =
    useState(false);

  /* ========================================
     ACTIVE NAVIGATION LINK
  ======================================== */

  const isLinkActive = (to: string) => {
    if (to === "/") {
      return (
        location.pathname === "/" &&
        location.hash === ""
      );
    }

    if (to === "/flavours") {
      return location.pathname === "/flavours";
    }

    return (
      `${location.pathname}${location.hash}` === to
    );
  };

  /* ========================================
     HANDLE LINK CLICK
  ======================================== */

  const handleNavigation = (to: string) => {
    setMobileOpen(false);
    setSearchOpen(false);

    /* Home clicked while already on Home */

    if (
      to === "/" &&
      location.pathname === "/"
    ) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    /* Scroll again if same section is clicked */

    if (
      location.pathname === "/" &&
      to.startsWith("/#") &&
      to ===
        `${location.pathname}${location.hash}`
    ) {
      const sectionId = to.substring(2);

      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }
  };

  /* ========================================
     RENDER NAVBAR
  ======================================== */

  return (
    <header className="melto-header">

      <nav className="melto-navbar">

        {/* =================================
            MELTO LOGO
        ================================= */}

        <Link
          to="/"
          className="melto-brand"
          aria-label="MELTO Home"
          onClick={() =>
            handleNavigation("/")
          }
        >
          <img
            src="/images/melto-logo.png"
            alt="MELTO - Scoop the Joy"
            className="melto-logo"
          />
        </Link>

        {/* =================================
            DESKTOP NAVIGATION
        ================================= */}

        <div className="melto-nav-links">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={
                isLinkActive(link.to)
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleNavigation(link.to)
              }
            >
              {link.name}
            </Link>
          ))}

        </div>

        {/* =================================
            NAVBAR ACTIONS
        ================================= */}

        <div className="melto-nav-actions">

          {/* SEARCH ICON */}

          <button
            type="button"
            className="melto-icon-button"
            aria-label="Search products"
            aria-expanded={searchOpen}
            onClick={() =>
              setSearchOpen(
                (previous) => !previous
              )
            }
          >
            <Search size={20} />
          </button>

          {/* SHOPPING CART ICON */}

          <button
            type="button"
            className="melto-icon-button cart-button"
            aria-label="Shopping cart"
            onClick={onCartOpen}
          >
            <ShoppingCart size={20} />

            <span className="cart-count">
              {cartCount}
            </span>
          </button>

          {/* STAFF / ADMIN LOGIN ICON */}

          <button
            type="button"
            className="melto-icon-button admin-button"
            aria-label="Admin login"
            title="Staff Login"
            onClick={onAdminOpen}
          >
            <ShieldUser size={21} />
          </button>

          {/* =================================
              ORDER NOW BUTTON

              OPENS FLAVOURS PAGE
          ================================= */}

          <Link
            to="/flavours"
            className="melto-order-button"
            onClick={() =>
              handleNavigation("/flavours")
            }
          >
            Order Now
            <ArrowRight size={16} />
          </Link>

          {/* =================================
              MOBILE MENU TOGGLE
          ================================= */}

          <button
            type="button"
            className="melto-mobile-toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() =>
              setMobileOpen(
                (previous) => !previous
              )
            }
          >
            {mobileOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

        </div>

      </nav>

      {/* ====================================
          MOBILE NAVIGATION
      ==================================== */}

      {mobileOpen && (
        <div className="melto-mobile-menu">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={
                isLinkActive(link.to)
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleNavigation(link.to)
              }
            >
              {link.name}
            </Link>
          ))}

        </div>
      )}

      {/* ====================================
          SEARCH PANEL

          EXISTING SEARCH UI PRESERVED
      ==================================== */}

      {searchOpen && (
        <div className="melto-search-panel">

          <Search size={18} />

          <input
            type="search"
            placeholder="Search your favourite ice cream..."
            aria-label="Search ice creams"
            autoFocus
          />

          <button
            type="button"
            aria-label="Close search"
            onClick={() =>
              setSearchOpen(false)
            }
          >
            <X size={18} />
          </button>

        </div>
      )}

    </header>
  );
}

export default Navbar;
