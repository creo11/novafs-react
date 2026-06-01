import { Box } from "@mui/material";
import { Outlet, useMatches } from "react-router-dom";

import Footer from "../components/Footer";
import Nav from "../components/Nav";
import NovaHero from "../components/NovaHero";
import ScrollToTop from "../components/ScrollToTop";
import { getHeroFromMatches } from "../routes/heroConfig";

export default function MainLayout() {
  const matches = useMatches();
  const hero = getHeroFromMatches(matches);

  return (
    <Box id="siteWrapper">
      <ScrollToTop />
      <Nav />

      {hero && <NovaHero hero={hero} />}

      <Box component="main" id="mainContent">
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
