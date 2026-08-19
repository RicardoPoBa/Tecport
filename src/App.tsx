import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { QuienesSomosPage } from "./pages/QuienesSomosPage";
import { ServiciosPage } from "./pages/ServiciosPage";
import { ContactoPage } from "./pages/ContactoPage";
import { RequestQuotePage } from "./pages/RequestQuotePage";
import { ServiceLandingPage } from "./pages/ServiceLandingPage";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quienes_somos" element={<QuienesSomosPage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/request-quote" element={<RequestQuotePage />} />

        <Route path="/productos/:categorySlug" element={<CategoryPage />} />
        <Route path="/productos/:categorySlug/:productSlug" element={<ProductDetailPage />} />

        <Route path="/:slug" element={<ServiceLandingPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
