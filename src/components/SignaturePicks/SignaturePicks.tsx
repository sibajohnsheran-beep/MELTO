
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

import {
  products,
  type Product,
} from "../../data/products";

import "./SignaturePicks.css";

/* ==========================================
   MELTO - SIGNATURE PICKS PROPS
========================================== */

interface SignaturePicksProps {
  onAddToCart: (product: Product) => void;
}

/* ==========================================
   ALL SIX MELTO ICE CREAM PRODUCTS
========================================== */

// Display all 6 products from products.ts.
// No products are removed or duplicated.

const featuredProducts: Product[] = products;

/* ==========================================
   SIGNATURE PICKS COMPONENT
========================================== */

function SignaturePicks({
  onAddToCart,
}: SignaturePicksProps) {
  /* ========================================
     FAVOURITE PRODUCTS STATE
  ======================================== */

  const [favourites, setFavourites] =
    useState<string[]>([]);

  /* ========================================
     TOGGLE FAVOURITE
  ======================================== */

  const toggleFavourite = (id: string) => {
    setFavourites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  /* ========================================
     RENDER SIGNATURE PICKS
  ======================================== */

  return (
    <section
      id="signature-picks"
      className="melto-signature"
      aria-labelledby="melto-signature-title"
    >
      {/* ====================================
          CREAM WAVE DECORATION
      ==================================== */}

      <svg
        className="melto-signature-wave"
        viewBox="0 0 1440 95"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="
            M0 15
            C85 70 135 -10 225 34
            S370 78 465 25
            S630 -5 720 38
            S880 76 980 25
            S1130 -3 1235 38
            S1380 75 1440 14
            V0 H0 Z
          "
          fill="#fff5fa"
        />

        <path
          d="
            M0 20
            C85 76 135 -3 225 40
            S370 84 465 31
            S630 1 720 44
            S880 82 980 31
            S1130 3 1235 44
            S1380 81 1440 20
          "
          fill="none"
          stroke="#ffd5e6"
          strokeWidth="5"
        />
      </svg>

      {/* ====================================
          CANDY BACKGROUND DECORATIONS
      ==================================== */}

      <div
        className="melto-signature-decorations"
        aria-hidden="true"
      >
        <span className="melto-signature-candy candy-one" />
        <span className="melto-signature-candy candy-two" />
        <span className="melto-signature-candy candy-three" />
        <span className="melto-signature-candy candy-four" />
        <span className="melto-signature-candy candy-five" />
        <span className="melto-signature-candy candy-six" />
      </div>

      {/* ====================================
          MAIN CONTAINER
      ==================================== */}

      <div className="melto-signature-inner">

        {/* ==================================
            SECTION HEADING
        ================================== */}

        <header className="melto-signature-heading">

          <div className="melto-signature-heading-row">

            {/* LEFT SPRINKLES */}

            <span
              className="melto-signature-sprinkles"
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </span>

            {/* TITLE */}

            <h2 id="melto-signature-title">
              Our Signature Picks
            </h2>

            {/* RIGHT SPRINKLES */}

            <span
              className="melto-signature-sprinkles right"
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </span>

          </div>

          <p>
            Our most loved ice creams, crafted for
            true ice cream lovers.
          </p>

        </header>

        {/* ==================================
            ALL SIX PRODUCT CARDS
        ================================== */}

        <div className="melto-signature-grid">

          {featuredProducts.map((product) => {
            const isFavourite =
              favourites.includes(product.id);

            return (
              <article
                className="melto-signature-card"
                key={product.id}
              >

                {/* ==========================
                    FAVOURITE HEART
                ========================== */}

                <button
                  type="button"
                  className={`melto-signature-heart ${
                    isFavourite ? "active" : ""
                  }`}
                  onClick={() =>
                    toggleFavourite(product.id)
                  }
                  aria-label={
                    isFavourite
                      ? `Remove ${product.name} from favourites`
                      : `Add ${product.name} to favourites`
                  }
                  aria-pressed={isFavourite}
                >
                  <Heart
                    size={21}
                    strokeWidth={2.2}
                    fill={
                      isFavourite
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

                {/* ==========================
                    3D PRODUCT IMAGE
                ========================== */}

                <div className="melto-signature-image-area">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="melto-signature-product-image"
                    loading="lazy"
                    draggable={false}
                  />

                </div>

                {/* ==========================
                    PRODUCT DETAILS
                ========================== */}

                <div className="melto-signature-info">

                  {/* PRODUCT NAME */}

                  <h3>
                    {product.name}
                  </h3>

                  {/* PRODUCT PRICE */}

                  <p>
                    LKR{" "}
                    {product.price.toLocaleString(
                      "en-LK"
                    )}
                  </p>

                  {/* ========================
                      ADD TO CART BUTTON
                  ======================== */}

                  <button
                    type="button"
                    className="melto-signature-add"
                    onClick={() =>
                      onAddToCart(product)
                    }
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>

                </div>

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default SignaturePicks;
