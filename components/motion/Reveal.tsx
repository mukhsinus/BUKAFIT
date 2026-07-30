"use client";

import { type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Stagger children with the same parent */
  asChild?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

const rise = { opacity: 0, y: 16 };
const shown = { opacity: 1, y: 0 };

export function Reveal({
  children,
  className,
  delay = 0,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={rise}
      whileInView={shown}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.05,
}: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  /** Строки hero: clip-path слева-направо */
  mask = false,
}: {
  children: ReactNode;
  className?: string;
  mask?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  if (mask) {
    return (
      <motion.span
        className={cn("block", className)}
        variants={{
          hidden: { clipPath: "inset(0 100% 0 0)" },
          show: {
            clipPath: "inset(0 0% 0 0)",
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Построчный clip-path reveal для hero-заголовка */
export function HeroHeadlineReveal({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <h1 className={className}>
        {lines.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 className={className}>
      <motion.span
        className="block"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.15, delayChildren: 0.12 },
          },
        }}
      >
        {lines.map((line) => (
          <motion.span
            key={line}
            className="block whitespace-nowrap"
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)" },
              show: {
                clipPath: "inset(0 0% 0 0)",
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {line}
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
}
