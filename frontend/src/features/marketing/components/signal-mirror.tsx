import { motion, useReducedMotion } from "motion/react";

export function SignalMirror() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="signal-mirror-scene"
      aria-hidden="true"
      initial={
        shouldReduceMotion
          ? false
          : { x: 28, rotateY: -14, scale: 0.94 }
      }
      animate={
        shouldReduceMotion
          ? undefined
          : { x: 0, rotateY: 0, scale: 1 }
      }
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="signal-mirror-panel signal-mirror-panel-back" />
      <div className="signal-mirror-panel signal-mirror-panel-front">
        <div className="signal-mirror-reflection">
          A place for
          <br />
          things worth
          <br />
          keeping.
        </div>
        <div className="signal-mirror-orbit signal-mirror-orbit-one" />
        <div className="signal-mirror-orbit signal-mirror-orbit-two" />
        <span className="signal-mirror-pin" />
        <span className="signal-mirror-caption">THE SIGNAL / 01</span>
      </div>
    </motion.div>
  );
}
