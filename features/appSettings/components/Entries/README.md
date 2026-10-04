# Settings entries

Project-owned React Native/UI Lib controls used by shared app-settings and theme
screens. `Base.tsx` renders a labeled row; its press handler is optional because
some controls supply their own interaction. `FontFamily.tsx` measures a native
View to position the font picker. Switch and other variants compose Base.

These are shared source components, not generated assets. Type-check through a
consuming Expo app so its installed React Native/UI Lib versions are used.
Settings-screen native smoke checks provide runtime verification. Declarations
must reflect nullable refs and wrapper-owned handlers without changing behavior.
