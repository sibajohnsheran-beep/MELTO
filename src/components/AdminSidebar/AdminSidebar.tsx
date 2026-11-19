
import {
  ArrowLeft,
  ChevronRight,
  Gift,
  IceCreamCone,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";

import "./AdminSidebar.css";

export type AdminSection =
  | "overview"
  | "products"
  | "flavours"
  | "offers"
  | "orders"
  | "customers"
  | "enquiries"
  | "settings";

export const adminMenu = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    group: "MAIN MENU",
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    group: "MANAGEMENT",
  },
  {
    id: "flavours",
    label: "Flavours",
    icon: IceCreamCone,
    group: "MANAGEMENT",
  },
  {
    id: "offers",
    label: "Special Offers",
    icon: Gift,
    group: "MANAGEMENT",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingBag,
    group: "OPERATIONS",
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    group: "OPERATIONS",
  },
  {
    id: "enquiries",
    label: "Enquiries",
    icon: MessageSquare,
    group: "OPERATIONS",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    group: "SYSTEM",
  },
] as const;

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSelect: (section: AdminSection) => void;
  onBackToShop: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

function AdminSidebar({
  activeSection,
  onSelect,
  onBackToShop,
  isMobileOpen,
  onMobileClose,
}: AdminSidebarProps) {
  const groups = [
    "MAIN MENU",
    "MANAGEMENT",
    "OPERATIONS",
    "SYSTEM",
  ];

  const handleSelect = (section: AdminSection) => {
    onSelect(section);
    onMobileClose();
  };

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          className="melto-admin-sidebar-overlay"
          onClick={onMobileClose}
          aria-label="Close admin menu"
        />
      )}

      <aside
        className={`melto-admin-sidebar ${
          isMobileOpen ? "mobile-open" : ""
        }`}
      >
        {/* BRAND */}

        <div className="melto-admin-sidebar-brand">
          <div className="melto-admin-sidebar-logo">
            <img
              src="/images/melto-logo.png"
              alt="MELTO"
            />
          </div>

          <div className="melto-admin-sidebar-brand-text">
            <strong>MELTO</strong>
            <span>Admin Workspace</span>
          </div>

          <button
            type="button"
            className="melto-admin-sidebar-close"
            onClick={onMobileClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION */}

        <nav
          className="melto-admin-sidebar-nav"
          aria-label="Admin navigation"
        >
          {groups.map((group) => (
            <div
              key={group}
              className="melto-admin-sidebar-group"
            >
              <p className="melto-admin-sidebar-group-title">
                {group}
              </p>

              {adminMenu
                .filter((item) => item.group === group)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    activeSection === item.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`melto-admin-sidebar-link ${
                        isActive ? "active" : ""
                      }`}
                      onClick={() =>
                        handleSelect(item.id)
                      }
                      aria-current={
                        isActive ? "page" : undefined
                      }
                    >
                      <Icon size={19} />

                      <span>{item.label}</span>

                      {isActive && (
                        <ChevronRight
                          size={16}
                          className="melto-admin-sidebar-chevron"
                        />
                      )}
                    </button>
                  );
                })}
            </div>
          ))}
        </nav>

        {/* FOOTER */}

        <div className="melto-admin-sidebar-footer">
          <div className="melto-admin-sidebar-demo">
            <SlidersHorizontal size={18} />

            <div>
              <strong>Frontend Preview</strong>
              <span>Demo data only</span>
            </div>
          </div>

          <button
            type="button"
            className="melto-admin-sidebar-exit"
            onClick={onBackToShop}
          >
            <ArrowLeft size={18} />
            Back to Customer Site
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
