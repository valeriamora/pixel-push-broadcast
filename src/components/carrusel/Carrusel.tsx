import { useState, useEffect, useCallback } from "react";
import "./styles/Carrusel.css";
import ctaData from "./data/cta-data.json";

interface CTAItem {
  type: "text" | "link" | "image";
  content: string;
  duration?: number;
  theme?: "default" | "pink" | "blue" | "dark";
  animation?: "fade" | "slide" | "zoom" | "bounce";
  highlightStyle?: "pulse" | "glow" | "wave";
}

interface GlobalSettings {
  rotationInterval?: number;
  fontScale?: number;
  cornerPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

interface CTAData {
  ctaItems: CTAItem[];
  globalSettings?: GlobalSettings;
}

export function Carrusel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const data = ctaData as CTAData;
  const currentItem = data.ctaItems[currentIndex];
  const settings = data.globalSettings || {};
  
  const duration = currentItem.duration || settings.rotationInterval || 5;
  const position = settings.cornerPosition || "top-left";
  const theme = currentItem.theme || "default";
  const animation = currentItem.animation || "fade";
  const highlightStyle = currentItem.highlightStyle;
  const fontScale = settings.fontScale || 1;

  // Move to next item
  const nextItem = useCallback(() => {
    setIsExiting(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % data.ctaItems.length);
      setIsExiting(false);
      setProgress(0);
    }, 600); // Match animation duration
  }, [data.ctaItems.length]);

  // Progress bar animation
  useEffect(() => {
    if (isExiting) return;

    const interval = 50; // Update every 50ms
    const increment = (100 / (duration * 1000)) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, duration, isExiting]);

  // Auto-advance timer
  useEffect(() => {
    if (isExiting) return;

    const timer = setTimeout(() => {
      nextItem();
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, duration, nextItem, isExiting]);

  // Get animation class
  const getAnimationClass = () => {
    if (isExiting) {
      return `animation-${animation}-out`;
    }
    return `animation-${animation}-in`;
  };

  // Get highlight class
  const getHighlightClass = () => {
    if (currentItem.type === "link" && highlightStyle) {
      return `highlight-${highlightStyle}`;
    }
    return "";
  };

  return (
    <div className="carrusel-container">
      <div className="carrusel-background" />
      
      <div
        className={`cta-overlay ${position} theme-${theme} ${getAnimationClass()} ${
          currentItem.type === "link" && highlightStyle ? `highlight-${highlightStyle}` : ""
        }`}
        style={{
          fontSize: `${fontScale}rem`,
        }}
      >
        <div className={`cta-content type-${currentItem.type} ${getHighlightClass()}`}>
          {currentItem.type === "image" ? (
            <img src={currentItem.content} alt="CTA" />
          ) : (
            currentItem.content
          )}
        </div>
        
        <div
          className="cta-progress"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Debug info (optional - remove in production) */}
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          zIndex: 200,
        }}
      >
        {currentIndex + 1} / {data.ctaItems.length} • {currentItem.type} • {theme}
      </div>
    </div>
  );
}
