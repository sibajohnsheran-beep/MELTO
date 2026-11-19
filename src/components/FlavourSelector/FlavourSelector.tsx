
import { useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { flavours } from "../../data/flavours";

import "./FlavourSelector.css";

/* ========================================
   MELTO FLAVOUR SELECTOR
======================================== */

interface FlavourSelectorProps {
  selectedFlavour: number;
  onSelect: (index: number) => void;
}

/* ========================================
   ORIGINAL DESIGN INGREDIENT IMAGES
======================================== */

const ingredientImages: Record<string, string> = {
  strawberry: "/images/flavour-strawberry.png",
  chocolate: "/images/flavour-chocolate.png",
  mango: "/images/flavour-mango.png",
  vanilla: "/images/flavour-vanilla.png",
  blueberry: "/images/flavour-blueberry.png",
  mint: "/images/flavour-mint.png",
};

/* ========================================
   COMPONENT
======================================== */

function FlavourSelector({
  selectedFlavour,
  onSelect,
}: FlavourSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ========================================
     PREVIOUS / NEXT FLAVOUR
  ======================================== */

  const changeFlavour = (direction: number) => {
    const total = flavours.length;

    if (total === 0) return;

    const nextIndex =
      (selectedFlavour + direction + total) % total;

    onSelect(nextIndex);
  };

  /* ========================================
     SCROLL SELECTED CARD ON MOBILE
  ======================================== */

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    // Desktop always displays all six cards.
    if (window.innerWidth > 700) return;

    const card = container.children[
      selectedFlavour
    ] as HTMLElement | undefined;

    if (!card) return;

    const scrollPosition =
      card.offsetLeft -
      container.offsetLeft -
      (container.clientWidth - card.clientWidth) / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, [selectedFlavour]);

  return (
    <div
      id="flavours"
      className="melto-flavour-selector"
      aria-label="Choose your favourite flavour"
    >

      {/* PREVIOUS ARROW */}

      <button
        type="button"
        className="melto-flavour-arrow melto-flavour-prev"
        aria-label="Previous flavour"
        onClick={() => changeFlavour(-1)}
      >
        <ChevronLeft size={23} strokeWidth={2.5} />
      </button>

      {/* SIX FLAVOUR CARDS */}

      <div
        ref={scrollRef}
        className="melto-flavour-list"
      >
        {flavours.map((flavour, index) => {
          const isSelected =
            selectedFlavour === index;

          const ingredientImage =
            ingredientImages[
              flavour.name.toLowerCase().trim()
            ] ?? flavour.image;

          return (
            <button
              type="button"
              key={flavour.name}
              className={`melto-flavour-card ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => onSelect(index)}
              aria-pressed={isSelected}
              aria-label={`Select ${flavour.name} flavour`}
            >

              {/* INGREDIENT IMAGE */}

              <span className="melto-flavour-image-wrap">
                <img
                  src={ingredientImage}
                  alt=""
                  className="melto-flavour-image"
                  draggable={false}
                />
              </span>

              {/* FLAVOUR NAME */}

              <span className="melto-flavour-name">
                {flavour.name}
              </span>

            </button>
          );
        })}
      </div>

      {/* NEXT ARROW */}

      <button
        type="button"
        className="melto-flavour-arrow melto-flavour-next"
        aria-label="Next flavour"
        onClick={() => changeFlavour(1)}
      >
        <ChevronRight size={23} strokeWidth={2.5} />
      </button>

    </div>
  );
}

export default FlavourSelector;
