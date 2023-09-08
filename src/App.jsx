import { Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";

import Form from "./components/Form";
import HomePage from "./page/HomePage";
import Pricing from "./page/Pricing";
import Product from "./page/Product";
import PageNotFound from "./page/PageNotFound";
import Login from "./page/Login";
import AppLayout from "./page/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./page/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
