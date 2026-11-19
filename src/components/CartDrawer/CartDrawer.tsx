
import { useEffect } from "react";

import {
  X,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import type { CartItem } from "../../data/products";

import "./CartDrawer.css";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onQuantityChange: (productId: string, change: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

function CartDrawer({
  isOpen,
  onClose,
  items,
  onQuantityChange,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div
      className="melto-cart-backdrop"
      onClick={onClose}
    >
      <aside
        className="melto-cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="melto-cart-title"
        onClick={(event) => event.stopPropagation()}
      >

        {/* CART HEADER */}

        <div className="melto-cart-header">
          <div className="melto-cart-header-info">

            <div className="melto-cart-header-icon">
              <ShoppingBag size={22} />
            </div>

            <div>
              <h2 id="melto-cart-title">
                Your Sweet Cart
              </h2>

              <p>
                {itemCount}{" "}
                {itemCount === 1 ? "item" : "items"}
              </p>
            </div>

          </div>

          <button
            type="button"
            className="melto-cart-close"
            aria-label="Close shopping cart"
            onClick={onClose}
            autoFocus
          >
            <X size={22} />
          </button>
        </div>

        {/* EMPTY CART */}

        {items.length === 0 ? (
          <div className="melto-cart-empty">

            <div className="melto-cart-illustration">
              <span className="melto-cart-icecream">
                🍦
              </span>

              <span className="melto-cart-decoration decoration-one">
                ✦
              </span>

              <span className="melto-cart-decoration decoration-two">
                ♥
              </span>

              <span className="melto-cart-decoration decoration-three">
                ✧
              </span>
            </div>

            <h3>Your Cart Is Feeling Lonely!</h3>

            <p>
              Looks like you haven't added any sweet
              treats yet. Let's fill your cart with happiness!
            </p>

            <a
              href="#signature-picks"
              className="melto-cart-explore-btn"
              onClick={onClose}
            >
              Explore Ice Creams
              <ArrowRight size={18} />
            </a>

          </div>
        ) : (
          <div className="melto-cart-items">

            {items.map((item) => (
              <div
                className="melto-cart-item"
                key={item.product.id}
              >

                <div className="melto-cart-item-visual">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                  />
                </div>

                <div className="melto-cart-item-info">

                  <h3>{item.product.name}</h3>

                  <p>
                    LKR{" "}
                    {item.product.price.toLocaleString("en-LK")}
                  </p>

                  <div className="melto-cart-item-actions">

                    {/* QUANTITY */}

                    <div className="melto-cart-quantity">

                      <button
                        type="button"
                        aria-label={`Decrease ${item.product.name}`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          onQuantityChange(
                            item.product.id,
                            -1
                          )
                        }
                      >
                        <Minus size={15} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.product.name}`}
                        onClick={() =>
                          onQuantityChange(
                            item.product.id,
                            1
                          )
                        }
                      >
                        <Plus size={15} />
                      </button>

                    </div>

                    {/* REMOVE PRODUCT */}

                    <button
                      type="button"
                      className="melto-cart-remove"
                      aria-label={`Remove ${item.product.name}`}
                      onClick={() =>
                        onRemove(item.product.id)
                      }
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* CART FOOTER */}

        {items.length > 0 ? (
          <div className="melto-cart-checkout">

            <div className="melto-cart-subtotal">
              <span>Subtotal</span>

              <strong>
                LKR {subtotal.toLocaleString("en-LK")}
              </strong>
            </div>

            <p>
              Delivery fees are calculated on the
              checkout page using demo rates.
            </p>

            <button
              type="button"
              className="melto-cart-checkout-btn"
              onClick={onCheckout}
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="melto-cart-continue"
              onClick={onClose}
            >
              Continue Shopping
            </button>

          </div>
        ) : (
          <div className="melto-cart-footer">

            <div className="melto-cart-footer-note">
              <Sparkles size={18} />

              <span>
                A little scoop of joy is just a click away!
              </span>
            </div>

            <p>
              MELTO • Scoop the Joy.
            </p>

          </div>
        )}

      </aside>
    </div>
  );
}

export default CartDrawer;
