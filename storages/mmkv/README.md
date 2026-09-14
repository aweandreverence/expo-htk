# MMKV state adapter

`state.ts` adapts the consuming app's installed MMKV to Jotai string storage.
Configuration is inferred from the constructor so MMKV 2 and 3 consumers can
share this adapter. This type-only compatibility change does not rename stores,
move files, alter keys, or add a migration. MMKV 3 is required for the current
Awesome.Bible React Native New Architecture build; older consumers stay pinned
until their own native checks pass. The existing in-memory fallback is not
persistent storage and must not be treated as successful native persistence.

Verify in the consuming app with TypeScript checks plus native write/relaunch
checks; Jest's MMKV mock cannot verify native initialization or disk persistence.
Upstream: https://github.com/margelo/react-native-mmkv/blob/main/README_V3.md
