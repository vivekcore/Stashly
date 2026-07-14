import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "@/app/store";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import { Analytics } from "@vercel/analytics/react";

import { ProtectedLayout } from "@/features/shell/components/protected-layout";
import { ThemeProvider } from "@/shared/theme/theme-provider";
import ContentPage from "@/features/content/pages/content-page";
import EditorPage from "@/features/editor/pages/editor-page";
import LandingPage from "@/features/marketing/pages/landing-page";
import SharedContentPage from "@/features/content/pages/shared-content-page";
import AuthPage from "@/features/auth/pages/auth-page";
import SignIn from "@/features/auth/pages/signin-page";
import SignUp from "@/features/auth/pages/signup-page";
import EmailVerification from "@/features/auth/components/EmailVerificationSent";
import ForgotPassword from "@/features/auth/pages/forget-password";
import ChangePassword from "@/features/auth/pages/reset-password";
import { SessionProvider } from "@/context/SessionProvider";

function AppRouter() {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <HashRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />}>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="email-verify" element={<EmailVerification />} />
                <Route path="forget-password" element={<ForgotPassword />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>

              <Route path="/shared/:slug" element={<SharedContentPage />} />
              <Route path="/home" element={<ProtectedLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route
                  path="dashboard"
                  element={
                    <ContentPage
                      title="Dashboard"
                      description="All saved content in one place, regardless of source."
                      filter="all"
                    />
                  }
                />
                <Route
                  path="youtube"
                  element={
                    <ContentPage
                      title="Youtube"
                      description="Video links grouped in a single, consistent view."
                      filter="youtube"
                    />
                  }
                />
                <Route
                  path="twitter"
                  element={
                    <ContentPage
                      title="Twitter"
                      description="Tweets and threads without the old duplicated page wrappers."
                      filter="twitter"
                    />
                  }
                />
                <Route
                  path="linkedin"
                  element={
                    <ContentPage
                      title="LinkedIn"
                      description="Professional posts collected in the same layout as everything else."
                      filter="linkedin"
                    />
                  }
                />
                <Route path="text-editor" element={<EditorPage />} />
              </Route>
            </Routes>
          </HashRouter>
          <ToastContainer position="bottom-right" />
        </ThemeProvider>
      </SessionProvider>
      <Analytics />
    </Provider>
  );
}

export default AppRouter;
