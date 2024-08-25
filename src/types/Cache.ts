import NodeCache from 'node-cache';

export interface CacheType {}

// Ensure it covers all keys
const CACHE_KEYS: (keyof CacheType)[] = [];

export class MyCache extends NodeCache {
	public constructor(options = {}) {
		super(options);
	}

	public myGet<Key extends keyof CacheType>(key: Key): CacheType[Key] | undefined {
		return super.get(key);
	}

	public mySet<Key extends keyof CacheType>(
		key: Key,
		value: CacheType[Key],
		ttl?: number
	): boolean {
		if (typeof ttl === 'undefined') {
			return super.set(key, value);
		}
		return super.set(key, value, ttl);
	}

	public myHas<Key extends keyof CacheType>(key: Key) {
		return super.has(key);
	}

	public myHasSome<Key extends keyof CacheType>(keys: Key[]) {
		return keys.every((key) => super.has(key));
	}

	public myHasAll() {
		return this.myHasSome(CACHE_KEYS);
	}
}
