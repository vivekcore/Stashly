import { Button } from "@/components/tiptap-ui-primitive/button";

// --- Icons ---
import { MoonStarIcon } from "@/components/tiptap-icons/moon-star-icon";
import { SunIcon } from "@/components/tiptap-icons/sun-icon";
import { useTheme } from "@/componentss/themeprovider";
//import { useEffect, useState } from "react"

export function ThemeToggle() {
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const { theme, setTheme } = useTheme();
  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  //   const handleChange = () => setIsDarkMode(mediaQuery.matches)
  //   mediaQuery.addEventListener("change", handleChange)
  //   return () => mediaQuery.removeEventListener("change", handleChange)
  // }, [])

  // useEffect(() => {
  //   const initialDarkMode =
  //     !!document.querySelector('meta[name="color-scheme"][content="dark"]') ||
  //     window.matchMedia("(prefers-color-scheme: dark)").matches
  //   setIsDarkMode(initialDarkMode)
  // }, [])

  // useEffect(() => {
  //   document.documentElement.classList.toggle("dark", isDarkMode)
  // }, [isDarkMode])

  const toggleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      onClick={toggleDarkMode}
      aria-label={`Switch to ${theme ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <MoonStarIcon className="tiptap-button-icon cursor-pointer" />
      ) : (
        <SunIcon className="tiptap-button-icon cursor-pointer" />
      )}
    </Button>
  );
}
