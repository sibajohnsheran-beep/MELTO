
import { useState, type CSSProperties } from "react";

import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  Rotate3D,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import IceCream3D from "./IceCream3D";

import type {
  ServingType,
  ToppingType,
  SauceType,
} from "./IceCream3D";

import { flavours } from "../../data/flavours";

import {
  products,
  type Product,
} from "../../data/products";

import "./IceCreamCustomizer.css";

interface IceCreamCustomizerProps {
  onAddToCart: (product: Product) => void;
}

/* SIX MELTO FLAVOUR COLOURS */

const flavourColors: Record<string, string> = {
  Strawberry: "#f87aa5",
  Chocolate: "#86503a",
  Mango: "#ffca46",
  Vanilla: "#f7e9bd",
  Blueberry: "#ae85e6",
  Mint: "#9cdebb",
};

/* SERVING OPTIONS */

const servingOptions: {
  id: ServingType;
  label: string;
  icon: string;
}[] = [
  { id: "cup", label: "Cup", icon: "🍨" },
  { id: "cone", label: "Cone", icon: "🍦" },
  { id: "waffle", label: "Waffle Bowl", icon: "🧇" },
];

/* TOPPING OPTIONS */

const toppingOptions: {
  id: ToppingType;
  label: string;
  icon: string;
  price: number;
}[] = [
  {
    id: "none",
    label: "None",
    icon: "✨",
    price: 0,
  },
  {
    id: "sprinkles",
    label: "Sprinkles",
    icon: "🌈",
    price: 80,
  },
  {
    id: "nuts",
    label: "Nuts",
    icon: "🥜",
    price: 120,
  },
  {
    id: "cherry",
    label: "Cherry",
    icon: "🍒",
    price: 100,
  },
];

/* SAUCE OPTIONS */

const sauceOptions: {
  id: SauceType;
  label: string;
  price: number;
}[] = [
  { id: "none", label: "No Sauce", price: 0 },
  { id: "chocolate", label: "Chocolate", price: 90 },
  { id: "strawberry", label: "Strawberry", price: 90 },
  { id: "caramel", label: "Caramel", price: 100 },
];

/* MATCH FLAVOURS TO EXISTING PRODUCTS */

function matchingProduct(
  name: string
): Product | undefined {
  const normalized = name.toLowerCase();

  return products.find(
    (item) =>
      item.name.toLowerCase().includes(normalized) ||
      item.id.toLowerCase().includes(normalized)
  );
}

function IceCreamCustomizer({
  onAddToCart,
}: IceCreamCustomizerProps) {
  /* DEFAULT: THREE DIFFERENT SCOOPS */

  const [serving, setServing] =
    useState<ServingType>("cone");

  const [scoopCount, setScoopCount] =
    useState(3);

  const [scoopFlavours, setScoopFlavours] =
    useState<number[]>([0, 3, 1]);

  const [activeScoop, setActiveScoop] =
    useState(0);

  const [topping, setTopping] =
    useState<ToppingType>("sprinkles");

  const [sauce, setSauce] =
    useState<SauceType>("strawberry");

  /* SELECTED FLAVOURS */

  const selectedNames = Array.from(
    { length: scoopCount },
    (_, index) =>
      flavours[scoopFlavours[index] ?? 0]?.name ??
      "Strawberry"
  );

  const scoopColors = selectedNames.map(
    (name) => flavourColors[name] ?? "#f87aa5"
  );

  const baseProduct =
    matchingProduct(selectedNames[0]) ?? products[0];

  /* PRICES */

  const toppingPrice =
    toppingOptions.find(
      (item) => item.id === topping
    )?.price ?? 0;

  const saucePrice =
    sauceOptions.find(
      (item) => item.id === sauce
    )?.price ?? 0;

  const totalPrice =
    (baseProduct?.price ?? 0) +
    (scoopCount - 1) * 220 +
    (serving === "cup" ? 30 : 0) +
    toppingPrice +
    saucePrice;

  /* INCREASE / DECREASE SCOOPS */

  const changeScoopCount = (change: number) => {
    const next = Math.min(
      3,
      Math.max(1, scoopCount + change)
    );

    setScoopCount(next);

    setActiveScoop(
      Math.min(
        next - 1,
        change > 0 ? next - 1 : activeScoop
      )
    );
  };

  /* CHANGE INDIVIDUAL SCOOP FLAVOUR */

  const setFlavourForActiveScoop = (
    flavourIndex: number
  ) => {
    setScoopFlavours((previous) =>
      previous.map((value, index) =>
        index === activeScoop
          ? flavourIndex
          : value
      )
    );
  };

  /* ADD CUSTOM CREATION TO CART */

  const handleAddToCart = () => {
    if (!baseProduct) return;

    const creation: Product = {
      ...baseProduct,

      id: [
        "custom",
        serving,
        ...selectedNames.map((name) =>
          name.toLowerCase()
        ),
        topping,
        sauce,
      ].join("-"),

      name:
        scoopCount === 1
          ? `My MELTO ${selectedNames[0]}`
          : `My MELTO Mix ×${scoopCount}`,

      description: [
        serving === "cone"
          ? "Waffle Cone"
          : serving === "cup"
            ? "Ice Cream Cup"
            : "Waffle Bowl",

        `${scoopCount} ${
          scoopCount === 1 ? "Scoop" : "Scoops"
        }`,

        selectedNames.join(" + "),

        toppingOptions.find(
          (item) => item.id === topping
        )?.label ?? "None",

        sauceOptions.find(
          (item) => item.id === sauce
        )?.label ?? "No Sauce",
      ].join(" • "),

      price: totalPrice,
      image: baseProduct.image,
      tag: "Custom Creation",
    };

    onAddToCart(creation);
  };

  return (
    <section
      id="customizer"
      className="melto-builder"
      aria-labelledby="melto-builder-heading"
    >
      <div className="melto-builder-shell">

        {/* LEFT: DESIGN SHOWCASE */}

        <div className="melto-builder-showcase">

          <div className="melto-builder-showcase-copy">

            <span className="melto-builder-kicker">
              CUSTOMIZE
            </span>

            <h2 id="melto-builder-heading">
              Build Your
              <span>Own Scoop!</span>
            </h2>

            <p>
              Create a one-of-a-kind ice cream
              just the way you like it.
            </p>

          </div>

          {/* CANDY DECORATIONS */}

          <div
            className="melto-builder-decor decor-one"
            aria-hidden="true"
          >
            ✦
          </div>

          <div
            className="melto-builder-decor decor-two"
            aria-hidden="true"
          >
            ✧
          </div>

          <div
            className="melto-builder-decor decor-three"
            aria-hidden="true"
          >
            ●
          </div>

          <div
            className="melto-builder-decor decor-four"
            aria-hidden="true"
          >
            ✦
          </div>

          {/* LIVE INTERACTIVE THREE.JS MODEL */}

          <div className="melto-builder-three-scene">
            <IceCream3D
              serving={serving}
              flavourColors={scoopColors}
              scoopCount={scoopCount}
              topping={topping}
              sauce={sauce}
            />
          </div>

          <div className="melto-builder-rotate-hint">
            <Rotate3D size={15} />
            Drag to rotate
          </div>

          {/* SMALL PRODUCT ARTWORK DECORATION */}

          {products[0]?.image && (
            <img
              className="melto-builder-accent-ice"
              src={products[0].image}
              alt=""
              aria-hidden="true"
            />
          )}

          <div
            className="melto-builder-ground"
            aria-hidden="true"
          />

        </div>

        {/* RIGHT: COMPACT CUSTOMIZER PANEL */}

        <div className="melto-builder-panel">

          {/* 01: CHOOSE BASE */}

          <div className="melto-builder-group">

            <h3 className="melto-builder-step-heading">
              <span>1</span>
              Choose a Base
            </h3>

            <div className="melto-builder-bases">

              {servingOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={`melto-builder-base ${
                    serving === option.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setServing(option.id)
                  }
                  aria-pressed={
                    serving === option.id
                  }
                >
                  <span
                    className="melto-builder-base-icon"
                    aria-hidden="true"
                  >
                    {option.icon}
                  </span>

                  <span>{option.label}</span>

                  {serving === option.id && (
                    <Check
                      className="melto-builder-selected-check"
                      size={14}
                    />
                  )}
                </button>
              ))}

            </div>
          </div>

          {/* 02: PICK FLAVOURS */}

          <div className="melto-builder-group">

            <div className="melto-builder-heading-line">

              <h3 className="melto-builder-step-heading">
                <span>2</span>
                Pick Your Flavours
                <small>Max 3</small>
              </h3>

              <div
                className="melto-builder-count"
                aria-label="Number of scoops"
              >
                <button
                  type="button"
                  aria-label="Remove a scoop"
                  disabled={scoopCount <= 1}
                  onClick={() =>
                    changeScoopCount(-1)
                  }
                >
                  <Minus size={15} />
                </button>

                <strong>{scoopCount}</strong>

                <button
                  type="button"
                  aria-label="Add a scoop"
                  disabled={scoopCount >= 3}
                  onClick={() =>
                    changeScoopCount(1)
                  }
                >
                  <Plus size={15} />
                </button>
              </div>

            </div>

            {/* SELECT WHICH SCOOP TO EDIT */}

            <div
              className="melto-builder-scoop-tabs"
              aria-label="Choose which scoop to edit"
            >
              {selectedNames.map((name, index) => (
                <button
                  type="button"
                  key={index}
                  className={
                    activeScoop === index
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setActiveScoop(index)
                  }
                  aria-pressed={
                    activeScoop === index
                  }
                >
                  <span
                    style={{
                      background:
                        flavourColors[name] ??
                        "#f87aa5",
                    }}
                  />

                  Scoop {index + 1}
                  <small>{name}</small>
                </button>
              ))}
            </div>

            {/* ALL SIX FLAVOUR OPTIONS */}

            <div className="melto-builder-flavour-options">

              {flavours.map((flavour, index) => {
                const product = matchingProduct(
                  flavour.name
                );

                const isSelected =
                  scoopFlavours[activeScoop] === index;

                return (
                  <button
                    type="button"
                    key={flavour.name}
                    className={`melto-builder-flavour ${
                      isSelected
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setFlavourForActiveScoop(index)
                    }
                    aria-pressed={isSelected}
                  >
                    <span
                      className="melto-builder-flavour-visual"
                      style={
                        {
                          "--flavour-color":
                            flavourColors[
                              flavour.name
                            ] ?? "#f87aa5",
                        } as CSSProperties
                      }
                    >
                      <span className="melto-builder-flavour-fallback" />

                      {product?.image && (
                        <img
                          src={product.image}
                          alt=""
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />
                      )}
                    </span>

                    <span>{flavour.name}</span>
                  </button>
                );
              })}

            </div>
          </div>

          {/* 03: TOPPINGS */}

          <div className="melto-builder-group">

            <h3 className="melto-builder-step-heading">
              <span>3</span>
              Add Toppings
            </h3>

            <div className="melto-builder-toppings">

              {toppingOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={
                    topping === option.id
                      ? "selected"
                      : ""
                  }
                  aria-pressed={
                    topping === option.id
                  }
                  onClick={() =>
                    setTopping(option.id)
                  }
                >
                  <span aria-hidden="true">
                    {option.icon}
                  </span>

                  <strong>{option.label}</strong>

                  <small>
                    {option.price
                      ? `+ ${option.price}`
                      : "Free"}
                  </small>
                </button>
              ))}

            </div>
          </div>

          {/* 04: SAUCES */}

          <div className="melto-builder-sauces">

            <h3 className="melto-builder-step-heading">
              <span>4</span>
              Finish With Sauce
            </h3>

            <div className="melto-builder-sauce-options">

              {sauceOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={
                    sauce === option.id
                      ? "selected"
                      : ""
                  }
                  aria-pressed={
                    sauce === option.id
                  }
                  onClick={() =>
                    setSauce(option.id)
                  }
                >
                  {option.label}

                  {option.price > 0 && (
                    <small>+{option.price}</small>
                  )}
                </button>
              ))}

            </div>
          </div>

          {/* TOTAL AND ADD TO CART */}

          <div className="melto-builder-checkout">

            <div className="melto-builder-total">
              <span>
                Total
                <small>Customized Ice Cream</small>
              </span>

              <strong aria-live="polite">
                LKR{" "}
                {totalPrice.toLocaleString("en-LK")}
              </strong>
            </div>

            <button
              type="button"
              className="melto-builder-add"
              onClick={handleAddToCart}
              disabled={!baseProduct}
            >
              <ShoppingBag size={17} />
              Add to Cart
              <ArrowRight size={18} />
            </button>

          </div>

        </div>
      </div>

      <p className="melto-builder-note">
        <Sparkles size={14} />
        Live interactive 3D • Mix up to 3
        flavours • Demo pricing
      </p>
    </section>
  );
}

export default IceCreamCustomizer;
