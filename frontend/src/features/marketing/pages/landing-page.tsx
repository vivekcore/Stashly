import {
  ArrowUpRight,
  Link2,
  NotebookPen,
  Search,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router";

import Dashboard from "@/assets/dashboard.png";
import Landingpage from "@/assets/landingpage.png";
import Logo from "@/assets/logo.png";
import Texteditor from "@/assets/texteditor.png";
import { useSessionContext } from "@/context/useSessionContext";
import { SignalField } from "@/features/marketing/components/signal-field";
import { SignalInbox } from "@/features/marketing/components/signal-inbox";
import { SignalMirror } from "@/features/marketing/components/signal-mirror";
import { ThemeToggle } from "@/shared/theme/theme-toggle";
import { Button } from "@/shared/ui/button";
import { SparklesCore } from "@/shared/ui/sparkles";

const story = [
  {
    number: "01",
    title: "Capture the signal",
    description:
      "Save videos, posts, articles, and half-formed ideas from the places you already browse.",
    icon: Link2,
  },
  {
    number: "02",
    title: "Find the thread",
    description:
      "Give everything one calm, searchable home so the useful parts stay close when you need them.",
    icon: Search,
  },
  {
    number: "03",
    title: "Make it yours",
    description:
      "Move from collecting to thinking with notes and a focused editor beside your sources.",
    icon: NotebookPen,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const shouldReduceMotion = useReducedMotion();

  const goToApp = () => navigate(session ? "/home/dashboard" : "/auth/signin");
  const goToSignup = () => navigate(session ? "/home/dashboard" : "/auth/signup");

  return (
    <div className="landing-page min-h-screen overflow-hidden bg-background text-foreground">
      <a className="landing-skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="landing-editorial-header">
        <div className="landing-container flex items-center justify-between">
          <a
            href="#main-content"
            className="landing-brand-link"
            aria-label="Stashly home"
          >
            <span className="landing-mark">
              <img src={Logo} alt="" width={20} height={20} />
            </span>
            <span className="landing-brand-word">Stashly</span>
          </a>
          <nav aria-label="Primary navigation" className="flex items-center gap-3">
            <ThemeToggle />
            <Button className="rounded-full px-4" size="sm" onClick={goToApp}>
              {session ? "Open app" : "Get started"}
            </Button>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="signal-field-hero">
          <div className="landing-hero-glow" aria-hidden="true" />
          <SparklesCore
            id="landing-particles"
            background="transparent"
            minSize={0.4}
            maxSize={1.1}
            particleDensity={28}
            speed={0.45}
            particleColor="#bfc0bb"
            className="landing-particles absolute inset-0 z-0 h-full w-full"
          />
          <div className="landing-container relative z-10 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <div className="signal-field-copy">
              <p className="landing-eyebrow">
                {/* <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> */}
                A calmer place for useful things
              </p>
              <h1 className="signal-field-title">
                Keep the
                <span>signal.</span>
                <em>Close the noise.</em>
              </h1>
              <p className="signal-field-lede">
                Stashly turns scattered links, posts, and ideas into one
                searchable workspace—so your research stays usable after the
                tab closes.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="rounded-full px-6" onClick={goToApp}>
                  {session ? "Open dashboard" : "Start saving"}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-6" onClick={goToSignup}>
                  See the method
                </Button>
              </div>
              <div className="signal-field-meta">
                <span>Capture</span>
                <i aria-hidden="true" />
                <span>Organize</span>
                <i aria-hidden="true" />
                <span>Write</span>
              </div>
            </div>
            <SignalField />
          </div>
        </section>

        <section className="landing-statement-section" aria-labelledby="statement-title">
          <div className="landing-container landing-statement-layout">
            <div className="landing-statement-copy">
              <p className="landing-eyebrow">The reason it exists</p>
              <h2 id="statement-title" className="landing-statement-title">
                A place for the things
                <span>you don&apos;t want to lose.</span>
              </h2>
            </div>
            <SignalMirror />
          </div>
        </section>

        <section id="story" className="landing-story-section" aria-labelledby="story-title">
          <div className="landing-container">
            <div className="landing-section-intro">
              <p className="landing-eyebrow">The method</p>
              <h2 id="story-title">From scattered inputs to a useful thread.</h2>
              <p>
                Keep the collection lightweight. Give the best pieces enough
                context to become something more.
              </p>
            </div>
            <div className="landing-story-list">
              {story.map(({ number, title, description, icon: Icon }, index) => (
                <motion.article
                  className="landing-story-row"
                  initial={shouldReduceMotion ? false : { y: 18 }}
                  animate={shouldReduceMotion ? undefined : { y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: shouldReduceMotion ? 0 : index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  key={number}
                >
                  <span className="landing-story-number">{number}</span>
                  <Icon className="landing-story-icon" aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <ArrowUpRight className="landing-story-arrow" aria-hidden="true" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="landing-proof-section" aria-labelledby="proof-title">
          <div className="landing-container">
            <div className="landing-proof-heading">
              <div>
                <p className="landing-eyebrow">Inside the workspace</p>
                <h2 id="proof-title">Less tab juggling. More room to think.</h2>
              </div>
              <p>
                Your links, notes, and working drafts stay in the same visual
                field, ready for the next connection.
              </p>
            </div>
            <div className="landing-proof-stage">
              <div className="landing-proof-stage-label">Product / 01</div>
              <img className="landing-proof-stage-image landing-proof-stage-image-back" src={Texteditor} alt="Stashly text editor" loading="lazy" />
              <img className="landing-proof-stage-image landing-proof-stage-image-side" src={Landingpage} alt="Stashly saved content list" loading="lazy" />
              <img className="landing-proof-stage-image landing-proof-stage-image-front" src={Dashboard} alt="Stashly dashboard" loading="lazy" />
            </div>
            <SignalInbox />
          </div>
        </section>

        <section className="landing-final-section" aria-labelledby="final-title">
          <div className="landing-container">
            <p className="landing-eyebrow">Make space for better work</p>
            <h2 id="final-title">
              Keep the good stuff.
              <span>Leave the rest behind.</span>
            </h2>
            <Button size="lg" className="mt-9 rounded-full px-7" onClick={goToSignup}>
              {session ? "Go to dashboard" : "Create your workspace"}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="landing-editorial-footer">
        <div className="landing-container flex flex-col justify-between gap-3 sm:flex-row">
          <span>Stashly — keep the good stuff.</span>
          <span>Built for curious minds.</span>
        </div>
      </footer>
    </div>
  );
}
