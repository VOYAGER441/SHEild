// App is light-only by design (app.json userInterfaceStyle: "light").
// Following the system dark-mode toggle broke the mixed theming (Gluestack
// dark + custom Colors.ts + hardcoded bg-white classes), so this hook is
// pinned to light until a real dark theme is designed. Every screen should
// import useColorScheme from here — not from react-native directly.
// Return type stays compatible with the original react-native hook so
// existing `=== 'dark'` comparisons keep compiling.
export function useColorScheme(): 'light' | 'dark' | null {
  return 'light';
}
