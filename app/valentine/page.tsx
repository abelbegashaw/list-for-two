"use client"

import Link from "next/link"
import { Press_Start_2P, VT323 } from "next/font/google"
import { useMemo, useState } from "react"

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press",
})

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt",
})

const confettiPalette = ["#f5c26b", "#c06b2c", "#3e8d7e", "#c24b5a", "#f7f2e8"]

const noMessages = [
  "Signal lost. Retrying...",
  "Are you sure? That throws an exception.",
  "I will keep the loop running.",
  "Abort? Not in this build.",
]

export default function ValentinePage() {
  const [accepted, setAccepted] = useState(false)
  const [noIndex, setNoIndex] = useState(0)

  const confetti = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        color: confettiPalette[index % confettiPalette.length],
        left: `${(index * 100) / 28}%`,
        delay: `${(index % 7) * 0.12}s`,
      })),
    []
  )

  const handleNo = () => {
    setNoIndex((prev) => (prev + 1) % noMessages.length)
  }

  return (
    <div className={`${pressStart.variable} ${vt323.variable} min-h-screen bg-[#1b1410] text-[#f7f2e8]`}> 
      <style jsx global>{`
        .pixel-frame {
          box-shadow: 0 0 0 4px #f7f2e8, 0 0 0 8px #6e4b3a;
        }
        .pixel-text {
          font-family: var(--font-press), monospace;
          letter-spacing: 0.05em;
        }
        .pixel-body {
          font-family: var(--font-vt), monospace;
          font-size: 1.2rem;
        }
        .scanline {
          background-image: linear-gradient(
            rgba(0, 0, 0, 0.15) 50%,
            rgba(0, 0, 0, 0.05) 50%
          );
          background-size: 100% 4px;
        }
        .confetti {
          position: absolute;
          top: -10px;
          width: 10px;
          height: 10px;
          animation: confetti-fall 2.6s linear infinite;
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
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 0 2px rgba(245, 194, 107, 0.6), 0 0 20px rgba(245, 194, 107, 0.35);
          }
          50% {
            box-shadow: 0 0 0 2px rgba(245, 194, 107, 1), 0 0 28px rgba(245, 194, 107, 0.6);
          }
        }
      `}</style>

      <div className="scanline min-h-screen px-6 py-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="pixel-body rounded-full border border-[#6e4b3a] px-4 py-2 text-sm text-[#f7f2e8] transition hover:border-[#f5c26b]"
            >
              Back to list
            </Link>
            <span className="pixel-text text-xs text-[#f5c26b]">VALENTINE.exe</span>
          </div>

          <div className="pixel-frame relative overflow-hidden rounded-3xl bg-[#2a1e18] p-6 sm:p-10">
            {accepted ? (
              <>
                <div className="relative z-10">
                  <h1 className="pixel-text text-2xl sm:text-3xl">Request Accepted</h1>
                  <p className="pixel-body mt-4 text-[#f5c26b]">
                    Precious, will you be my valentine?
                  </p>
                  <p className="pixel-body mt-3">
                    Status: SUCCESS. Deploying kisses and cozy memories.
                  </p>
                </div>
                <div className="pointer-events-none absolute inset-0">
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
                </div>
              </>
            ) : (
              <>
                <h1 className="pixel-text text-2xl sm:text-3xl">System Prompt</h1>
                <p className="pixel-body mt-4 text-[#f5c26b]">
                  Precious, will you be my valentine?
                </p>
                <p className="pixel-body mt-3">
                  Confirm the request to unlock a lifetime of co-op adventures.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setAccepted(true)}
                    className="pixel-text rounded-full bg-[#f5c26b] px-6 py-3 text-xs text-[#2a1e18] transition hover:bg-[#f7d89f]"
                    style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
                  >
                    YES, EXECUTE
                  </button>
                  <button
                    type="button"
                    onClick={handleNo}
                    className="pixel-text rounded-full border border-[#6e4b3a] px-6 py-3 text-xs text-[#f7f2e8] transition hover:border-[#f5c26b]"
                  >
                    NO, CANCEL
                  </button>
                </div>
                <p className="pixel-body mt-4 text-[#c24b5a]">{noMessages[noIndex]}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
