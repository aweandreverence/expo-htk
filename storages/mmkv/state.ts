import type { MMKVConfiguration } from 'react-native-mmkv';
import { Platform } from 'react-native';

type MMKVInstance = {
    getString: (key: string) => string | undefined;
    set: (key: string, value: string) => void;
    delete: (key: string) => void;
    clearAll: () => void;
};

type MMKVModule = {
    MMKV: new (configuration?: MMKVConfiguration) => MMKVInstance;
};

function isMacLikeIOSRuntime(): boolean {
    if (Platform.OS !== 'ios') {
        return false;
    }

    const platform = Platform as typeof Platform & {
        isMacCatalyst?: boolean;
        constants?: { systemName?: string; isMacCatalyst?: boolean };
    };

    return (
        platform.isMacCatalyst === true ||
        platform.constants?.isMacCatalyst === true ||
        platform.constants?.systemName === 'macOS'
    );
}

function loadMMKVModule(): MMKVModule | null {
    try {
        return require('react-native-mmkv') as MMKVModule;
    } catch (e) {
        console.warn('[MMKV] Failed to load module, using in-memory fallback:', e);
        return null;
    }
}

/**
 * Creates an instance of MMKV state storage with optional configuration.
 * Lazy-initializes MMKV to avoid crashes during module loading.
 * Falls back to in-memory storage if MMKV is unavailable.
 */
export function createMMVKStateStorage(configuration?: MMKVConfiguration) {
    let storage: MMKVInstance | null = null;
    let initFailed = false;
    const fallback = new Map<string, string>();

    function getStorage(): MMKVInstance | null {
        if (initFailed || isMacLikeIOSRuntime()) return null;
        if (!storage) {
            const mmkvModule = loadMMKVModule();
            if (!mmkvModule) {
                initFailed = true;
                return null;
            }

            try {
                storage = new mmkvModule.MMKV(configuration);
            } catch (e) {
                console.warn('[MMKV] Failed to initialize, using in-memory fallback:', e);
                initFailed = true;
                return null;
            }
        }
        return storage;
    }

    return {
        getItem: (key: string): string | null => {
            const s = getStorage();
            if (s) return s.getString(key) ?? null;
            return fallback.get(key) ?? null;
        },
        setItem: (key: string, value: string): void => {
            const s = getStorage();
            if (s) s.set(key, value);
            else fallback.set(key, value);
        },
        removeItem: (key: string): void => {
            const s = getStorage();
            if (s) s.delete(key);
            else fallback.delete(key);
        },
        clearAll: (): void => {
            const s = getStorage();
            if (s) s.clearAll();
            else fallback.clear();
        },
    };
}
