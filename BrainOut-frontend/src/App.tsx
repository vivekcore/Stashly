import { Provider } from "react-redux";
import HomePage from "./componentss/pages/HomePage";
import { ThemeProvider } from "./componentss/themeprovider";
import { store } from "./app/store";
import { BrowserRouter, Route, Routes } from "react-router";
import SignUp from "./componentss/pages/SignUp";
import SignIn from "./componentss/pages/SignIn";
import Youtube from "./componentss/pages/sidebarPages/Youtube";
import Twitter from "./componentss/pages/sidebarPages/Twitter";
import LinkedIn from "./componentss/pages/sidebarPages/LinkedIn";
import DisplayCards from "./componentss/pages/sidebarPages/Dashboard";
import TextEditor from "./componentss/pages/sidebarPages/TextEditor";

function App() {
  return (
    <div className="bg-background">
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route path="youtube" element={<Youtube />} />
              <Route path="twitter" element={<Twitter />} />
              <Route path="linkedin" element={<LinkedIn />} />
              <Route path="dashboard" element={<DisplayCards />} />
              <Route path="text-editor" element={<TextEditor />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
    </div>
  );
}

export default App;
