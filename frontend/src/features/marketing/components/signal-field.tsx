import { motion, useReducedMotion } from "motion/react";

const sources = [
  { label: "YouTube", className: "signal-field-source-youtube" },
  { label: "Twitter/X", className: "signal-field-source-twitter" },
  { label: "LinkedIn", className: "signal-field-source-linkedin" },
  { label: "Notes", className: "signal-field-source-notes" },
];

export function SignalField() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="signal-field" aria-label="Stashly workspace preview">
      <div className="signal-field-orbit signal-field-orbit-one" aria-hidden="true" />
      <div className="signal-field-orbit signal-field-orbit-two" aria-hidden="true" />
      <div className="signal-field-orbit signal-field-orbit-three" aria-hidden="true" />
      <span className="signal-field-neutron-track signal-field-neutron-track-one" aria-hidden="true">
        <span
          className={`signal-field-neutron ${shouldReduceMotion ? "signal-field-neutron-static" : ""}`}
        />
      </span>
      <span className="signal-field-neutron-track signal-field-neutron-track-two" aria-hidden="true">
        <span
          className={`signal-field-neutron signal-field-neutron-secondary ${shouldReduceMotion ? "signal-field-neutron-static" : ""}`}
        />
      </span>
      <span className="signal-field-neutron-track signal-field-neutron-track-three" aria-hidden="true">
        <span
          className={`signal-field-neutron signal-field-neutron-tertiary ${shouldReduceMotion ? "signal-field-neutron-static" : ""}`}
        />
      </span>
      <span className="signal-field-neutron-track signal-field-neutron-track-four" aria-hidden="true">
        <span
          className={`signal-field-neutron signal-field-neutron-quaternary ${shouldReduceMotion ? "signal-field-neutron-static" : ""}`}
        />
      </span>

      {sources.map((source, index) => (
        <motion.span
          className={`signal-field-source ${source.className}`}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{
            duration: 0.65,
            delay: shouldReduceMotion ? 0 : 0.35 + index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          key={source.label}
        >
          <span className="signal-field-source-dot" aria-hidden="true" />
          {source.label}
        </motion.span>
      ))}

      <motion.div
        className="signal-field-object"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="signal-field-object-top">
          <span className="signal-field-object-status">
            <span aria-hidden="true" />
            Workspace
          </span>
          <span className="text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
            142 saved
          </span>
        </div>
        <div className="signal-field-object-content">
          <span className="text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
            The signal library
          </span>
          <strong>Ideas worth keeping.</strong>
          <div className="signal-field-object-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
