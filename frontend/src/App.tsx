import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./app/store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { ProtectedLayout } from "@/components/layout/protected-layout";
import { ThemeProvider } from "@/components/theme-provider";
import ContentPage from "@/pages/content-page";
import EditorPage from "@/pages/editor-page";
import LandingPage from "@/pages/landing-page";
import SignInPage from "@/pages/sign-in-page";
import SignUpPage from "@/pages/sign-up-page";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <BrowserRouter basename="/Stashly">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/home" element={<ProtectedLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route
                path="dashboard"
                element={
                  <ContentPage
                    title="Dashboard"
                    description="All saved content in one place, regardless of source."
                    filter="Other"
                  />
                }
              />
              <Route
                path="youtube"
                element={
                  <ContentPage
                    title="Youtube"
                    description="Video links grouped in a single, consistent view."
                    filter="Youtube"
                  />
                }
              />
              <Route
                path="twitter"
                element={
                  <ContentPage
                    title="Twitter"
                    description="Tweets and threads without the old duplicated page wrappers."
                    filter="Twitter"
                  />
                }
              />
              <Route
                path="linkedin"
                element={
                  <ContentPage
                    title="LinkedIn"
                    description="Professional posts collected in the same layout as everything else."
                    filter="Linkedin"
                  />
                }
              />
              <Route path="text-editor" element={<EditorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-right" />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
