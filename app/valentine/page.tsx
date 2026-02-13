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

const footerEmojis = ["💞", "💗", "🌹", "✨", "💘", "💫"]

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
      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-2 text-left">
        {loveLines.map((line, index) => (
          <SystemLoveLine
            key={line.label}
            line={line}
            delay={0.2 + index * 0.25}
          />
        ))}
      </div>
    )}

    <AnimatePresence>
      {(finalMessage || confirmedMessage) && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.6 }}
          className="relative mt-10 overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--card)] px-6 py-6 text-center shadow-lg"
        >
          {footerEmojis.map((emoji, index) => (
            <motion.span
              key={`${emoji}-${index}`}
              className="absolute text-lg"
              style={{
                left: `${8 + index * 14}%`,
                top: index % 2 === 0 ? "-6px" : "auto",
                bottom: index % 2 === 0 ? "auto" : "-8px",
              }}
              animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.7] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.3 }}
            >
              {emoji}
            </motion.span>
          ))}
          {finalMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-semibold text-deep"
            >
              Will you be my Valentine? 🌙
            </motion.p>
          )}
          {confirmedMessage && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-2 text-lg text-[color:var(--rose)]"
            >
              Already confirmed. Always. 💞✨
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

export default function ValentinePage() {
  const [accepted, setAccepted] = useState(false)
  const [noIndex, setNoIndex] = useState(0)
  const [revealLines, setRevealLines] = useState(false)
  const [finalMessage, setFinalMessage] = useState(false)
  const [confirmedMessage, setConfirmedMessage] = useState(false)

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--canvas)] text-[color:var(--ink)] px-6 py-12">
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

        <div className="relative rounded-3xl border border-[color:var(--line)] bg-[color:var(--card)] p-8 sm:p-12 shadow-xl">
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
  )
}
