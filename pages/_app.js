import "@/styles/globals.css";
import { useRouter } from "next/router";
import { lato } from "../lib/fonts";
import { useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { getSiteSettings } from "@/lib/sanity-utils";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const gtmLoadedRef = useRef(false);
  const lastPushedPath = useRef(null);
  const lastPushedTime = useRef(0);

  // Normalize paths for consistent dedieszcz: Normalize URL paths to prevent duplicates
  const normalizePath = (path) => {
    // Remove query parameters and trailing slashes, convert to lowercase
    return path.split("?")[0].replace(/\/$/, "").toLowerCase();
  };

  // Push a page_view event, with deduplication
  const pushPageView = useCallback(
    (path) => {
      const now = Date.now();
      const normalizedPath = normalizePath(path);

      // Dedupe: skip if same path or too soon (within 500ms)
      if (
        lastPushedPath.current === normalizedPath ||
        now - lastPushedTime.current < 500
      ) {
        console.debug("[GTM] Skipped duplicate page_view for", path);
        return;
      }

      // Push to dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_location: window.location.href,
        page_path: path,
        page_title: document.title,
      });

      console.log("[GTM] page_view →", path);
      lastPushedPath.current = normalizedPath;
      lastPushedTime.current = now;
    },
    []
  );

  // Cache iOS Safari detection to avoid repeated checks
const isIOSSafari = typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream &&
  /Safari/i.test(navigator.userAgent);

useLayoutEffect(() => {
  // Disable Safari’s auto-restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const scrollToTop = () => {
    // Unified scroll reset
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // iOS Safari specific fix for URL bar
    if (isIOSSafari) {
      setTimeout(() => {
        window.scrollTo({ top: 1, behavior: 'auto' });
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }, 10);
      }, 0);
    }
  };

  const handleRouteChange = () => {
    scrollToTop();
    // Next-frame nudge for reliability
    requestAnimationFrame(scrollToTop);

    // Fast retries for iOS Safari to handle URL bar settling
    if (isIOSSafari) {
      const retryTimer = setTimeout(() => {
        scrollToTop();
        setTimeout(scrollToTop, 100); // Second retry
      }, 50);
      return () => clearTimeout(retryTimer);
    }
  };

  // Listen and fire immediately
  router.events.on('routeChangeComplete', handleRouteChange);
  handleRouteChange();

  return () => {
    router.events.off('routeChangeComplete', handleRouteChange);
  };
}, [router.events]);


  useEffect(() => {
    if (gtmLoadedRef.current || typeof window === "undefined") return;

    const events = ["click", "scroll", "mousemove", "keydown", "touchstart"];

    const onFirstInteraction = () => {
      if (gtmLoadedRef.current) return;
      gtmLoadedRef.current = true;

      events.forEach((e) =>
        document.removeEventListener(e, onFirstInteraction, { passive: true })
      );

      console.log("[GTM] Loading GTM...");

      window.dataLayer = window.dataLayer || [];

      // Explicitly disable built-in GTM history listener
      window.dataLayer.push({
        "gtm.start": Date.now(),
        event: "gtm.js",
        "gtm.historyChange": false, // Explicitly prevent auto-history handling
      });

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      script.onload = () => {
        console.log("[GTM] Container loaded");
        if (!lastPushedPath.current) {
          pushPageView(router.asPath);
        }
      };

      document.head.appendChild(script);
    };

    events.forEach((e) =>
      document.addEventListener(e, onFirstInteraction, {
        once: true,
        passive: true,
      })
    );

    return () => {
      if (!gtmLoadedRef.current) {
        events.forEach((e) =>
          document.removeEventListener(e, onFirstInteraction, { passive: true })
        );
      }
    };
  }, [router.asPath, pushPageView]);

  // Apply the lato font class to the entire app
  return (
    <div className={lato.className}>
      <Component {...pageProps} />
    </div>
  );
}