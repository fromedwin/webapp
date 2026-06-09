/**
 * Convert hex (#RRGGBB) to HSL components for shadcn CSS variables ("H S% L%").
 * Matches ShellUI theme format.
 */
export function hexToHsl(hexString) {
  if (!hexString || typeof hexString !== 'string') {
    return hexString;
  }

  if (!hexString.match(/^#?[0-9A-Fa-f]{6}$/)) {
    return hexString;
  }

  const hex = hexString.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return hexString;
  }

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / d + 2) / 6;
        break;
      default:
        h = ((rNorm - gNorm) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

const COLOR_VAR_MAP = [
  ['--background', 'background'],
  ['--foreground', 'foreground'],
  ['--card', 'card'],
  ['--card-foreground', 'cardForeground'],
  ['--popover', 'popover'],
  ['--popover-foreground', 'popoverForeground'],
  ['--primary', 'primary'],
  ['--primary-foreground', 'primaryForeground'],
  ['--secondary', 'secondary'],
  ['--secondary-foreground', 'secondaryForeground'],
  ['--muted', 'muted'],
  ['--muted-foreground', 'mutedForeground'],
  ['--accent', 'accent'],
  ['--accent-foreground', 'accentForeground'],
  ['--destructive', 'destructive'],
  ['--destructive-foreground', 'destructiveForeground'],
  ['--border', 'border'],
  ['--input', 'input'],
  ['--ring', 'ring'],
  ['--sidebar-background', 'sidebarBackground'],
  ['--sidebar-foreground', 'sidebarForeground'],
  ['--sidebar-primary', 'sidebarPrimary'],
  ['--sidebar-primary-foreground', 'sidebarPrimaryForeground'],
  ['--sidebar-accent', 'sidebarAccent'],
  ['--sidebar-accent-foreground', 'sidebarAccentForeground'],
  ['--sidebar-border', 'sidebarBorder'],
  ['--sidebar-ring', 'sidebarRing'],
];

function loadThemeFonts(appearance) {
  const head = document.head;
  head.querySelectorAll('[data-shellui-theme-font]').forEach((node) => node.remove());

  appearance.fontFiles?.forEach((fontFile, index) => {
    if (fontFile.includes('fonts.googleapis.com') || fontFile.endsWith('.css')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontFile;
      link.setAttribute('data-shellui-theme-font', appearance.name ?? 'theme');
      head.appendChild(link);
      return;
    }

    const style = document.createElement('style');
    style.setAttribute('data-shellui-theme-font', appearance.name ?? 'theme');
    const fontName = `ThemeFont-${appearance.name ?? 'theme'}-${index}`;
    style.textContent = `@font-face { font-family: '${fontName}'; src: url('${fontFile}') format('woff2'); }`;
    head.appendChild(style);
  });
}

/**
 * Apply ShellUI appearance settings to the document for shadcn/ui CSS variables.
 */
export function applyShellAppearance(appearance) {
  if (!appearance || typeof document === 'undefined') {
    return;
  }

  const mode = appearance.mode === 'dark' ? 'dark' : 'light';
  const colors = appearance.colors?.[mode] ?? appearance.colors?.light;

  document.documentElement.classList.toggle('dark', mode === 'dark');

  if (!colors) {
    return;
  }

  const root = document.documentElement;

  for (const [cssVar, colorKey] of COLOR_VAR_MAP) {
    const value = colors[colorKey];
    if (value) {
      root.style.setProperty(cssVar, hexToHsl(value));
    }
  }

  if (colors.radius) {
    root.style.setProperty('--radius', colors.radius);
  }

  if (appearance.bodyFontFamily || appearance.fontFamily) {
    root.style.fontFamily = appearance.bodyFontFamily ?? appearance.fontFamily;
  }

  if (appearance.headingFontFamily) {
    root.style.setProperty('--font-heading', appearance.headingFontFamily);
  }

  loadThemeFonts(appearance);
}
