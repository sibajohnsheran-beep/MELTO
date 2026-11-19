
import {
  useState,
  type CSSProperties,
} from "react";

import {
  Heart,
  ShoppingCart,
} from "lucide-react";

import {
  products,
  type Product,
} from "../../data/products";

import "./ProductCollection.css";

/* ==========================================
   MELTO - COLLECTION FILTERS
========================================== */

type CollectionFilter =
  | "All"
  | "Classic"
  | "Fruity"
  | "Sundaes"
  | "Special"
  | "New";

const filters: CollectionFilter[] = [
  "All",
  "Classic",
  "Fruity",
  "Sundaes",
  "Special",
  "New",
];

interface ProductCollectionProps {
  onAddToCart: (product: Product) => void;
}

/* ==========================================
   PRODUCT COLLECTION COMPONENT
========================================== */

function ProductCollection({
  onAddToCart,
}: ProductCollectionProps) {
  const [activeFilter, setActiveFilter] =
    useState<CollectionFilter>("All");

  const [favourites, setFavourites] =
    useState<string[]>([]);

  /* ========================================
     FILTER LOGIC
  ======================================== */

  const visibleProducts = products.filter(
    (product) => {
      if (activeFilter === "All") {
        return true;
      }

      if (activeFilter === "Classic") {
        return product.category === "Classic";
      }

      if (activeFilter === "Fruity") {
        return product.category === "Fruity";
      }

      // These tabs are kept from the original
      // UI design. Demo catalogue has no
      // matching products yet.
      return false;
    }
  );

  /* ========================================
     FAVOURITES
  ======================================== */

  const toggleFavourite = (id: string) => {
    setFavourites((previous) =>
      previous.includes(id)
        ? previous.filter(
            (productId) => productId !== id
          )
        : [...previous, id]
    );
  };

  /* ========================================
     RENDER
  ======================================== */

  return (
    <section
      id="signature-picks"
      className="melto-collection"
      aria-labelledby="melto-collection-title"
    >

      {/* COLLECTION HEADER */}

      <div className="melto-collection-container">

        <div className="melto-collection-header">

          <div className="melto-collection-heading">

            <span className="melto-collection-eyebrow">
              OUR FLAVOURS
            </span>

            <h2 id="melto-collection-title">
              Explore Our
              <span>Ice Cream Collection</span>
            </h2>

            <p>
              A delightful range of classic and
              premium flavours made to scoop
              happiness.
            </p>

          </div>

          <div
            className="melto-collection-header-art"
            aria-hidden="true"
          >
            <img
              src="/images/melto-collection-splash.png"
              alt=""
            />
          </div>

        </div>

        {/* FILTER BUTTONS */}

        <div
          className="melto-collection-filters"
          role="group"
          aria-label="Filter flavours"
        >

          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`melto-collection-filter ${
                activeFilter === filter
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveFilter(filter)
              }
              aria-pressed={
                activeFilter === filter
              }
            >
              {filter}
            </button>
          ))}

        </div>

        {/* SIX ICE CREAM PRODUCT CARDS */}

        {visibleProducts.length > 0 ? (

          <div className="melto-collection-grid">

            {visibleProducts.map((product) => {
              const isFavourite =
                favourites.includes(product.id);

              const style = {
                "--card-tint": product.tint,
              } as CSSProperties;

              return (
                <article
                  key={product.id}
                  className="melto-collection-product"
                  style={style}
                >

                  {/* PRODUCT IMAGE */}

                  <div className="melto-collection-product-visual">

                    <button
                      type="button"
                      className={`melto-collection-heart ${
                        isFavourite
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleFavourite(
                          product.id
                        )
                      }
                      aria-label={
                        isFavourite
                          ? `Remove ${product.name} from favourites`
                          : `Add ${product.name} to favourites`
                      }
                      aria-pressed={isFavourite}
                    >
                      <Heart
                        size={22}
                        fill={
                          isFavourite
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="melto-collection-product-image"
                      loading="lazy"
                    />

                  </div>

                  {/* PRODUCT INFORMATION */}

                  <div className="melto-collection-product-details">

                    <h3>{product.name}</h3>

                    <p>
                      LKR{" "}
                      {product.price.toLocaleString(
                        "en-LK"
                      )}
                    </p>

                    {/* ADD TO CART */}

                    <button
                      type="button"
                      className="melto-collection-add-btn"
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

        ) : (

          <div
            className="melto-collection-empty"
            role="status"
          >
            <h3>
              No {activeFilter} products yet
            </h3>

            <p>
              There are no products assigned
              to this demo category.
            </p>

            <button
              type="button"
              onClick={() =>
                setActiveFilter("All")
              }
            >
              View All Flavours
            </button>

          </div>

        )}

      </div>
    </section>
  );
}

export default ProductCollection;
