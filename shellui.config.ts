import { type ShellUIConfig } from '@shellui/core';
import urls from '@shellui/core/constants/urls';

const config: ShellUIConfig = {
  port: 4000,
  title: 'My App',
  favicon: '/favicon.svg',
  logo: '/logo.svg',
  layout: 'sidebar',
  language: 'en',
  navigation: [
    {
      label: 'Home',
      path: 'home',
      url: '/',
    },
    {
      label: 'Settings',
      path: 'settings',
      url: urls.settings,
      openIn: 'modal',
      position: 'end',
    },
  ],
};

export default config;
