
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";

import {
  products,
  type Product,
} from "../../data/products";

import "./SpecialOffers.css";

interface SpecialOffersProps {
  onAddToCart: (product: Product) => void;
}

type BundleType = "combo" | "family";

/* ==========================================
   USE THE SAME SIX FLAVOUR PRODUCT IMAGES
========================================== */

const flavourNames = [
  "Strawberry",
  "Chocolate",
  "Mango",
  "Vanilla",
  "Blueberry",
  "Mint",
];

function findProduct(
  flavour: string
): Product | undefined {
  const name = flavour.toLowerCase();

  return products.find(
    (product) =>
      product.name.toLowerCase().includes(name) ||
      product.id.toLowerCase().includes(name)
  );
}

const availableFlavours = flavourNames
  .map(findProduct)
  .filter(
    (product): product is Product =>
      product !== undefined
  );

/* ==========================================
   REUSABLE ORIGINAL ICE CREAM IMAGE
========================================== */

function OfferIceCream({
  flavour,
}: {
  flavour: string;
}) {
  const product = findProduct(flavour);

  if (!product) {
    return (
      <span
        className="melto-offer-product-fallback"
        aria-hidden="true"
      >
        🍦
      </span>
    );
  }

  return (
    <img
      src={product.image}
      alt={`${flavour} ice cream`}
      className="melto-offer-product-image"
      loading="lazy"
      draggable={false}
    />
  );
}

/* ==========================================
   OFFER CARD ARTWORK USING EXISTING IMAGES
========================================== */

function OfferArtwork({
  type,
  flavours,
}: {
  type: "combo" | "family" | "weekend";
  flavours: string[];
}) {
  return (
    <div
      className={`melto-offer-artwork ${type}`}
    >
      <span
        className="melto-offer-decoration star-one"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="melto-offer-decoration star-two"
        aria-hidden="true"
      >
        ✧
      </span>

      <div className="melto-offer-image-group">
        {flavours.map((flavour, index) => (
          <div
            className="melto-offer-image-item"
            key={`${flavour}-${index}`}
          >
            <OfferIceCream flavour={flavour} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================
   MAIN SPECIAL OFFERS COMPONENT
========================================== */

function SpecialOffers({
  onAddToCart,
}: SpecialOffersProps) {
  const [activeBundle, setActiveBundle] =
    useState<BundleType | null>(null);

  const [selectedIds, setSelectedIds] =
    useState<string[]>([]);

  const [familyTopping, setFamilyTopping] =
    useState("Sprinkles");

  /* OPEN COMBO OR FAMILY PACK */

  const openBundle = (type: BundleType) => {
    const count = type === "combo" ? 2 : 4;

    setSelectedIds(
      Array.from(
        { length: count },
        (_, index) =>
          availableFlavours[
            index % Math.max(1, availableFlavours.length)
          ]?.id ?? ""
      )
    );

    setFamilyTopping("Sprinkles");
    setActiveBundle(type);
  };

  /* CLOSE MODAL WITH ESCAPE */

  useEffect(() => {
    if (!activeBundle) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveBundle(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );
  }, [activeBundle]);

  /* CHANGE SELECTED FLAVOUR */

  const changeFlavour = (
    index: number,
    productId: string
  ) => {
    setSelectedIds((previous) =>
      previous.map((id, position) =>
        position === index ? productId : id
      )
    );
  };

  /* ADD BUNDLE TO EXISTING CART */

  const addBundleToCart = () => {
    if (!activeBundle) return;

    const required =
      activeBundle === "family" ? 4 : 2;

    const selectedProducts = selectedIds
      .map((id) =>
        availableFlavours.find(
          (product) => product.id === id
        )
      )
      .filter(
        (product): product is Product =>
          product !== undefined
      );

    if (selectedProducts.length !== required) {
      return;
    }

    const firstProduct = selectedProducts[0];

    const isFamily =
      activeBundle === "family";

    const bundleProduct: Product = {
      ...firstProduct,

      id: [
        "melto-special",
        activeBundle,
        ...selectedIds,
        ...(isFamily
          ? [familyTopping.toLowerCase()]
          : []),
      ].join("-"),

      name: isFamily
        ? "MELTO Family Pack"
        : "MELTO Combo Treat",

      description: [
        `${required} Scoops`,
        selectedProducts
          .map((product) => product.name)
          .join(" + "),
        ...(isFamily
          ? [`Topping: ${familyTopping}`]
          : []),
      ].join(" • "),

      image: firstProduct.image,

      price: isFamily ? 3200 : 1100,

      tag: "Special Offer",
    };

    onAddToCart(bundleProduct);
    setActiveBundle(null);
  };

  const isFamily =
    activeBundle === "family";

  const modalScoopCount =
    isFamily ? 4 : 2;

  return (
    <section
      id="offers"
      className="melto-special"
      aria-labelledby="melto-special-title"
    >
      <div className="melto-special-shell">

        {/* ORIGINAL LEFT TITLE */}

        <div className="melto-special-intro">
          <span className="melto-special-eyebrow">
            SPECIAL OFFERS
          </span>

          <h2 id="melto-special-title">
            Sweet Deals
            <span>You’ll Love!</span>
          </h2>

          <p>
            Exclusive offers, combo treats
            and seasonal flavours just for you.
          </p>
        </div>

        {/* ORIGINAL THREE OFFER CARDS */}

        <div className="melto-special-grid">

          {/* COMBO TREAT */}

          <article className="melto-special-card">
            <OfferArtwork
              type="combo"
              flavours={[
                "Strawberry",
                "Mango",
              ]}
            />

            <h3>Combo Treat</h3>

            <p>Any 2 Scoops</p>

            <button
              type="button"
              className="melto-special-price-button"
              onClick={() =>
                openBundle("combo")
              }
              disabled={
                availableFlavours.length === 0
              }
            >
              LKR 1,100
            </button>
          </article>

          {/* FAMILY PACK */}

          <article className="melto-special-card">
            <OfferArtwork
              type="family"
              flavours={[
                "Chocolate",
                "Vanilla",
                "Mango",
                "Blueberry",
              ]}
            />

            <h3>Family Pack</h3>

            <p>4 Scoops + Toppings</p>

            <button
              type="button"
              className="melto-special-price-button"
              onClick={() =>
                openBundle("family")
              }
              disabled={
                availableFlavours.length === 0
              }
            >
              LKR 3,200
            </button>
          </article>

          {/* WEEKEND OFFER */}

          <article className="melto-special-card">
            <OfferArtwork
              type="weekend"
              flavours={[
                "Chocolate",
                "Strawberry",
              ]}
            />

            <h3>Weekend Offer</h3>

            <Link
              to="/flavours"
              className="melto-special-discount-button"
            >
              10% OFF
            </Link>

            <p className="melto-special-weekend-note">
              On All Sundaes
            </p>
          </article>

        </div>
      </div>

      {/* EXISTING BUNDLE SELECTION MODAL */}

      {activeBundle && (
        <div
          className="melto-deal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setActiveBundle(null);
            }
          }}
        >
          <div
            className="melto-deal-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="melto-deal-modal-title"
          >
            <button
              type="button"
              className="melto-deal-close"
              aria-label="Close offer"
              onClick={() =>
                setActiveBundle(null)
              }
            >
              <X size={20} />
            </button>

            <span className="melto-deal-kicker">
              MELTO SPECIAL OFFER
            </span>

            <h3 id="melto-deal-modal-title">
              {isFamily
                ? "Build Your Family Pack"
                : "Choose Your Combo"}
            </h3>

            <p className="melto-deal-description">
              Choose the flavour for each
              of your {modalScoopCount} scoops.
            </p>

            <div className="melto-deal-selectors">
              {Array.from(
                { length: modalScoopCount },
                (_, index) => (
                  <label
                    key={index}
                    className="melto-deal-selector"
                  >
                    <span>
                      Scoop {index + 1}
                    </span>

                    <select
                      value={
                        selectedIds[index] ?? ""
                      }
                      onChange={(event) =>
                        changeFlavour(
                          index,
                          event.target.value
                        )
                      }
                    >
                      {availableFlavours.map(
                        (product) => (
                          <option
                            key={product.id}
                            value={product.id}
                          >
                            {product.name}
                          </option>
                        )
                      )}
                    </select>
                  </label>
                )
              )}
            </div>

            {isFamily && (
              <label className="melto-deal-topping">
                <span>
                  Choose Your Topping
                </span>

                <select
                  value={familyTopping}
                  onChange={(event) =>
                    setFamilyTopping(
                      event.target.value
                    )
                  }
                >
                  <option>Sprinkles</option>
                  <option>Nuts</option>
                  <option>Cherry</option>
                </select>
              </label>
            )}

            <div className="melto-deal-modal-footer">
              <div>
                <span>
                  Special Offer Total
                </span>

                <strong>
                  LKR{" "}
                  {(isFamily
                    ? 3200
                    : 1100
                  ).toLocaleString("en-LK")}
                </strong>
              </div>

              <button
                type="button"
                onClick={addBundleToCart}
                disabled={
                  availableFlavours.length === 0
                }
              >
                Add Deal to Cart
                <ArrowRight size={17} />
              </button>
            </div>

            <p className="melto-deal-footnote">
              <Check size={14} />
              Demo promotional pricing
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default SpecialOffers;
