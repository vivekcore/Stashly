import { motion, useReducedMotion } from "motion/react";

const steps = [
  { label: "Capture", detail: "Links and ideas", accent: "bg-primary" },
  { label: "Organize", detail: "One clear home", accent: "bg-emerald-500" },
  { label: "Write", detail: "Notes with context", accent: "bg-amber-500" },
];

export function WorkflowRail() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mt-12" aria-label="Capture, organize, and write workflow">
      <div className="absolute top-7 right-7 left-7 hidden h-px bg-border sm:block" aria-hidden="true" />
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">
        {steps.map((step, index) => (
          <motion.article
            className="landing-workflow-card"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.55,
              delay: shouldReduceMotion ? 0 : index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            key={step.label}
          >
            <span className={`landing-workflow-dot ${step.accent}`} aria-hidden="true">
              0{index + 1}
            </span>
            <h3 className="mt-9 text-lg font-semibold tracking-[-0.03em]">{step.label}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.detail}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
