import { useEffect, useRef, useState } from "react";

import type { HeroConfig } from "../../routes/heroConfig";

import "./NovaHero.less";

const IMAGE_FADE_MS = 200;

const CERTIFICATIONS = [
  { src: "/src/assets/home/certifications/ahca-premier-provider-award-2023.png", alt: "AHCA Premier Provider Award 2023" },
  { src: "/src/assets/home/certifications/ahca-covid.png", alt: "AHCA COVID certification" },
  { src: "/src/assets/home/certifications/ahca-phc.png", alt: "AHCA PHC certification" },
  { src: "/src/assets/home/certifications/ahca-registered-partner.png", alt: "AHCA registered partner" },
] as const;

type NovaHeroProps = {
  hero: HeroConfig;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isSameHero(a: HeroConfig, b: HeroConfig): boolean {
  return (
    a.pageName === b.pageName &&
    a.heroText === b.heroText &&
    a.height === b.height &&
    a.image === b.image
  );
}

export default function NovaHero({ hero }: NovaHeroProps) {
  const [contentHero, setContentHero] = useState(hero);
  const [layerImages, setLayerImages] = useState<[string, string]>([
    hero.image,
    hero.image,
  ]);
  const [layerOpacity, setLayerOpacity] = useState<[number, number]>([1, 0]);
  const [contentOpacity, setContentOpacity] = useState(1);
  const activeLayerRef = useRef(0);
  const skipTransitionRef = useRef(true);
  const layerImagesRef = useRef<[string, string]>([hero.image, hero.image]);
  const committedHeroRef = useRef(hero);

  useEffect(() => {
    if (skipTransitionRef.current) {
      skipTransitionRef.current = false;
      committedHeroRef.current = hero;
      setContentHero(hero);
      const images: [string, string] = [hero.image, hero.image];
      layerImagesRef.current = images;
      setLayerImages(images);
      setLayerOpacity([1, 0]);
      activeLayerRef.current = 0;
      setContentOpacity(1);
      return;
    }

    if (isSameHero(hero, committedHeroRef.current)) {
      return;
    }

    if (prefersReducedMotion()) {
      committedHeroRef.current = hero;
      setContentHero(hero);
      const images: [string, string] = [hero.image, hero.image];
      layerImagesRef.current = images;
      setLayerImages(images);
      setLayerOpacity([1, 0]);
      activeLayerRef.current = 0;
      setContentOpacity(1);
      return;
    }

    const backLayer = 1 - activeLayerRef.current;
    const nextImages: [string, string] = [...layerImagesRef.current];
    nextImages[backLayer] = hero.image;
    layerImagesRef.current = nextImages;
    setLayerImages(nextImages);

    setContentOpacity(0);

    requestAnimationFrame(() => {
      setLayerOpacity(backLayer === 0 ? [1, 0] : [0, 1]);
      activeLayerRef.current = backLayer;
    });

    const contentSwapTimer = setTimeout(() => {
      setContentHero(hero);
      committedHeroRef.current = hero;
      setContentOpacity(1);
    }, IMAGE_FADE_MS);

    return () => clearTimeout(contentSwapTimer);
  }, [hero]);

  const isHome = contentHero.pageName === "home";

  return (
    <section
      id="hero"
      className={`hero-shell ${contentHero.pageName}`}
      style={{ height: hero.height }}
    >
      <div
        className="hero-bg-layer"
        style={{
          backgroundImage: `url(${layerImages[0]})`,
          opacity: layerOpacity[0],
        }}
        aria-hidden
      />
      <div
        className="hero-bg-layer"
        style={{
          backgroundImage: `url(${layerImages[1]})`,
          opacity: layerOpacity[1],
        }}
        aria-hidden
      />

      <div className="center-content" style={{ opacity: contentOpacity }}>
        {isHome ? (
          <>
            <h1>{contentHero.heroText}</h1>
            <div className="certifications">
              {CERTIFICATIONS.map((cert) => (
                <img key={cert.alt} src={cert.src} alt={cert.alt} />
              ))}
            </div>
          </>
        ) : (
          <div className="page-title">
            <h1>{contentHero.heroText}</h1>
          </div>
        )}
      </div>
    </section>
  );
}
