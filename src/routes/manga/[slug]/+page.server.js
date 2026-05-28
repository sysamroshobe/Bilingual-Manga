import { error } from '@sveltejs/kit';
import db from '$lib/db';
import { ObjectId } from 'mongodb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url, parent }) {
  const { meta } = await parent();
  const allTitles = db.manga_metadata?.[0]?.manga_titles ?? [];
  let id = params.slug;
  const metarr = meta[0].manga_titles;
  let matchedTitle = null;

  let resolvedLang = url.searchParams.get('lang');

  for (const element of metarr) {
    if ('enslug' in element && 'jpslug' in element) {
      const tempe = decodeURI(element.enslug);
      const tempej = decodeURI(element.jpslug);

      if (tempe === id) {
        id = `${element.enid}`;
        resolvedLang = resolvedLang ?? 'en';
        matchedTitle = element;
      } else if (tempej === id) {
        id = `${element.enid}`;
        resolvedLang = resolvedLang ?? 'jp';
        matchedTitle = element;
      }
    }
  }

  if (!ObjectId.isValid(id)) {
    throw error(404, 'Not found');
  }

  const man = db.manga_data;
  let mangaRow = null;

  for (const m_id in man) {
    const m_idel = man[m_id];
    const oid = m_idel._id?.$oid;
    if (oid === id) {
      mangaRow = m_idel;
      break;
    }
  }

  if (!mangaRow) {
    // If metadata has the title but chapter payload is missing, show a clear message page.
    const fallbackTitle = matchedTitle ?? allTitles.find((element) => element.enid === id) ?? null;
    if (fallbackTitle) {
      return {
        p: id,
        l: resolvedLang ?? 'en',
        missingData: true,
        missingTitle: fallbackTitle
      };
    }
    throw error(404, 'Not found');
  }

  const chen = url.searchParams.get('chen');
  const chjp = url.searchParams.get('chjp');
  const enp = url.searchParams.get('enp');
  const jpp = url.searchParams.get('jpp');

  let ipfsss = '';
  const aa1 = await fetch(`${meta[0].cdn1}/json/dw.json`);
  const aa2 = await aa1.json();
  const pm = aa2.pm ?? [];

  if (pm.includes(id)) {
    ipfsss = meta[0].ipfsgate1;
  } else {
    const gates = meta[0].ipfsgate;
    ipfsss = Array.isArray(gates) ? gates[0] : gates;
  }

  return {
    p: id,
    l: resolvedLang ?? 'en',
    chen,
    chjp,
    enp,
    jpp,
    manga_data: mangaRow,
    ipfs: ipfsss
  };
}
