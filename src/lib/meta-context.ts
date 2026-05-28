import { getContext, setContext } from 'svelte';

const META_KEY = Symbol('bm-meta');

/** @typedef {any} MetaPayload */

/** @param {MetaPayload} meta */
export function setMetaContext(meta) {
  setContext(META_KEY, meta);
}

export function getMetaContext() {
  return /** @type {MetaPayload} */ (getContext(META_KEY));
}
