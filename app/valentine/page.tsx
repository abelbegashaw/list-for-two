"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
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

const floatVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
}

const introVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

const lineVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
}

const glowVariants = {
  idle: { opacity: 0.35, scale: 1 },
  hover: { opacity: 0.6, scale: 1.04 },
}

const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        left: `${(index * 100) / 16}%`,
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
      Array.from({ length: 20 }, (_, index) => ({
        id: index,
        left: `${(index * 100) / 20}%`,
        top: `${(index % 7) * 12 + 10}%`,
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

const Petals = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: `${(index * 100) / 14}%`,
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

const SystemLoveLine = ({
  line,
  delay,
  floatDelay,
}: {
  line: LoveLine
  delay: number
  floatDelay: number
}) => (
  <motion.div
    variants={lineVariants}
    initial="hidden"
    animate="show"
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="grid items-start gap-3 text-base text-muted sm:grid-cols-[180px_1fr]"
  >
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      className="rounded-2xl border border-[color:var(--line)] bg-white/70 px-4 py-3 shadow-sm"
    >
      <span className="love-label">{line.label}:</span>
    </motion.div>
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay + 0.2 }}
      className="rounded-2xl border border-[color:var(--line)] bg-white/70 px-4 py-3 shadow-sm"
    >
      {line.value}
    </motion.div>
  </motion.div>
)

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
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="relative z-10"
  >
    <p className="text-sm uppercase tracking-[0.3em] text-muted">System prompt</p>
    <motion.h1
      variants={floatVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-3 text-3xl font-semibold text-deep sm:text-4xl"
    >
      I wrote a tiny script that only compiles with you. 💻💘
    </motion.h1>
    <motion.p
      variants={floatVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      className="mt-4 text-lg text-muted"
    >
      Confirm to unlock co-op mode and a lifetime subscription to my heart. 🫶
    </motion.p>
    <motion.p
      variants={floatVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="mt-3 text-lg text-muted"
    >
      Side effects include giggles, hand-holding, and very soft smiles. 😊
    </motion.p>
    <motion.p
      variants={floatVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
      className="mt-3 text-lg text-muted"
    >
      Precious, will you be my valentine? 🌹
    </motion.p>
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
    <motion.p
      variants={floatVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
      className="mt-4 text-sm text-[color:var(--rose)]"
    >
      {noMessage}
    </motion.p>
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
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="relative z-10 text-center"
  >
    <p className="text-sm uppercase tracking-[0.3em] text-muted">Deploy complete</p>
    <h1 className="mt-3 text-3xl font-semibold text-deep sm:text-4xl">
      Heart.exe is running
    </h1>
    <p className="mt-4 text-lg text-muted">
      Precious, you just approved my favorite pull request. 🥹
    </p>
    {!reveal ? (
      <p className="mt-4 text-sm text-muted">Booting romance… 💗</p>
    ) : (
      <div className="mx-auto mt-5 flex max-w-xl flex-col gap-3 text-left">
        {loveLines.map((line, index) => (
          <SystemLoveLine
            key={line.label}
            line={line}
            delay={0.2 + index * 0.3}
            floatDelay={(index % 6) * 0.4}
          />
        ))}
      </div>
    )}
    <AnimatePresence>
      {finalMessage ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-2xl font-semibold text-deep"
        >
          Will you be my Valentine? 🌙
        </motion.p>
      ) : null}
    </AnimatePresence>
    <AnimatePresence>
      {confirmedMessage ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-2 text-lg text-[color:var(--rose)]"
        >
          Already confirmed. Always. 💞✨
        </motion.p>
      ) : null}
    </AnimatePresence>
  </motion.div>
)

export default function ValentinePage() {
  const [accepted, setAccepted] = useState(false)
  const [noIndex, setNoIndex] = useState(0)
  const [revealLines, setRevealLines] = useState(false)
  const [finalMessage, setFinalMessage] = useState(false)
  const [confirmedMessage, setConfirmedMessage] = useState(false)
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([])
  const nextBurstId = useRef(0)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 35 })

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

  const handleNo = () => {
    setNoIndex((prev) => (prev + 1) % noMessages.length)
  }

  useEffect(() => {
    if (!accepted) return
    const typingTimer = window.setTimeout(() => setRevealLines(true), 900)
    const finalTimer = window.setTimeout(() => setFinalMessage(true), 2600)
    const confirmTimer = window.setTimeout(() => setConfirmedMessage(true), 4200)
    return () => {
      window.clearTimeout(typingTimer)
      window.clearTimeout(finalTimer)
      window.clearTimeout(confirmTimer)
    }
  }, [accepted])

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const width = window.innerWidth || 1
      const height = window.innerHeight || 1
      setMousePosition({
        x: Math.round((event.clientX / width) * 100),
        y: Math.round((event.clientY / height) * 100),
      })
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  const handleAcceptedClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!accepted) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const id = nextBurstId.current++
    setBurstHearts((prev) => [...prev, { id, x, y }].slice(-12))
    window.setTimeout(() => {
      setBurstHearts((prev) => prev.filter((heart) => heart.id !== id))
    }, 1400)
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[color:var(--canvas)] text-[color:var(--ink)]"
      onClick={handleAcceptedClick}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(245, 194, 107, 0.28), transparent 55%), var(--canvas)`,
      }}
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
        .love-label {
          font-weight: 600;
          color: var(--deep);
          letter-spacing: 0.02em;
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

      <FloatingHearts />
      <Sparkles />
      <Petals />

      <div className="relative z-10 min-h-screen px-6 py-12">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm text-muted transition hover:border-[color:var(--accent)]"
            >
              Back to list
            </Link>
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Valentine</span>
          </div>

          <motion.div
            initial="idle"
            whileHover="hover"
            variants={glowVariants}
            className="pointer-events-none absolute right-[10%] top-32 h-40 w-40 rounded-full bg-[color:var(--sun)]/30 blur-3xl"
          />

          <div className="card-shadow relative overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--card)] p-6 sm:p-10">
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
          </div>
        </div>
      </div>

      <AnimatePresence>
        {accepted ? (
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
