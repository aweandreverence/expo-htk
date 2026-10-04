# Persisted state

`persisted.ts` creates Jotai persisted-state atoms using the shared storage
adapters. MMKV configuration follows the installed constructor type rather than
a version-specific exported name. Runtime keys and default values are unchanged.
Validate through the consuming app's TypeScript checks and native persistence QA.
