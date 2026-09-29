/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const palette = {
  text: '#f5f7f4',
  tint: '#b8f23a',
  background: '#0c0f0d',
  foreground: '#f5f7f4',
  card: '#151a17',
  cardForeground: '#f5f7f4',
  primary: '#b8f23a',
  primaryForeground: '#0c0f0d',
  secondary: '#202721',
  secondaryForeground: '#dbe5d9',
  muted: '#1b211d',
  mutedForeground: '#8f9b91',
  accent: '#25301f',
  accentForeground: '#c9f878',
  destructive: '#ff6b6b',
  destructiveForeground: '#fff7f7',
  border: '#2a342c',
  input: '#202921',
};

const colors: { light: typeof palette; dark: typeof palette; radius: number } = {
  light: palette,
  dark: palette,
  radius: 18,
};

export default colors;
