
import { useState, type CSSProperties } from "react";
import { ArrowRight, Play } from "lucide-react";

import FlavourSelector from "../FlavourSelector/FlavourSelector";
import { flavours } from "../../data/flavours";

import "./Hero.css";

function Hero() {
  const [selectedFlavour, setSelectedFlavour] = useState(0);

  const currentFlavour = flavours[selectedFlavour];

  const heroStyle = {
    "--flavour-glow": currentFlavour.glow,
    "--flavour-accent": currentFlavour.accent,
  } as CSSProperties;

  return (
    <main id="home">
      <section
        className="melto-hero"
        style={heroStyle}
        aria-label="Welcome to MELTO"
      >
        {/* TOP CREAM WAVE */}

        <svg
          className="melto-top-cream-wave"
          viewBox="0 0 1440 115"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
              M0 0
              H1440
              V55
              C1350 8 1285 78 1180 51
              S1020 20 910 57
              S750 80 650 45
              S475 20 370 55
              S210 86 120 50
              S40 36 0 67
              Z
            "
            fill="#fff8fb"
          />

          <path
            d="
              M0 67
              C40 36 85 34 120 50
              S265 87 370 55
              S550 10 650 45
              S815 85 910 57
              S1080 18 1180 51
              S1350 8 1440 55
            "
            fill="none"
            stroke="#ffc0da"
            strokeWidth="5"
            opacity="0.65"
          />
        </svg>

        {/* BACKGROUND SCENERY */}

        <div
          className="melto-hero-scenery"
          aria-hidden="true"
        >
          {/* CLOUDS */}

          <div className="melto-hero-cloud cloud-one" />
          <div className="melto-hero-cloud cloud-two" />
          <div className="melto-hero-cloud cloud-three" />
          <div className="melto-hero-cloud cloud-four" />

          {/* GLOSSY GREEN TREE - LEFT */}

          <div className="melto-scenery-tree tree-left">
            <span className="tree-trunk" />
            <span className="tree-leaf leaf-one" />
            <span className="tree-leaf leaf-two" />
            <span className="tree-leaf leaf-three" />
            <span className="tree-leaf leaf-four" />
            <span className="tree-leaf leaf-five" />
          </div>

          {/* GLOSSY GREEN TREE - RIGHT */}

          <div className="melto-scenery-tree tree-right">
            <span className="tree-trunk" />
            <span className="tree-leaf leaf-one" />
            <span className="tree-leaf leaf-two" />
            <span className="tree-leaf leaf-three" />
            <span className="tree-leaf leaf-four" />
            <span className="tree-leaf leaf-five" />
          </div>

          {/* FLOATING CANDY SPRINKLES */}

          <span className="melto-sprinkle sprinkle-one" />
          <span className="melto-sprinkle sprinkle-two" />
          <span className="melto-sprinkle sprinkle-three" />
          <span className="melto-sprinkle sprinkle-four" />
          <span className="melto-sprinkle sprinkle-five" />

          {/* SMALL SPARKLES */}

          <span className="melto-sky-sparkle sky-sparkle-one">
            ✦
          </span>

          <span className="melto-sky-sparkle sky-sparkle-two">
            ✧
          </span>

          <span className="melto-sky-sparkle sky-sparkle-three">
            ✦
          </span>

          <span className="melto-sky-sparkle sky-sparkle-four">
            ✧
          </span>
        </div>

        <div className="melto-hero-container">

          {/* MAIN HERO CONTENT */}

          <div className="melto-hero-stage">

            {/* LEFT SIDE */}

            <div className="melto-hero-content">

              <div className="melto-hero-badge">
                <span aria-hidden="true">🍦</span>
                PREMIUM ICE CREAM
              </div>

              <h1 className="melto-hero-title">
                <span>Scoop</span>
                <strong>the Joy!</strong>
              </h1>

              <p className="melto-hero-description">
                A world of creamy, colourful and
                irresistible ice creams for every mood.
              </p>

              {/* HERO BUTTONS */}

              <div className="melto-hero-buttons">

                <a
                  href="#flavours"
                  className="melto-primary-btn"
                >
                  Explore Flavours
                  <ArrowRight size={19} />
                </a>

                <a
                  href="#story"
                  className="melto-secondary-btn"
                >
                  <span className="melto-play-icon">
                    <Play
                      size={12}
                      fill="currentColor"
                    />
                  </span>

                  Watch Our Story
                </a>

              </div>

            </div>

            {/* CENTRE - ICE CREAM MASCOT */}

            <div className="melto-mascot-scene">

              <div className="melto-mascot-glow" />

              {/* DECORATIONS AROUND MASCOT */}

              <span className="melto-decor decor-one">
                ✦
              </span>

              <span className="melto-decor decor-two">
                ✧
              </span>

              <span className="melto-decor decor-three">
                ✦
              </span>

              <span className="melto-decor decor-four">
                ♥
              </span>

              {/* EXISTING MASCOT IMAGE */}

              <div className="melto-mascot-floating">
                <img
                  src="/images/melto-mascot.png"
                  alt="MELTO smiling ice cream mascot"
                  className="melto-hero-mascot"
                />
              </div>

              <div className="melto-mascot-shadow" />

            </div>

            {/* RIGHT - MELTO ICE CREAM SHOP */}

            <div className="melto-shop-scene">

              <div className="melto-shop-glow" />

              <img
                src="/images/melto-shop-3d.png"
                alt="MELTO pink cartoon ice cream shop"
                className="melto-shop-image"
              />

            </div>

          </div>

          {/* BOTTOM WAVE + FLAVOUR SELECTOR */}

          <div className="melto-flavour-zone">

            <svg
              className="melto-bottom-cream-wave"
              viewBox="0 0 1440 135"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* BACK PINK WAVE */}

              <path
                d="
                  M0 55
                  C130 8 220 115 360 58
                  S590 5 745 70
                  S975 115 1115 54
                  S1320 10 1440 61
                  V135 H0 Z
                "
                fill="#ffb4d1"
                opacity="0.85"
              />

              {/* FRONT CREAM WAVE */}

              <path
                d="
                  M0 70
                  C130 22 220 128 360 72
                  S590 20 745 85
                  S975 125 1115 69
                  S1320 25 1440 78
                  V135 H0 Z
                "
                fill="#fff4f8"
              />

              {/* SOFT HIGHLIGHT */}

              <path
                d="
                  M0 70
                  C130 22 220 128 360 72
                  S590 20 745 85
                  S975 125 1115 69
                  S1320 25 1440 78
                "
                fill="none"
                stroke="#ffe8f2"
                strokeWidth="7"
              />
            </svg>

            {/* EXISTING WORKING FLAVOUR SELECTOR */}

            <FlavourSelector
              selectedFlavour={selectedFlavour}
              onSelect={setSelectedFlavour}
            />

          </div>

        </div>
      </section>
    </main>
  );
}

export default Hero;
