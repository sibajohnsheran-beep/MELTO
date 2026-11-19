
import ProductCollection from "../ProductCollection/ProductCollection";

import type { Product } from "../../data/products";

import "./FlavoursPage.css";

/* ==========================================
   MELTO FLAVOURS PAGE
========================================== */

interface FlavoursPageProps {
  onAddToCart: (product: Product) => void;
}

function FlavoursPage({
  onAddToCart,
}: FlavoursPageProps) {
  return (
    <main
      id="flavours-page"
      className="melto-flavours-page"
    >
      {/* ==================================
          ALL SIX MELTO PRODUCTS
          WITH EXISTING FILTERS AND CART
      ================================== */}

      <ProductCollection
        onAddToCart={onAddToCart}
      />

    </main>
  );
}

export default FlavoursPage;
