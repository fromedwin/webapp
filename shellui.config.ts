import { type ShellUIConfig } from "@shellui/core";
import urls from "@shellui/core/constants/urls";

declare const process: { env: Record<string, string | undefined> };

const isBuild =
  process.env.NODE_ENV === "production" || process.env.SHELLUI_BUILD === "true";

const appUrl =
  process.env.SHELLUI_APP_URL ??
  (isBuild
    ? "/app/"
    : `http://localhost:${process.env.SHELLUI_APP_PORT || "5173"}`);

const config: ShellUIConfig = {
  port: 4000,
  title: "FromEdwin",
  favicon: "/favicon.svg",
  logo: "/logo.svg",
  layout: "fullscreen",
  language: ["en", "fr"],
  start_url: "",
  backend: {
    type: "shellui",
    url: process.env.SHELLUI_JWT_ORIGIN ?? "https://id.shellui.com",
    adminPathname: urls.admin,
    companyId: process.env.SHELLUI_BUILD === "true" ? 3 : 1,
    login: {
      methods: ["oauth"],
      oauthProviders: ["github"],
    },
  },
  navigation: [
    {
      label: "FromEdwin",
      path: "",
      url: `${appUrl.replace(/\/$/, "")}/`,
      requiresAuth: true,
    },
    {
      label: { en: "Payments", fr: "Paiements" },
      path: "payments",
      url: `${appUrl.replace(/\/$/, "")}/settings/payments`,
      settings: `${appUrl.replace(/\/$/, "")}/settings/payments`,
      icon: "/icons/payments.svg",
      hidden: true,
      requiresAuth: true,
    },
    {
      label: { en: "Settings", fr: "Paramètres" },
      path: "settings",
      url: urls.settings,
      openIn: "modal",
      position: "end",
      requiresAuth: true,
    },
  ],
};

export default config;
