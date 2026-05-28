import { type ShellUIConfig } from '@shellui/core';
import urls from '@shellui/core/constants/urls';

const config: ShellUIConfig = {
  port: 4000,
  title: 'My App',
  favicon: '/favicon.svg',
  logo: '/logo.svg',
  layout: 'sidebar',
  language: 'en',
  start_url: '/home',
  backend: {
    type: 'shellui',
    url: 'https://id.shellui.com',
    companyId: 3,
    login: {
      methods: ['oauth'],
      oauthProviders: ['github'],
    },
  },
  navigation: [
    {
      label: 'Home',
      path: 'home',
      url: '/',
      requiresAuth: true,
    },
    {
      label: 'Settings',
      path: 'settings',
      url: urls.settings,
      openIn: 'modal',
      position: 'end',
      requiresAuth: true,
    },
  ],
};

export default config;
