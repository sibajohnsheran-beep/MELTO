
import { useState, type FormEvent } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Bike,
  Check,
  CreditCard,
  Banknote,
  IceCreamCone,
  MapPin,
  ShoppingBag,
  Sparkles,
  Store,
  ShieldCheck,
  Info,
} from "lucide-react";

import type { CartItem } from "../../data/products";

import "./Checkout.css";

/* ========================================
   CHECKOUT TYPES
======================================== */

export type FulfilmentMethod = "delivery" | "pickup";

export type PaymentMethod = "cash" | "card";

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

export interface DemoOrder {
  items: CartItem[];
  customer: CustomerDetails;
  method: FulfilmentMethod;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onConfirm: (order: DemoOrder) => void;
}

const DELIVERY_FEE = 250;

const initialDetails: CustomerDetails = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  notes: "",
};

/* ========================================
   CHECKOUT COMPONENT
======================================== */

function Checkout({
  items,
  onBack,
  onConfirm,
}: CheckoutProps) {
  const [method, setMethod] =
    useState<FulfilmentMethod>("delivery");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash");

  const [customer, setCustomer] =
    useState<CustomerDetails>(initialDetails);

  /* ========================================
     UPDATE CUSTOMER DETAILS
  ======================================== */

  const updateField = (
    field: keyof CustomerDetails,
    value: string
  ) => {
    setCustomer((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* ========================================
     PRICE CALCULATION
  ======================================== */

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const deliveryFee =
    method === "delivery" ? DELIVERY_FEE : 0;

  const total = subtotal + deliveryFee;

  const itemCount = items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  /* ========================================
     DEMO ORDER SUBMISSION
  ======================================== */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (items.length === 0) return;

    const demoOrder: DemoOrder = {
      items: items.map((item) => ({
        ...item,
        product: { ...item.product },
      })),

      customer: {
        ...customer,
        fullName: customer.fullName.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        notes: customer.notes.trim(),
      },

      method,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
    };

    // Frontend preview only.
    // No real order or payment is processed.
    onConfirm(demoOrder);
  };

  return (
    <div className="melto-checkout-page">

      {/* ====================================
          CHECKOUT HEADER
      ==================================== */}

      <header className="melto-checkout-header">
        <div className="melto-checkout-header-inner">

          <button
            type="button"
            className="melto-checkout-back"
            onClick={onBack}
          >
            <ArrowLeft size={19} />
            Back to Shop
          </button>

          <img
            src="/images/melto-logo.png"
            alt="MELTO"
            className="melto-checkout-logo"
          />

          <span className="melto-checkout-secure">
            <ShoppingBag size={17} />
            Checkout Demo
          </span>

        </div>
      </header>

      <main className="melto-checkout-main">

        {/* ====================================
            PAGE HEADING
        ==================================== */}

        <div className="melto-checkout-heading">

          <span>
            <Sparkles size={18} />
            ALMOST YOUR SWEET MOMENT!
          </span>

          <h1>
            Sweet <em>Checkout!</em>
          </h1>

          <p>
            Choose how you want your ice cream
            and review your delicious order.
          </p>

        </div>

        {items.length === 0 ? (

          /* EMPTY CART */

          <div className="melto-checkout-empty">

            <IceCreamCone size={55} />

            <h2>Your cart is empty!</h2>

            <p>
              Add some sweet treats before checkout.
            </p>

            <button
              type="button"
              onClick={onBack}
            >
              Explore Ice Creams
              <ArrowRight size={18} />
            </button>

          </div>

        ) : (

          <form
            className="melto-checkout-layout"
            onSubmit={handleSubmit}
          >

            {/* ====================================
                LEFT COLUMN
            ==================================== */}

            <div className="melto-checkout-left">

              {/* STEP 01: DELIVERY / PICKUP */}

              <section className="melto-checkout-card">

                <div className="melto-checkout-card-title">

                  <span className="melto-checkout-step">
                    01
                  </span>

                  <div>
                    <h2>How Would You Like It?</h2>

                    <p>
                      Choose your preferred order method.
                    </p>
                  </div>

                </div>

                <div className="melto-checkout-methods">

                  {/* HOME DELIVERY */}

                  <label
                    className={`melto-checkout-method ${
                      method === "delivery"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfilment"
                      value="delivery"
                      checked={method === "delivery"}
                      onChange={() =>
                        setMethod("delivery")
                      }
                    />

                    <Bike size={30} />

                    <strong>Home Delivery</strong>

                    <small>
                      Delivered to your address
                    </small>

                    <span>Demo fee: LKR 250</span>

                    {method === "delivery" && (
                      <Check
                        className="melto-method-check"
                        size={18}
                      />
                    )}
                  </label>

                  {/* SHOP PICKUP */}

                  <label
                    className={`melto-checkout-method ${
                      method === "pickup"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfilment"
                      value="pickup"
                      checked={method === "pickup"}
                      onChange={() =>
                        setMethod("pickup")
                      }
                    />

                    <Store size={30} />

                    <strong>Shop Pickup</strong>

                    <small>
                      Collect from the MELTO shop
                    </small>

                    <span>Free Pickup</span>

                    {method === "pickup" && (
                      <Check
                        className="melto-method-check"
                        size={18}
                      />
                    )}
                  </label>

                </div>

              </section>

              {/* STEP 02: CUSTOMER DETAILS */}

              <section className="melto-checkout-card">

                <div className="melto-checkout-card-title">

                  <span className="melto-checkout-step">
                    02
                  </span>

                  <div>
                    <h2>Your Details</h2>
                    <p>Tell us a little about yourself.</p>
                  </div>

                </div>

                <div className="melto-checkout-fields">

                  <div className="melto-checkout-field">

                    <label htmlFor="checkout-name">
                      Full Name *
                    </label>

                    <input
                      id="checkout-name"
                      type="text"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      maxLength={100}
                      value={customer.fullName}
                      onChange={(event) =>
                        updateField(
                          "fullName",
                          event.target.value
                        )
                      }
                      required
                    />

                  </div>

                  <div className="melto-checkout-field">

                    <label htmlFor="checkout-phone">
                      Phone Number *
                    </label>

                    <input
                      id="checkout-phone"
                      type="tel"
                      placeholder="07XXXXXXXX"
                      autoComplete="tel"
                      minLength={9}
                      maxLength={15}
                      value={customer.phone}
                      onChange={(event) =>
                        updateField(
                          "phone",
                          event.target.value
                        )
                      }
                      required
                    />

                  </div>

                  <div className="melto-checkout-field full">

                    <label htmlFor="checkout-email">
                      Email Address *
                    </label>

                    <input
                      id="checkout-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      maxLength={180}
                      value={customer.email}
                      onChange={(event) =>
                        updateField(
                          "email",
                          event.target.value
                        )
                      }
                      required
                    />

                  </div>

                </div>

              </section>

              {/* STEP 03: DELIVERY INFORMATION */}

              <section className="melto-checkout-card">

                <div className="melto-checkout-card-title">

                  <span className="melto-checkout-step">
                    03
                  </span>

                  <div>
                    <h2>
                      {method === "delivery"
                        ? "Delivery Address"
                        : "Pickup Information"}
                    </h2>

                    <p>
                      {method === "delivery"
                        ? "Where should we bring your treats?"
                        : "Your order will be marked for pickup."}
                    </p>
                  </div>

                </div>

                {method === "delivery" ? (

                  <div className="melto-checkout-fields">

                    <div className="melto-checkout-field full">

                      <label htmlFor="checkout-address">
                        Street Address *
                      </label>

                      <input
                        id="checkout-address"
                        type="text"
                        placeholder="House number, street, area"
                        autoComplete="street-address"
                        maxLength={200}
                        value={customer.address}
                        onChange={(event) =>
                          updateField(
                            "address",
                            event.target.value
                          )
                        }
                        required
                      />

                    </div>

                    <div className="melto-checkout-field full">

                      <label htmlFor="checkout-city">
                        City / Town *
                      </label>

                      <input
                        id="checkout-city"
                        type="text"
                        placeholder="Enter your city"
                        autoComplete="address-level2"
                        maxLength={100}
                        value={customer.city}
                        onChange={(event) =>
                          updateField(
                            "city",
                            event.target.value
                          )
                        }
                        required
                      />

                    </div>

                    <p className="melto-checkout-info">
                      <MapPin size={17} />

                      Delivery availability and final
                      charges will be confirmed after
                      backend integration.
                    </p>

                  </div>

                ) : (

                  <div className="melto-checkout-pickup-note">

                    <Store size={29} />

                    <div>
                      <strong>MELTO Shop Pickup</strong>

                      <p>
                        Pickup is free. Collection address,
                        operating hours and pickup times
                        will be added once confirmed.
                      </p>
                    </div>

                  </div>

                )}

                <div className="melto-checkout-field melto-checkout-notes">

                  <label htmlFor="checkout-notes">
                    Special Instructions (Optional)
                  </label>

                  <textarea
                    id="checkout-notes"
                    placeholder="Any special requests?"
                    rows={3}
                    maxLength={500}
                    value={customer.notes}
                    onChange={(event) =>
                      updateField(
                        "notes",
                        event.target.value
                      )
                    }
                  />

                </div>

              </section>

              {/* ====================================
                  STEP 04: PAYMENT METHOD
              ==================================== */}

              <section className="melto-checkout-card">

                <div className="melto-checkout-card-title">

                  <span className="melto-checkout-step">
                    04
                  </span>

                  <div>
                    <h2>Payment Method</h2>

                    <p>
                      Choose your preferred payment option.
                    </p>
                  </div>

                </div>

                <div className="melto-checkout-payment-options">

                  {/* CASH PAYMENT */}

                  <label
                    className={`melto-checkout-payment-option ${
                      paymentMethod === "cash"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() =>
                        setPaymentMethod("cash")
                      }
                    />

                    <div className="melto-checkout-payment-icon">
                      <Banknote size={25} />
                    </div>

                    <div className="melto-checkout-payment-info">

                      <strong>
                        {method === "delivery"
                          ? "Cash on Delivery"
                          : "Pay at Pickup"}
                      </strong>

                      <p>
                        {method === "delivery"
                          ? "Choose to pay cash when your ice cream is delivered."
                          : "Choose to pay at the MELTO shop when collecting your order."}
                      </p>

                    </div>

                    <span className="melto-checkout-payment-selected">
                      {paymentMethod === "cash" && (
                        <Check size={21} />
                      )}
                    </span>

                  </label>

                  {/* CARD PAYMENT */}

                  <label
                    className={`melto-checkout-payment-option ${
                      paymentMethod === "card"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() =>
                        setPaymentMethod("card")
                      }
                    />

                    <div className="melto-checkout-payment-icon">
                      <CreditCard size={25} />
                    </div>

                    <div className="melto-checkout-payment-info">

                      <strong>Card Payment</strong>

                      <p>
                        Visa / Mastercard – payment
                        gateway integration pending.
                      </p>

                      <div className="melto-checkout-card-brands">
                        <span>VISA</span>
                        <span>Mastercard</span>
                      </div>

                    </div>

                    <span className="melto-checkout-payment-selected">
                      {paymentMethod === "card" && (
                        <Check size={21} />
                      )}
                    </span>

                  </label>

                </div>

                {/* CARD PAYMENT NOTICE */}

                {paymentMethod === "card" && (

                  <div
                    className="melto-checkout-card-notice"
                    role="note"
                  >

                    <ShieldCheck size={23} />

                    <div>
                      <strong>
                        Secure Card Checkout – Coming Soon
                      </strong>

                      <p>
                        This is a frontend payment selection
                        demo. No card number, expiry date or
                        CVV is collected. A payment gateway
                        will be integrated later.
                      </p>
                    </div>

                  </div>

                )}

                {/* GENERAL DEMO NOTICE */}

                <div className="melto-checkout-payment-disclaimer">
                  <Info size={16} />

                  <span>
                    No payment is collected and no real
                    order is placed during this demo.
                  </span>
                </div>

              </section>

            </div>

            {/* ====================================
                RIGHT: ORDER SUMMARY
            ==================================== */}

            <aside className="melto-checkout-summary">

              <div className="melto-checkout-summary-title">

                <ShoppingBag size={23} />

                <div>
                  <h2>Your Sweet Order</h2>

                  <p>
                    {itemCount}{" "}
                    {itemCount === 1 ? "item" : "items"}
                  </p>
                </div>

              </div>

              {/* ORDER ITEMS */}

              <div className="melto-checkout-summary-items">

                {items.map((item) => (

                  <div
                    key={item.product.id}
                    className="melto-checkout-summary-item"
                  >

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                    />

                    <div>
                      <strong>
                        {item.product.name}
                      </strong>

                      <small>
                        Qty: {item.quantity}
                      </small>

                      <span>
                        LKR{" "}
                        {(
                          item.product.price *
                          item.quantity
                        ).toLocaleString("en-LK")}
                      </span>
                    </div>

                  </div>

                ))}

              </div>

              {/* PRICE CALCULATION */}

              <div className="melto-checkout-calculation">

                <div>
                  <span>Subtotal</span>

                  <strong>
                    LKR {subtotal.toLocaleString("en-LK")}
                  </strong>
                </div>

                <div>
                  <span>
                    {method === "delivery"
                      ? "Demo Delivery Fee"
                      : "Shop Pickup"}
                  </span>

                  <strong>
                    {deliveryFee === 0
                      ? "FREE"
                      : `LKR ${deliveryFee.toLocaleString("en-LK")}`}
                  </strong>
                </div>

                <div className="melto-checkout-grand-total">
                  <span>Total</span>

                  <strong>
                    LKR {total.toLocaleString("en-LK")}
                  </strong>
                </div>

              </div>

              {/* SELECTED PAYMENT SUMMARY */}

              <div className="melto-checkout-summary-payment">

                {paymentMethod === "card" ? (
                  <CreditCard size={19} />
                ) : (
                  <Banknote size={19} />
                )}

                <div>
                  <small>Selected Payment Method</small>

                  <strong>
                    {paymentMethod === "card"
                      ? "Card Payment (Demo)"
                      : method === "delivery"
                        ? "Cash on Delivery"
                        : "Pay at Pickup"}
                  </strong>
                </div>

              </div>

              {/* DEMO SUBMIT */}

              <button
                type="submit"
                className="melto-checkout-submit"
              >
                Preview Demo Order
                <ArrowRight size={19} />
              </button>

              <p className="melto-checkout-disclaimer">
                This is a frontend demo. Clicking this
                button does not place an order or
                process a payment.
              </p>

            </aside>

          </form>

        )}

      </main>
    </div>
  );
}

export default Checkout;
