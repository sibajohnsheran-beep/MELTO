
import {
  ArrowRight,
  ArrowUp,
  Heart,
  IceCreamCone,
  Mail,
  ShoppingBag,
  Sparkles,
  Phone,
} from "lucide-react";

import "./Footer.css";

/* ========================================
   FOOTER NAVIGATION LINKS
======================================== */

const exploreLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Flavours", href: "#flavours" },
  { label: "Signature Picks", href: "#signature-picks" },
  { label: "Build Your Scoop", href: "#customizer" },
];

const otherLinks = [
  { label: "Special Offers", href: "#offers" },
  { label: "Our Story", href: "#story" },
  { label: "Contact Us", href: "#contact" },
];

/* ========================================
   MELTO FOOTER COMPONENT
======================================== */

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="melto-footer">

      {/* ====================================
          SWEET CTA BANNER
      ==================================== */}

      <div className="melto-footer-cta-wrapper">
        <div className="melto-footer-cta">

          {/* CTA CONTENT */}

          <div className="melto-footer-cta-content">

            <span className="melto-footer-cta-label">
              <Sparkles size={17} />
              YOUR SWEET MOMENT STARTS HERE
            </span>

            <h2>
              Life's Better With
              <span> Ice Cream!</span>
            </h2>

            <p>
              Discover your favourite flavours and
              create a little happiness with MELTO.
            </p>

            <div className="melto-footer-cta-buttons">

              <a
                href="#signature-picks"
                className="melto-footer-primary-btn"
              >
                <ShoppingBag size={18} />
                Explore Ice Creams
                <ArrowRight size={17} />
              </a>

              <a
                href="#customizer"
                className="melto-footer-secondary-btn"
              >
                Build Your Scoop
                <ArrowRight size={17} />
              </a>

            </div>
          </div>

          {/* CTA MASCOT */}

          <div className="melto-footer-cta-visual">

            <span className="melto-footer-decoration footer-star-one">
              ✦
            </span>

            <span className="melto-footer-decoration footer-star-two">
              ♥
            </span>

            <span className="melto-footer-decoration footer-star-three">
              ✧
            </span>

            <img
              src="/images/melto-mascot.png"
              alt="Happy MELTO ice cream mascot"
              loading="lazy"
            />

          </div>

        </div>
      </div>

      {/* ====================================
          MAIN FOOTER CONTENT
      ==================================== */}

      <div className="melto-footer-main">

        {/* BRAND COLUMN */}

        <div className="melto-footer-brand">

          <a href="#home" aria-label="MELTO Home">
            <img
              src="/images/melto-logo.png"
              alt="MELTO - Scoop the Joy"
              className="melto-footer-logo"
            />
          </a>

          <p>
            A delightful world of creamy, colourful
            and irresistible ice cream. Every scoop
            brings a little happiness!
          </p>

          <div className="melto-footer-brand-badge">
            <Heart size={16} fill="currentColor" />
            Made for Sweet Moments
          </div>

        </div>

        {/* EXPLORE LINKS */}

        <div className="melto-footer-column">

          <h3>Explore MELTO</h3>

          <nav aria-label="Footer explore links">
            {exploreLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>

        {/* QUICK LINKS */}

        <div className="melto-footer-column">

          <h3>Quick Links</h3>

          <nav aria-label="Footer quick links">
            {otherLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>

        {/* CONTACT COLUMN */}

        <div className="melto-footer-column melto-footer-contact">

          <h3>Let's Talk Sweet!</h3>

          <p>
            Have something to share? We'd love to
            hear from you.
          </p>

          <a
            href="#contact"
            className="melto-footer-contact-link"
          >
            <Mail size={18} />
            Contact MELTO
          </a>

          <div className="melto-footer-service-note">
            <IceCreamCone size={19} />

            <span>
              Delivery and shop pickup checkout
              coming soon.
            </span>
          </div>

        </div>

      </div>

      {/* ====================================
          FOOTER DIVIDER
      ==================================== */}

      <div className="melto-footer-divider" />

      {/* ====================================
          BOTTOM FOOTER
      ==================================== */}

      <div className="melto-footer-bottom">

        {/* COPYRIGHT */}

        <p>
          © {currentYear} MELTO. All rights reserved.
        </p>

        {/* DEVELOPER CREDIT */}

        <div className="melto-footer-developer">

          <span className="melto-footer-bottom-tagline">
            <Heart size={14} fill="currentColor" />
            Scoop the Joy.
          </span>

          <span className="melto-footer-developed-by">
            Developed by <strong>NeirahTech</strong>
          </span>

          <a
            href="tel:+94760041594"
            className="melto-footer-developer-phone"
            aria-label="Call NeirahTech at +94 76 004 1594"
          >
            <Phone size={15} />
            +94 76 004 1594
          </a>

        </div>

        {/* BACK TO TOP */}

        <a
          href="#home"
          className="melto-footer-back-top"
          aria-label="Back to top"
        >
          Back to Top
          <ArrowUp size={17} />
        </a>

      </div>

      {/* ====================================
          DECORATIVE ELEMENTS
      ==================================== */}

      <span
        className="melto-footer-floating-decoration decoration-a"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="melto-footer-floating-decoration decoration-b"
        aria-hidden="true"
      >
        ✧
      </span>

    </footer>
  );
}

export default Footer;
