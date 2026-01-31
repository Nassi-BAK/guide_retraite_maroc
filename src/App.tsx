import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import AvantRetraite from "./pages/AvantRetraite";
import ApresRetraite from "./pages/ApresRetraite";
import Diagnostic from "./pages/Diagnostic";
import Ressources from "./pages/Ressources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/avant-retraite" element={<AvantRetraite />} />
              <Route path="/apres-retraite" element={<ApresRetraite />} />
              <Route path="/diagnostic" element={<Diagnostic />} />
              <Route path="/ressources" element={<Ressources />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
