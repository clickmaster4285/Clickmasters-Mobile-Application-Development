import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import Lenis from "lenis";

let lenisStarted = false;

type ScrollOffset =
  | "start start"
  | "start center"
  | "start end"
  | "center start"
  | "center center"
  | "center end"
  | "end start"
  | "end center"
  | "end end";

export function useLenisScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || typeof window === "undefined" || lenisStarted) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenisStarted = true;
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      lenisStarted = false;
    };
  }, [reduceMotion]);
}

export function useMagnetic(intensity = 0.22) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left - rect.width / 2) * intensity;
      const offsetY = (event.clientY - rect.top - rect.height / 2) * intensity;
      node.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    };

    const onLeave = () => {
      node.style.transform = "translate3d(0, 0, 0)";
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      node.style.transform = "translate3d(0, 0, 0)";
    };
  }, [intensity, reduceMotion]);

  return ref;
}

export function RevealText({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.25"],
  });
  const backgroundSize = useTransform(scrollYProgress, [0, 1], ["100% 0%", "100% 100%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        backgroundImage: "linear-gradient(180deg, var(--color-ink) 0%, var(--color-electric) 55%, var(--color-hot-pink) 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        backgroundRepeat: "no-repeat",
        backgroundSize,
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollFloat({
  children,
  yRange = [-24, 24],
  className,
  start = "start end",
  end = "end start",
  style,
}: {
  children: ReactNode;
  yRange?: [number, number];
  className?: string;
  start?: ScrollOffset;
  end?: ScrollOffset;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: [start, end] });
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div ref={ref} className={className} style={{ y, ...style }}>
      {children}
    </motion.div>
  );
}

export function MouseParallax({
  children,
  className,
  strength = 16,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion || typeof window === "undefined") {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const x = ((event.clientX / window.innerWidth) * 2 - 1) * strength;
      const y = ((event.clientY / window.innerHeight) * 2 - 1) * strength;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion, strength]);

  return (
    <motion.div
      className={className}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 24 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StaggerContainer({
  children,
  className,
  as: Component = motion.div,
}: {
  children: ReactNode;
  className?: string;
  as?: typeof motion.div;
}) {
  return (
    <Component
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

export function FloatingDoodle({
  children,
  className,
  strength = 14,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  return (
    <MouseParallax className={className} strength={strength}>
      {children}
    </MouseParallax>
  );
}

export function ParallaxBackdrop() {
  const { scrollYProgress } = useScroll();
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: yBack }}
        className="absolute -top-32 -left-32 h-[42rem] w-[42rem] rounded-full bg-electric/10 blur-3xl"
      />
      <motion.div
        style={{ y: yBack }}
        className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-hot-pink/10 blur-3xl"
      />
      <motion.div
        style={{ y: yMid }}
        className="absolute top-2/3 left-1/4 h-[28rem] w-[28rem] rounded-full bg-sun/15 blur-3xl"
      />
    </div>
  );
}
