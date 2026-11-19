
import "./HomepagePromos.css";

function HomepagePromos() {
  return (
    <section
      className="melto-home-promos"
      aria-label="MELTO promotions and features"
    >
      <div className="melto-home-promos-inner">

        {/* =================================
            ORIGINAL BUILD YOUR SCOOP BANNER
            INCLUDING FOUR FEATURE CARDS
        ================================= */}

        <div className="melto-promo-image-wrap">
          <img
            src="/images/melto-build-reference.png"
            alt="Build Your Own Scoop! Mix, match and create your perfect ice cream with your favourite flavours and toppings. Premium Ingredients, Freshly Made Daily, Multiple Flavours and Fast Delivery."
            className="melto-promo-image"
            draggable={false}
          />

          <a
            href="#melto-customizer-section"
            className="melto-promo-hotspot melto-build-hotspot"
            aria-label="Start Customising your ice cream"
            title="Start Customising"
          />
        </div>

        {/* =================================
            ORIGINAL SWEET OFFERS BANNER
        ================================= */}

        <div className="melto-promo-image-wrap melto-offers-wrap">
          <img
            src="/images/melto-offers-reference.png"
            alt="Sweet Offers Just for You! Discover exclusive deals and seasonal flavours."
            className="melto-promo-image"
            draggable={false}
          />

          <a
            href="#melto-offers-products"
            className="melto-promo-hotspot melto-offers-hotspot"
            aria-label="View MELTO special offers"
            title="View Offers"
          />
        </div>

      </div>
    </section>
  );
}

export default HomepagePromos;
