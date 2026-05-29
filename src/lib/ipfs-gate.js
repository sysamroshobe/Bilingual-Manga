/** @param {Record<string, unknown> | null | undefined} title */
export function findTitleById(metaRoot, enid) {
  return (metaRoot?.manga_titles ?? []).find((t) => t.enid === enid) ?? null;
}

/** @param {Record<string, unknown>} metaRoot @param {Record<string, unknown> | null | undefined} title */
export function resolveIpfsGate(metaRoot, title, { preferLocal = false } = {}) {
  if (preferLocal && metaRoot?.ipfsgate1) {
    return metaRoot.ipfsgate1;
  }

  const gates = metaRoot?.ipfsgate;
  if (!gates) return '';
  if (!Array.isArray(gates)) return gates;

  const serverIndex = Number(title?.server) || 0;
  return gates[serverIndex] ?? gates[0];
}

export function localIpfsGate(metaRoot) {
  return metaRoot?.ipfsgate1 ?? 'http://localhost:3300/ipfs/%@cid@%';
}

export function remoteIpfsPrefix(gate) {
  return String(gate ?? '').replace('%@cid@%', '');
}

/** @param {string} url */
export function toLocalIpfsPath(url) {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    return `.${parsed.pathname}`;
  } catch {
    return url.startsWith('./') ? url : `./${url.replace(/^\.?\//, '')}`;
  }
}
