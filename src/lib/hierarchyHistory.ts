/**
 * Keeps browser history aligned with the breadcrumb hierarchy
 * (certifications > certification > study mode).
 *
 * Each history entry stores the trail of in-site entries beneath it. Going to a
 * page already in that trail rewinds history, moving sideways or up replaces the
 * current entry, and only drilling down pushes a new one. So home > bank > quiz >
 * bank > review followed by Back twice lands on home rather than the quiz, and
 * Forward retraces the same path.
 */

const STATE_KEY = 'hierarchyTrail';
const PENDING_KEY = 'hierarchy-nav-pending';
const PENDING_TTL_MS = 10_000;

interface PendingNavigation {
    to: string;
    trail: string[];
    at: number;
}

const normalisePath = (pathname: string) =>
    pathname.endsWith('/') ? pathname : `${pathname}/`;

const readTrail = (): string[] => {
    const trail = window.history.state?.[STATE_KEY];
    return Array.isArray(trail) ? trail : [];
};

const readPending = (): PendingNavigation | null => {
    try {
        return JSON.parse(
            window.sessionStorage.getItem(PENDING_KEY) ?? 'null'
        ) as PendingNavigation | null;
    } catch {
        return null;
    }
};

/** Stamps the current entry with its trail; reloads and Back/Forward keep the existing one. */
const initHierarchyHistory = () => {
    const state = window.history.state ?? {};
    if (Array.isArray(state[STATE_KEY])) {
        return;
    }
    const pending = readPending();
    window.sessionStorage.removeItem(PENDING_KEY);
    const trail =
        pending &&
        pending.to === normalisePath(window.location.pathname) &&
        Date.now() - pending.at < PENDING_TTL_MS
            ? pending.trail
            : [];
    window.history.replaceState({ ...state, [STATE_KEY]: trail }, '');
};

/** Navigates to an in-site URL following the breadcrumb history rules. */
export const navigateInHierarchy = (href: string) => {
    const url = new URL(href, window.location.href);
    const target = normalisePath(url.pathname);
    const current = normalisePath(window.location.pathname);
    const trail = readTrail();

    const trailIndex =
        !url.search && !url.hash ? trail.lastIndexOf(target) : -1;
    if (trailIndex >= 0) {
        window.history.go(trailIndex - trail.length);
        return;
    }

    const descends = target !== current && target.startsWith(current);
    const pending: PendingNavigation = {
        to: target,
        trail: descends ? [...trail, current] : trail,
        at: Date.now(),
    };
    window.sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));
    if (descends) {
        window.location.assign(url.href);
    } else {
        window.location.replace(url.href);
    }
};

const isPlainInSiteClick = (event: MouseEvent, anchor: HTMLAnchorElement) => {
    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (anchor.target && anchor.target !== '_self') ||
        anchor.hasAttribute('download')
    ) {
        return false;
    }
    const url = new URL(anchor.href);
    if (
        url.origin !== window.location.origin ||
        !url.pathname.startsWith(import.meta.env.BASE_URL)
    ) {
        return false;
    }
    return !(url.pathname === window.location.pathname && url.hash);
};

export const installHierarchyHistory = () => {
    initHierarchyHistory();
    document.addEventListener('click', event => {
        const anchor = (event.target as Element | null)?.closest?.(
            'a[href]'
        ) as HTMLAnchorElement | null;
        if (!anchor || !isPlainInSiteClick(event, anchor)) {
            return;
        }
        event.preventDefault();
        navigateInHierarchy(anchor.href);
    });
};
