
import {
  ArrowRight,
  CircleDollarSign,
  Clock3,
  IceCreamCone,
  Package,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import type { AdminSection } from "../AdminSidebar/AdminSidebar";

import "./AdminDashboard.css";

interface AdminDashboardProps {
  onNavigate: (section: AdminSection) => void;
}

const stats = [
  {
    label: "Total Orders",
    value: "128",
    icon: ShoppingBag,
    className: "pink",
  },
  {
    label: "Total Revenue",
    value: "LKR 86,450",
    icon: CircleDollarSign,
    className: "purple",
  },
  {
    label: "Active Products",
    value: "6",
    icon: IceCreamCone,
    className: "orange",
  },
  {
    label: "Customers",
    value: "94",
    icon: Users,
    className: "mint",
  },
];

const sampleOrders = [
  {
    id: "#MLT-1001",
    customer: "Demo Customer A",
    products: "Strawberry Bliss × 2",
    total: "LKR 980",
    method: "Delivery",
    status: "New",
  },
  {
    id: "#MLT-1002",
    customer: "Demo Customer B",
    products: "Choco Dream × 1",
    total: "LKR 550",
    method: "Pickup",
    status: "Preparing",
  },
  {
    id: "#MLT-1003",
    customer: "Demo Customer C",
    products: "Mango Sunshine × 2",
    total: "LKR 1,040",
    method: "Delivery",
    status: "Completed",
  },
  {
    id: "#MLT-1004",
    customer: "Demo Customer D",
    products: "Vanilla Cloud × 1",
    total: "LKR 450",
    method: "Pickup",
    status: "New",
  },
];

function AdminDashboard({
  onNavigate,
}: AdminDashboardProps) {
  return (
    <div className="melto-admin-dashboard">

      {/* WELCOME BANNER */}

      <div className="melto-admin-welcome">
        <div>
          <span className="melto-admin-welcome-label">
            <Sparkles size={16} />
            MELTO ADMIN WORKSPACE
          </span>

          <h1>Welcome to MELTO!</h1>

          <p>
            Here's an overview of your ice cream
            shop dashboard.
          </p>

          <span className="melto-admin-demo-label">
            Preview only • Sample data
          </span>
        </div>

        <div
          className="melto-admin-welcome-visual"
          aria-hidden="true"
        >
          <img
            src="/images/melto-mascot.png"
            alt=""
          />
        </div>
      </div>

      {/* STATS SECTION */}

      <div className="melto-admin-section-heading">
        <div>
          <h2>Store Overview</h2>
          <p>Example statistics for the dashboard design</p>
        </div>

        <span className="melto-admin-data-tag">
          DEMO DATA
        </span>
      </div>

      <div className="melto-admin-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              className="melto-admin-stat-card"
              key={stat.label}
            >
              <div className="melto-admin-stat-top">
                <div
                  className={`melto-admin-stat-icon ${stat.className}`}
                >
                  <Icon size={23} />
                </div>

                <TrendingUp
                  className="melto-admin-stat-decoration"
                  size={18}
                />
              </div>

              <span className="melto-admin-stat-title">
                {stat.label}
              </span>

              <strong className="melto-admin-stat-value">
                {stat.value}
              </strong>

              <small>Illustrative value</small>
            </div>
          );
        })}
      </div>

      {/* RECENT ORDERS */}

      <div className="melto-admin-orders-card">
        <div className="melto-admin-orders-header">
          <div>
            <h2>
              <ShoppingBag size={21} />
              Recent Orders
            </h2>

            <p>
              Sample orders for layout demonstration
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("orders")}
          >
            View Orders
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="melto-admin-table-wrap">
          <table className="melto-admin-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Total</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {sampleOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong className="melto-admin-order-id">
                      {order.id}
                    </strong>
                  </td>

                  <td>{order.customer}</td>
                  <td>{order.products}</td>

                  <td>
                    <strong>{order.total}</strong>
                  </td>

                  <td>{order.method}</td>

                  <td>
                    <span
                      className={`melto-admin-order-status status-${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK ACCESS */}

      <div className="melto-admin-section-heading">
        <div>
          <h2>Quick Access</h2>
          <p>Navigate to the next management modules</p>
        </div>
      </div>

      <div className="melto-admin-quick-grid">
        <button
          type="button"
          className="melto-admin-quick-card"
          onClick={() => onNavigate("products")}
        >
          <span className="melto-admin-quick-icon">
            <Package size={24} />
          </span>

          <strong>Product Management</strong>

          <small>
            Manage ice cream products and pricing
          </small>

          <ArrowRight size={19} />
        </button>

        <button
          type="button"
          className="melto-admin-quick-card"
          onClick={() => onNavigate("orders")}
        >
          <span className="melto-admin-quick-icon">
            <Clock3 size={24} />
          </span>

          <strong>Order Management</strong>

          <small>
            Handle delivery and pickup orders
          </small>

          <ArrowRight size={19} />
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
