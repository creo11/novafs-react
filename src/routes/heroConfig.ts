import type { UIMatch } from "react-router-dom";

import aboutImage from "../assets/about/skyline.jpeg";
import contactImage from "../assets/contact/contact.jpeg";
import homeImage from "../assets/home/sf-skyline-nova.jpg";
import servicesImage from "../assets/services/servicesHero.jpeg";

export type HeroConfig = {
  pageName: string;
  heroText: string;
  height: number;
  image: string;
};

export type HeroHandle = {
  hero: HeroConfig;
};

export const ROUTE_HEROES = {
  home: {
    pageName: "home",
    heroText:
      "Trusted Cleaning & Maintenance for HOAs, Apartments & Commercial Spaces",
    height: 700,
    image: homeImage,
  },
  about: {
    pageName: "about",
    heroText: "About Us",
    height: 500,
    image: aboutImage,
  },
  services: {
    pageName: "services",
    heroText: "Services",
    height: 500,
    image: servicesImage,
  },
  contact: {
    pageName: "contact",
    heroText: "Contact",
    height: 500,
    image: contactImage,
  },
} as const satisfies Record<string, HeroConfig>;

export function getHeroFromMatches(matches: UIMatch[]): HeroConfig | undefined {
  const match = [...matches].reverse().find((m) => (m.handle as HeroHandle | undefined)?.hero);
  return (match?.handle as HeroHandle | undefined)?.hero;
}
