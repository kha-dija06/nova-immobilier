import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import ScrollToTop from "@/components/layout/ScrollToTop";
import AppRoutes from "@/routes/AppRoutes";

export default function App() {
  return (
    // reducedMotion="user" fait respecter automatiquement prefers-reduced-motion
    // à TOUTES les animations Framer Motion du site (Hero, Navbar mobile, et
    // les futures sections), sans avoir à vérifier la préférence partout.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </MotionConfig>
  );
}
