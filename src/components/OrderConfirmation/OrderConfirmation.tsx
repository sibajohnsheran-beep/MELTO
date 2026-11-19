
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Banknote,
  IceCreamCone,
  MapPin,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";

import type { DemoOrder } from "../Checkout/Checkout";

import "./OrderConfirmation.css";

interface OrderConfirmationProps {
  order: DemoOrder;
  onContinueShopping: () => void;
}

function OrderConfirmation({
  order,
  onContinueShopping,
}: OrderConfirmationProps) {
  const isDelivery = order.method === "delivery";

  const isCardPayment =
    order.paymentMethod === "card";

  const paymentLabel = isCardPayment
    ? "Card Payment (Demo – Not Charged)"
    : isDelivery
      ? "Cash on Delivery (Demo)"
      : "Pay at Pickup (Demo)";

  return (
    <main className="melto-confirmation-page">

      <div className="melto-confirmation-container">

        {/* MELTO LOGO */}

        <img
          src="/images/melto-logo.png"
          alt="MELTO"
          className="melto-confirmation-logo"
        />

        <div className="melto-confirmation-icon">
          <CheckCircle2 size={48} />
        </div>

        {/* PAGE HEADING */}

        <span className="melto-confirmation-eyebrow">
          <Sparkles size={17} />
          YOUR SWEET ORDER PREVIEW
        </span>

        <h1>
          Sweet Choice,{" "}
          <span>{order.customer.fullName}!</span>
        </h1>

        <p className="melto-confirmation-intro">
          Your checkout details have been validated
          and your demo order summary is ready.
        </p>

        {/* DEMO NOTICE */}

        <div
          className="melto-confirmation-demo-alert"
          role="status"
        >
          <strong>Frontend Demo Only</strong>

          <p>
            No real order has been placed, no payment
            has been collected, and no details have
            been sent to MELTO.
          </p>
        </div>

        {/* ORDER SUMMARY */}

        <div className="melto-confirmation-card">

          <div className="melto-confirmation-card-head">
            <ShoppingBag size={21} />
            <h2>Your Order Summary</h2>
          </div>

          {/* ORDER ITEMS */}

          <div className="melto-confirmation-items">

            {order.items.map((item) => (

              <div
                className="melto-confirmation-item"
                key={item.product.id}
              >

                <img
                  src={item.product.image}
                  alt={item.product.name}
                />

                <div>
                  <strong>{item.product.name}</strong>

                  <small>
                    Quantity: {item.quantity}
                  </small>
                </div>

                <span>
                  LKR{" "}
                  {(
                    item.product.price *
                    item.quantity
                  ).toLocaleString("en-LK")}
                </span>

              </div>

            ))}

          </div>

          {/* CUSTOMER DETAILS */}

          <div className="melto-confirmation-details">

            <h3>
              {isDelivery ? (
                <Truck size={20} />
              ) : (
                <Store size={20} />
              )}

              {isDelivery
                ? "Home Delivery"
                : "Shop Pickup"}
            </h3>

            <p>
              <strong>Customer:</strong>{" "}
              {order.customer.fullName}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.customer.phone}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.customer.email}
            </p>

            {isDelivery ? (

              <p>
                <MapPin size={15} />
                {order.customer.address},{" "}
                {order.customer.city}
              </p>

            ) : (

              <p>
                Pickup address and hours will be
                confirmed when the shop is configured.
              </p>

            )}

            {order.customer.notes && (
              <p>
                <strong>Instructions:</strong>{" "}
                {order.customer.notes}
              </p>
            )}

            {/* SELECTED PAYMENT METHOD */}

            <p>
              {isCardPayment ? (
                <CreditCard size={16} />
              ) : (
                <Banknote size={16} />
              )}

              <strong>Payment:</strong>{" "}
              {paymentLabel}
            </p>

          </div>

          {/* TOTALS */}

          <div className="melto-confirmation-total">

            <div>
              <span>Subtotal</span>

              <strong>
                LKR {order.subtotal.toLocaleString("en-LK")}
              </strong>
            </div>

            <div>
              <span>Demo Delivery Fee</span>

              <strong>
                {order.deliveryFee === 0
                  ? "FREE"
                  : `LKR ${order.deliveryFee.toLocaleString("en-LK")}`}
              </strong>
            </div>

            <div className="melto-confirmation-grand-total">
              <span>Total</span>

              <strong>
                LKR {order.total.toLocaleString("en-LK")}
              </strong>
            </div>

          </div>

        </div>

        {/* CONTINUE SHOPPING */}

        <button
          type="button"
          className="melto-confirmation-continue"
          onClick={onContinueShopping}
        >
          <IceCreamCone size={19} />
          Continue Shopping
          <ArrowRight size={19} />
        </button>

      </div>
    </main>
  );
}

export default OrderConfirmation;
