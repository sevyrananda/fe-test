import { getFromLocalStorage, saveToLocalStorage } from "./localStorageHelper";

export const getDefaultTheme = () => {
  const savedTheme = getFromLocalStorage("theme", "system");
  if (savedTheme === "dark") return "dark";
  if (savedTheme === "light") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (theme) => {
  document.documentElement.classList.remove("light", "dark");
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.add(prefersDark ? "dark" : "light");
  } else {
    document.documentElement.classList.add(theme);
  }
  saveToLocalStorage("theme", theme);
};
