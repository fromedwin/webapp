import { type ShellUIConfig } from "@shellui/core";
import urls from "@shellui/core/constants/urls";

declare const process: { env: Record<string, string | undefined> };

const isBuild =
  process.env.NODE_ENV === "production" ||
  process.env.SHELLUI_BUILD === "true";

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
  layout: "sidebar",
  language: "en",
  start_url: "",
  backend: {
    type: "shellui",
    url: "https://id.shellui.com",
    adminUrl: "https://admin.shellui.com",
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
      label: "Settings",
      path: "settings",
      url: urls.settings,
      openIn: "modal",
      position: "end",
      requiresAuth: true,
    },
  ],
};

export default config;
