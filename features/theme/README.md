# Shared Expo theme

Project-owned theme helpers map UI Lib design tokens to React Navigation and
persist the selected light/dark scheme. `index.tsx` exposes the factory/hooks;
`utils.ts` builds the palette and navigation theme; `components/` contains the
settings control.

Navigation themes extend the installed library's `DefaultTheme` or `DarkTheme`,
then override app colors. Preserve the rest of the base theme, including the font
roles required by React Navigation 7. A colors-only object can crash drawer items.

This repository is consumed as an app submodule and has no standalone package or
test runner. Verify against the consuming app's installed navigation version;
check light/dark font roles and palette overrides, then launch its native drawer.
Awesome.Bible's `src/features/theme/navigationTheme.test.ts` covers this integration.

SPEAR review: scope affected consumers, patch the shared mapping, assess both
schemes and native startup, and resolve with explicit consumer adoption/QA status.
This patch does not change persisted preferences or select fonts for reader text.
