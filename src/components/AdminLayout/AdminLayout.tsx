
import { useState } from "react";

import {
  ArrowLeft,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import AdminSidebar, {
  adminMenu,
  type AdminSection,
} from "../AdminSidebar/AdminSidebar";

import AdminDashboard from "../AdminDashboard/AdminDashboard";

import "./AdminLayout.css";

interface AdminLayoutProps {
  onBackToShop: () => void;
}

const sectionDescriptions: Record<AdminSection, string> = {
  overview: "Your ice cream shop at a glance.",
  products: "Manage products, descriptions and prices.",
  flavours: "Manage ice cream flavours and customizer options.",
  offers: "Create and manage special offers.",
  orders: "Manage delivery and pickup orders.",
  customers: "View customer information and activity.",
  enquiries: "Review messages submitted by customers.",
  settings: "Configure the MELTO store and staff settings.",
};

function AdminLayout({
  onBackToShop,
}: AdminLayoutProps) {
  const [activeSection, setActiveSection] =
    useState<AdminSection>("overview");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const selectedMenuItem = adminMenu.find(
    (item) => item.id === activeSection
  );

  const currentTitle =
    selectedMenuItem?.label ?? "Overview";

  const handleSelectSection = (
    section: AdminSection
  ) => {
    setActiveSection(section);
    window.scrollTo(0, 0);
  };

  return (
    <div className="melto-admin-app">

      {/* SIDEBAR */}

      <AdminSidebar
        activeSection={activeSection}
        onSelect={handleSelectSection}
        onBackToShop={onBackToShop}
        isMobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* MAIN AREA */}

      <div className="melto-admin-main">

        {/* TOP BAR */}

        <header className="melto-admin-topbar">

          <div className="melto-admin-topbar-left">

            <button
              type="button"
              className="melto-admin-menu-button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open admin navigation"
            >
              <Menu size={23} />
            </button>

            <div className="melto-admin-topbar-heading">
              <span>
                MELTO Admin / {currentTitle}
              </span>

              <h2>{currentTitle}</h2>
            </div>

          </div>

          <div className="melto-admin-topbar-right">

            <span className="melto-admin-preview-badge">
              <ShieldCheck size={16} />
              Preview Mode
            </span>

            <div className="melto-admin-avatar">
              AD
            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <div className="melto-admin-content">

          {activeSection === "overview" ? (

            <AdminDashboard
              onNavigate={handleSelectSection}
            />

          ) : (

            <section className="melto-admin-placeholder">

              <div className="melto-admin-placeholder-icon">
                <Wrench size={34} />
              </div>

              <span className="melto-admin-placeholder-label">
                NEXT DEVELOPMENT MODULE
              </span>

              <h1>
                {currentTitle}
              </h1>

              <p>
                {sectionDescriptions[activeSection]}
              </p>

              <div className="melto-admin-placeholder-message">
                <LayoutDashboard size={19} />

                <span>
                  This module's page is not implemented
                  yet. We will build and connect it
                  during the next development steps.
                </span>
              </div>

              <button
                type="button"
                className="melto-admin-placeholder-back"
                onClick={() =>
                  handleSelectSection("overview")
                }
              >
                <ArrowLeft size={18} />
                Back to Overview
              </button>

            </section>

          )}

        </div>

      </div>
    </div>
  );
}

export default AdminLayout;
