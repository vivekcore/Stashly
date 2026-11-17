import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const signals = [
  {
    source: "YouTube",
    mark: "▶",
    title: "A better way to collect ideas",
    detail: "Video · 12 min",
    tone: "landing-signal-youtube",
  },
  {
    source: "LinkedIn",
    mark: "in",
    title: "Designing for attention",
    detail: "Post · 4 min read",
    tone: "landing-signal-linkedin",
  },
  {
    source: "Note",
    mark: "✦",
    title: "The long way around",
    detail: "Draft · Updated now",
    tone: "landing-signal-note",
  },
];

export function SignalInbox() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSignal = signals[activeIndex];

  return (
    <div className="landing-signal-inbox">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="landing-eyebrow">Try the signal</p>
          <p className="mt-2 text-sm text-muted-foreground">
            See how every input gets a useful next step.
          </p>
        </div>
        <span className="landing-signal-status">
          <span aria-hidden="true" />
          Ready
        </span>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Saved content examples">
        {signals.map((signal, index) => (
          <button
            className={`landing-signal-tab ${index === activeIndex ? "landing-signal-tab-active" : ""}`}
            key={signal.source}
            onClick={() => setActiveIndex(index)}
            role="tab"
            aria-selected={index === activeIndex}
            type="button"
          >
            {signal.source}
          </button>
        ))}
      </div>

      <div className="landing-signal-result" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSignal.source}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <span className={`landing-source-icon ${activeSignal.tone}`}>
              {activeSignal.mark}
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-sm">{activeSignal.title}</strong>
              <small className="mt-1 block text-xs text-muted-foreground">
                {activeSignal.detail}
              </small>
            </span>
            <span className="landing-signal-result-status">
              Stashed
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
