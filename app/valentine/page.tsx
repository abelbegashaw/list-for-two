"use client"

import Link from "next/link"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import type { MouseEvent as ReactMouseEvent } from "react"
import { useEffect, useMemo, useRef, useState } from "react"

type LoveLine = {
  label: string
  value: string
}

type BurstHeart = {
  id: number
  x: number
  y: number
}

const confettiPalette = ["#f5c26b", "#c06b2c", "#3e8d7e", "#c24b5a", "#f7f2e8"]

const noMessages = [
  "Signal lost. Retrying...",
  "Are you sure? That throws an exception.",
  "I will keep the loop running.",
  "Abort? Not in this build.",
  "Come on Precious, do you really wanna miss out on me?",
]

const loveLines: LoveLine[] = [
  { label: "Build status", value: "green 💚" },
  { label: "Heart uptime", value: "100% since you 💗" },
  { label: "Love latency", value: "zero ⚡" },
  { label: "Core dependency", value: "your laugh" },
  { label: "Primary key", value: "your hand in mine" },
  { label: "Authentication", value: "you + me = verified 🔐" },
  { label: "Memory leaks", value: "none (I remember every little thing about you) 🧠" },
  { label: "Crash reports", value: "only when you smile like that" },
  { label: "Background process", value: "constantly thinking about you" },
  { label: "Signal strength", value: "full bars in your arms 📶" },
  { label: "Auto-save", value: "every moment with you" },
  { label: "Patch notes", value: "added more kisses ✨" },
  { label: "Fallback protocol", value: "hold you closer" },
  { label: "Co-op mode", value: "stargazing, inside jokes, soft kisses 🌙" },
  { label: "Hidden achievement", value: "making you blush" },
  { label: "Infinite loop", value: "me choosing you" },
  { label: "Version control", value: "v1.0 → vForever ♾️" },
  { label: "Next sprint", value: "building a life together" },
  { label: "Final deployment", value: "your arms, always" },
  { label: "End-of-life policy", value: "not supported ❤️" },
]

const footerEmojis = ["💞", "💗", "🌹", "✨", "💘", "💫"]

const slideGradients = [
  "bg-[linear-gradient(135deg,rgba(190,232,170,0.55),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(241,174,195,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(250,228,140,0.5),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(210,196,170,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(238,210,168,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(200,225,255,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(214,214,214,0.5),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(255,204,184,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(188,222,204,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(197,217,248,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(240,215,170,0.5),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(245,224,170,0.5),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(222,196,178,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(120,160,210,0.35),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(233,188,198,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(235,205,185,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(200,210,255,0.4),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(210,196,182,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(236,195,195,0.45),rgba(247,242,232,0.85))]",
  "bg-[linear-gradient(135deg,rgba(240,210,200,0.45),rgba(247,242,232,0.85))]",
]

const introVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

const lineVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
}

const SystemLoveLine = ({
  line,
  delay,
}: {
  line: LoveLine
  delay: number
}) => (
  <motion.div
    variants={lineVariants}
    initial="hidden"
    animate="show"
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="rounded-2xl border border-[color:var(--line)] bg-white/60 px-4 py-2 text-xs sm:text-sm backdrop-blur-sm"
  >
    <span className="font-semibold text-[color:var(--deep)] tracking-tight">
      {line.label}:
    </span>{" "}
    <span className="text-[color:var(--ink)]">{line.value}</span>
  </motion.div>
)

const LoveSlide = ({ line, index }: { line: LoveLine; index: number }) => (
  <motion.div
    initial={{ opacity: 0, rotateX: 38, rotateY: -22, scale: 0.92, y: 28 }}
    whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1, y: 0 }}
    viewport={{ once: false, amount: 0.6 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformPerspective: 1400 }}
    className={`scroll-slide flex h-full snap-start flex-col items-center justify-center rounded-3xl px-4 text-center shadow-lg ${slideGradients[index % slideGradients.length]}`}
  >
    <p className="text-sm uppercase tracking-[0.3em] text-muted">System line</p>
    <p className="mt-4 text-3xl font-semibold text-deep sm:text-4xl shadow-[0_18px_50px_rgba(47,38,33,0.12)]">
      {line.label}:
    </p>
    <p className="mt-3 text-2xl text-[color:var(--ink)] sm:text-3xl">
      {line.value}
    </p>
  </motion.div>
)

const FinalLoveSlide = ({
  finalMessage,
  confirmedMessage,
}: {
  finalMessage: boolean
  confirmedMessage: boolean
}) => (
  <motion.div
    initial={{ opacity: 0, rotateX: 38, rotateY: 22, scale: 0.92, y: 28 }}
    whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1, y: 0 }}
    viewport={{ once: false, amount: 0.6 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformPerspective: 1400 }}
    className="scroll-slide flex h-full flex-col items-center justify-center gap-3 rounded-3xl bg-[color:var(--rose)] px-4 text-center text-[color:var(--card)] shadow-2xl"
  >
    <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--card)]/70">Final prompt</p>
    <AnimatePresence>
      {finalMessage ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold sm:text-3xl"
        >
          Will you be my Valentine? 🌹
        </motion.p>
      ) : null}
    </AnimatePresence>
    <AnimatePresence>
      {confirmedMessage ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base text-[color:var(--card)]/90"
        >
          Already confirmed. Always. ✨💞💗
        </motion.p>
      ) : null}
    </AnimatePresence>
  </motion.div>
)

const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: `${(index * 100) / 18}%`,
        delay: `${(index % 6) * 0.5}s`,
        size: 10 + (index % 4) * 3,
      })),
    []
  )

  return (
    <div className="pointer-events-none absolute inset-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="float-heart"
          style={{
            left: heart.left,
            width: heart.size,
            height: heart.size,
            animationDelay: heart.delay,
          }}
        />
      ))}
    </div>
  )
}

const Sparkles = () => {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        id: index,
        left: `${(index * 100) / 22}%`,
        top: `${(index % 7) * 12 + 8}%`,
        delay: `${(index % 6) * 0.4}s`,
      })),
    []
  )

  return (
    <div className="pointer-events-none absolute inset-0">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            animationDelay: sparkle.delay,
          }}
        />
      ))}
    </div>
  )
}

const FlowerSprinkles = () => {
  const flowers = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => ({
        id: index,
        left: `${(index * 100) / 10}%`,
        delay: `${(index % 5) * 0.6}s`,
        size: 20 + (index % 3) * 6,
      })),
    []
  )

  return (
    <div className="pointer-events-none absolute inset-0">
      {flowers.map((flower) => (
        <span
          key={flower.id}
          className="flower-float"
          style={{
            left: flower.left,
            fontSize: `${flower.size}px`,
            animationDelay: flower.delay,
          }}
        >
          🌹
        </span>
      ))}
    </div>
  )
}

const Petals = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        left: `${(index * 100) / 16}%`,
        delay: `${(index % 7) * 0.7}s`,
      })),
    []
  )

  return (
    <div className="pointer-events-none absolute inset-0">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{ left: petal.left, animationDelay: petal.delay }}
        />
      ))}
    </div>
  )
}

const ProposalIntro = ({ onAccept, onNo, noMessage }: {
  onAccept: () => void
  onNo: () => void
  noMessage: string
}) => (
  <motion.div
    variants={introVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5 }}
    className="relative z-10"
  >
    <p className="text-sm uppercase tracking-[0.3em] text-muted text-center">
      System prompt
    </p>

    <h1 className="mt-3 text-3xl font-semibold text-deep sm:text-4xl text-center">
      I wrote a tiny script that only compiles with you. 💻💘
    </h1>

    <p className="mt-4 text-lg text-muted text-center">
      Confirm to unlock co-op mode and a lifetime subscription to my heart. 🫶
    </p>

    <p className="mt-3 text-lg text-muted text-center">
      Side effects include giggles, hand-holding, and very soft smiles. 😊
    </p>

    <p className="mt-3 text-lg text-muted text-center">
      Precious, will you be my valentine? 🌹
    </p>

    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={onAccept}
        className="rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm text-white shadow-md"
      >
        Yes, I choose you 💞
      </motion.button>

      <motion.button
        whileHover={{ x: 6 }}
        type="button"
        onClick={onNo}
        className="rounded-full border border-[color:var(--line)] px-6 py-3 text-sm text-muted transition hover:border-[color:var(--accent)]"
      >
        Not yet 😅
      </motion.button>
    </div>

    <p className="mt-4 text-sm text-[color:var(--rose)] text-center">
      {noMessage}
    </p>
  </motion.div>
)

const CelebrationScene = ({
  loveLines,
  reveal,
  finalMessage,
  confirmedMessage,
}: {
  loveLines: LoveLine[]
  reveal: boolean
  finalMessage: boolean
  confirmedMessage: boolean
}) => (
  <motion.div
    variants={introVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.6 }}
    className="relative z-10"
  >
    <p className="text-sm uppercase tracking-[0.3em] text-muted text-center">
      Deploy complete
    </p>

    <h1 className="mt-3 text-3xl font-semibold text-deep sm:text-4xl text-center">
      Heart.exe is running
    </h1>

    <p className="mt-4 text-lg text-muted text-center">
      Precious, you just approved my favorite pull request. 🥹
    </p>

    {!reveal ? (
      <p className="mt-4 text-sm text-muted text-center">
        Booting romance… 💗
      </p>
    ) : (
      <div className="mx-auto mt-6 w-full max-w-2xl">
        <p className="text-center text-sm text-muted">Scroll to continue ⬇️</p>
        <div className="scroll-clean scroll-stage mt-4 h-[58vh] snap-y snap-mandatory overflow-y-auto rounded-3xl border border-[color:var(--line)] bg-transparent">
          {loveLines.map((line, index) => (
            <div key={line.label} className="h-[58vh] snap-start">
              <LoveSlide line={line} index={index} />
            </div>
          ))}
          <div className="h-[58vh] snap-start p-4">
            <FinalLoveSlide
              finalMessage={finalMessage}
              confirmedMessage={confirmedMessage}
            />
          </div>
        </div>
      </div>
    )}
  </motion.div>
)

export default function ValentinePage() {
  const pageRef = useRef<HTMLDivElement | null>(null)
  const [accepted, setAccepted] = useState(false)
  const [noIndex, setNoIndex] = useState(0)
  const [revealLines, setRevealLines] = useState(false)
  const [finalMessage, setFinalMessage] = useState(false)
  const [confirmedMessage, setConfirmedMessage] = useState(false)
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([])
  const nextBurstId = useRef(0)

  const confetti = useMemo(
    () =>
      Array.from({ length: 32 }, (_, index) => ({
        id: index,
        color: confettiPalette[index % confettiPalette.length],
        left: `${(index * 100) / 32}%`,
        delay: `${(index % 8) * 0.15}s`,
      })),
    []
  )

  useEffect(() => {
    if (!accepted) return
    const typingTimer = setTimeout(() => setRevealLines(true), 900)
    const finalTimer = setTimeout(() => setFinalMessage(true), 2600)
    const confirmTimer = setTimeout(() => setConfirmedMessage(true), 4200)
    return () => {
      clearTimeout(typingTimer)
      clearTimeout(finalTimer)
      clearTimeout(confirmTimer)
    }
  }, [accepted])

  const handleNo = () => {
    setNoIndex((prev) => (prev + 1) % noMessages.length)
  }

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start end", "end start"],
  })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.18, 0.5, 0.25, 0.6])
  const tintOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.05, 0.22, 0.12, 0.3])
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 0.98])
  const cardY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -14, 10])
  const cardRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -4])
  const cardRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-6, 0, 6])
  const floatOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.55, 1, 0.6, 0.85])
  const floatScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.06, 0.98])

  const handleBackgroundClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null
    if (target?.closest("button, a, input, textarea, select")) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const id = nextBurstId.current++
    setBurstHearts((prev) => [...prev, { id, x, y }].slice(-16))
    window.setTimeout(() => {
      setBurstHearts((prev) => prev.filter((heart) => heart.id !== id))
    }, 1400)
  }

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-[color:var(--canvas)] text-[color:var(--ink)] px-6 py-12"
      onClick={handleBackgroundClick}
    >
      <style jsx global>{`
        .float-heart {
          position: absolute;
          bottom: -20px;
          background: #c24b5a;
          transform: rotate(45deg);
          opacity: 0.35;
          animation: float-heart 8s ease-in-out infinite;
        }
        .float-heart::before,
        .float-heart::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: #c24b5a;
          border-radius: 50%;
        }
        .float-heart::before {
          left: -50%;
          top: 0;
        }
        .float-heart::after {
          top: -50%;
          left: 0;
        }
        @keyframes float-heart {
          0% {
            transform: translateY(0) rotate(45deg) scale(0.9);
            opacity: 0;
          }
          15% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-120vh) rotate(45deg) scale(1.1);
            opacity: 0;
          }
        }
        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f5c26b;
          animation: sparkle 2.4s ease-in-out infinite;
        }
        .petal {
          position: absolute;
          width: 16px;
          height: 20px;
          background: #f7c3c9;
          border-radius: 70% 70% 80% 80%;
          transform: rotate(12deg);
          animation: petal-float 7s ease-in-out infinite;
        }
        .confetti {
          position: absolute;
          top: -10px;
          width: 10px;
          height: 10px;
          animation: confetti-fall 2.6s linear infinite;
        }
        .flower-float {
          position: absolute;
          bottom: -30px;
          opacity: 0.7;
          filter: drop-shadow(0 6px 10px rgba(194, 75, 90, 0.35));
          animation: flower-float 10s ease-in-out infinite;
        }
        @keyframes flower-float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-110vh) rotate(18deg);
            opacity: 0;
          }
        }
        .scroll-clean {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scroll-clean::-webkit-scrollbar {
          display: none;
        }
        .scroll-stage {
          perspective: 1200px;
        }
        .scroll-slide {
          transform-style: preserve-3d;
        }
        @keyframes sparkle {
          0%,
          100% {
            transform: scale(0.6);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.9;
          }
        }
        @keyframes petal-float {
          0% {
            transform: translateY(0) rotate(10deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) rotate(80deg);
            opacity: 0;
          }
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(420deg);
            opacity: 0;
          }
        }
        .burst-heart {
          position: absolute;
          width: 16px;
          height: 16px;
          background: #c24b5a;
          transform: rotate(45deg);
          animation: burst-heart 1.2s ease-out forwards;
        }
        .burst-heart::before,
        .burst-heart::after {
          content: "";
          position: absolute;
          width: 16px;
          height: 16px;
          background: #c24b5a;
          border-radius: 50%;
        }
        .burst-heart::before {
          left: -8px;
          top: 0;
        }
        .burst-heart::after {
          top: -8px;
          left: 0;
        }
        @keyframes burst-heart {
          0% {
            transform: translateY(0) rotate(45deg) scale(0.7);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-60px) rotate(45deg) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 paper-texture" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-[-10%] h-72 w-72 rounded-full bg-[color:var(--sun)]/40 blur-3xl float-slow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-10 right-[-12%] h-80 w-80 rounded-full bg-[color:var(--rose)]/30 blur-3xl float-slower"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 grain-overlay" aria-hidden="true" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: tintOpacity }}
      >
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_10%,rgba(245,194,107,0.5),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(194,75,90,0.35),transparent_45%)]" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-[10%] top-16 h-56 w-56 rounded-full bg-[color:var(--sun)]/30 blur-3xl"
        style={{ y: glowY, opacity: glowOpacity }}
      />
      <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: floatOpacity, scale: floatScale }}>
        <FloatingHearts />
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: floatOpacity }}>
        <Sparkles />
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: floatOpacity }}>
        <Petals />
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: floatOpacity }}>
        <FlowerSprinkles />
      </motion.div>

      <div className="mx-auto w-full max-w-3xl flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm text-muted transition hover:border-[color:var(--accent)]"
          >
            Back to list
          </Link>
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            Valentine
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ scale: cardScale, y: cardY, rotateX: cardRotateX, rotateY: cardRotateY, transformPerspective: 1200 }}
          className="relative rounded-3xl border border-[color:var(--line)] bg-[color:var(--card)] p-8 sm:p-12 shadow-xl"
        >
          <AnimatePresence mode="wait">
            {accepted ? (
              <CelebrationScene
                key="accepted"
                loveLines={loveLines}
                reveal={revealLines}
                finalMessage={finalMessage}
                confirmedMessage={confirmedMessage}
              />
            ) : (
              <ProposalIntro
                key="intro"
                onAccept={() => setAccepted(true)}
                onNo={handleNo}
                noMessage={noMessages[noIndex]}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {accepted ? (
              <motion.div
                key="confetti"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0"
              >
                {confetti.map((piece) => (
                  <span
                    key={piece.id}
                    className="confetti"
                    style={{
                      left: piece.left,
                      backgroundColor: piece.color,
                      animationDelay: piece.delay,
                    }}
                  />
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {burstHearts.length ? (
          <div className="pointer-events-none absolute inset-0">
            {burstHearts.map((heart) => (
              <span
                key={heart.id}
                className="burst-heart"
                style={{ left: heart.x, top: heart.y }}
              />
            ))}
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
