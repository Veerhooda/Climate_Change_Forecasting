import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ambientSound } from '../utils/ambientAudio';

gsap.registerPlugin(ScrollTrigger);

/**
 * useHeroScrollTimeline:
 * Drives the Three.js 3D camera trajectory through the 400vh runway.
 *
 * Scroll Snapping: 160ms after scroll stops, the page snaps to the nearest
 * of the 4 stages (Orbit, Stratosphere, Canopy, Surface) using Lenis smooth scroll.
 */

// Stage scroll progress values — derived from Three.js stage Y positions:
// Camera Y = -scroll × 85, so each stage target = stageY / 85
// Stage 1 (Orbit):        Y=0      → scroll = 0
// Stage 2 (Stratosphere): Y=-29.8  → scroll = 29.8/85 = 0.3506
// Stage 3 (Canopy):       Y=-61.4  → scroll = 61.4/85 = 0.7224
// Stage 4 (Surface):      Y=-85    → scroll = 1.0
const STAGE_TARGETS = [0, 0.3506, 0.7224, 1.0];

export const useHeroScrollTimeline = ({
  trackContainerRef,
  viewportRef,
  initialHeroRef,
  narrative1Ref,
  narrative2Ref,
  finalFrameRef,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use a single ref-bag so we never have stale closures or hook-order issues
  const stateRef = useRef({
    lenis: null,
    scrollProgress: 0,
    isSnapping: false,
    snapTimeout: null,
  });

  useEffect(() => {
    const state = stateRef.current;

    // ── Helpers ────────────────────────────────────────────────────────────────
    const getTotalDist = () =>
      (trackContainerRef.current?.offsetHeight ?? 0) - window.innerHeight;

    const snapToStage = (idx) => {
      if (!state.lenis || !trackContainerRef.current) return;
      const clamped = Math.max(0, Math.min(3, idx));
      state.isSnapping = true;
      state.lenis.scrollTo(STAGE_TARGETS[clamped] * getTotalDist(), {
        duration: 1.0,
        easing: (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      });
      // Fallback: always unlock after 2s in case onComplete never fires
      setTimeout(() => { state.isSnapping = false; }, 2000);
    };

    const getNearestStage = (progress) => {
      let best = 0;
      let minDist = Infinity;
      STAGE_TARGETS.forEach((target, i) => {
        const d = Math.abs(progress - target);
        if (d < minDist) { minDist = d; best = i; }
      });
      return best;
    };

    const scheduleSnap = () => {
      if (state.snapTimeout) clearTimeout(state.snapTimeout);
      state.snapTimeout = setTimeout(() => {
        // 800ms: lets Lenis inertia (~400ms) + GSAP scrub lag (~1.1s) both settle
        if (!state.isSnapping) snapToStage(getNearestStage(state.scrollProgress));
      }, 800);
    };

    // ── Lenis ─────────────────────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    state.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tickerCb = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // ── Snap triggers ─────────────────────────────────────────────────────────
    const handleWheel = () => { if (!state.isSnapping) scheduleSnap(); };

    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e) => {
      const delta = Math.abs(touchStartY - e.changedTouches[0].clientY);
      if (delta > 10 && !state.isSnapping) scheduleSnap();
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // ── GSAP / ScrollTrigger ───────────────────────────────────────────────────
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (!trackContainerRef.current || !viewportRef.current) return;

      if (prefersReducedMotion) {
        gsap.set(initialHeroRef.current, { opacity: 1, y: 0 });
        return;
      }

      // Entrance animation
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.headline-line',
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.0, stagger: 0.12, delay: 0.2 })
        .fromTo('.geometric-story-sentence',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
        .fromTo('.act-action-row',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo('.clean-geometric-masthead',
          { opacity: 0 },
          { opacity: 1, duration: 0.9 }, '-=0.8');

      gsap.set(
        [narrative1Ref.current, narrative2Ref.current, finalFrameRef.current],
        { opacity: 0, y: 30, pointerEvents: 'none' }
      );

      // Master scrubbed timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: trackContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: viewportRef.current,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => {
            state.scrollProgress = self.progress;
            setScrollProgress(self.progress);
            ambientSound.updateScrollDepth(self.progress);
          },
        },
      });

      // Act 1 → 2
      masterTl.to(initialHeroRef.current,
        { opacity: 0, y: -40, duration: 1.5, ease: 'power2.in', pointerEvents: 'none' }, 0.2);

      // Act 2: Stratosphere
      masterTl.to(narrative1Ref.current,
        { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' }, 2.0);
      masterTl.to(narrative1Ref.current,
        { opacity: 0, y: -35, duration: 1.2, ease: 'power2.in' }, 3.8);

      // Act 3: Canopy
      masterTl.to(narrative2Ref.current,
        { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' }, 4.6);
      masterTl.to(narrative2Ref.current,
        { opacity: 0, y: -35, duration: 1.2, ease: 'power2.in' }, 6.4);

      // Act 4: Surface
      masterTl.to(finalFrameRef.current,
        { opacity: 1, y: 0, duration: 1.6, ease: 'power2.out', pointerEvents: 'auto' }, 7.2);
    }, trackContainerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(tickerCb);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (state.snapTimeout) clearTimeout(state.snapTimeout);
      state.lenis = null;
    };
  }, [
    trackContainerRef,
    viewportRef,
    initialHeroRef,
    narrative1Ref,
    narrative2Ref,
    finalFrameRef,
  ]);

  const scrollToStage = (stageIndex) => {
    const state = stateRef.current;
    if (!state.lenis || !trackContainerRef.current) return;
    const clamped = Math.max(0, Math.min(3, stageIndex));
    const totalDist = (trackContainerRef.current.offsetHeight ?? 0) - window.innerHeight;
    state.isSnapping = true;
    state.lenis.scrollTo(STAGE_TARGETS[clamped] * totalDist, {
      duration: 1.1,
      easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      onComplete: () => { state.isSnapping = false; },
    });
  };

  return { scrollProgress, scrollToStage };
};

export default useHeroScrollTimeline;
