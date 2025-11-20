import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import fr from "./fr.json";
import mg from "./mg.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  mg: { translation: mg },
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18n;
