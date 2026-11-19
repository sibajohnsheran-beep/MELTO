
import {
  ArrowRight,
  Heart,
  Sparkles,
  Smile,
  IceCreamCone,
} from "lucide-react";

import "./OurStory.css";

const storyFeatures = [
  {
    icon: <Heart size={22} />,
    title: "Made with Love",
    description:
      "Every scoop is all about sharing happiness.",
  },
  {
    icon: <IceCreamCone size={22} />,
    title: "A World of Flavours",
    description:
      "From classic favourites to colourful creations.",
  },
  {
    icon: <Smile size={22} />,
    title: "Sweet Little Moments",
    description:
      "Bringing smiles to every ice cream moment.",
  },
];

function OurStory() {
  return (
    <section id="story" className="melto-story">

      <div className="melto-story-container">

        {/* LEFT – VISUAL SHOWCASE */}

        <div className="melto-story-visual">

          <div className="melto-story-glow" />

          <div className="melto-story-sparkle sparkle-1">
            ✦
          </div>

          <div className="melto-story-sparkle sparkle-2">
            ✧
          </div>

          <div className="melto-story-sparkle sparkle-3">
            ♥
          </div>

          <div className="melto-story-image-wrap">
            <img
              src="/images/melto-shop-3d.png"
              alt="MELTO's colourful ice cream shop illustration"
              className="melto-story-image"
              loading="lazy"
            />
          </div>

          <div className="melto-story-floating-card">
            <span>🍦</span>

            <div>
              <strong>Made for Smiles</strong>
              <small>Scoop the Joy.</small>
            </div>
          </div>

          <div className="melto-story-love-badge">
            <Heart size={18} fill="currentColor" />
          </div>

        </div>

        {/* RIGHT – OUR STORY CONTENT */}

        <div className="melto-story-content">

          <div className="melto-story-eyebrow">
            <Sparkles size={17} />
            THE STORY BEHIND MELTO
          </div>

          <h2>
            Life Is Sweeter
            <span> With Every Scoop!</span>
          </h2>

          <p className="melto-story-description">
            At MELTO, we believe ice cream is more than
            just a dessert. It is a little moment of
            happiness, a reason to smile and a sweet
            memory waiting to happen.
          </p>

          <p className="melto-story-description">
            From delicious classic flavours to playful
            creations, MELTO is designed to make every
            ice cream experience colourful, exciting
            and full of joy.
          </p>

          {/* BRAND FEATURES */}

          <div className="melto-story-features">

            {storyFeatures.map((feature) => (
              <div
                className="melto-story-feature"
                key={feature.title}
              >

                <div className="melto-story-feature-icon">
                  {feature.icon}
                </div>

                <div className="melto-story-feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>

              </div>
            ))}

          </div>

          {/* BUTTON */}

          <a
            href="#customizer"
            className="melto-story-button"
          >
            Create Your Sweet Moment
            <ArrowRight size={18} />
          </a>

        </div>

      </div>

    </section>
  );
}

export default OurStory;
