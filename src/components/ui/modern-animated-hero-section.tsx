import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ArrowDown, Download } from "lucide-react"

interface Character {
  char: string
  x: number
  y: number
  speed: number
}

class TextScramble {
  el: HTMLElement
  chars: string
  queue: Array<{
    from: string
    to: string
    start: number
    end: number
    char?: string
  }>
  frame: number
  frameRequest: number
  resolve: (value: void | PromiseLike<void>) => void

  constructor(el: HTMLElement) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#'
    this.queue = []
    this.frame = 0
    this.frameRequest = 0
    this.resolve = () => {}
    this.update = this.update.bind(this)
  }

  setText(newText: string) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((resolve) => this.resolve = resolve)
    this.queue = []

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ''
    let complete = 0

    for (let i = 0, n = this.queue.length; i < n; i++) {
      const { from, to, start, end } = this.queue[i]
      let { char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)]
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }

    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
}

const ScrambledTitle: React.FC = () => {
  const elementRef = useRef<HTMLHeadingElement>(null)
  const scramblerRef = useRef<TextScramble | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (elementRef.current && !scramblerRef.current) {
      scramblerRef.current = new TextScramble(elementRef.current)
      setMounted(true)
    }
  }, [])

  useEffect(() => {
    if (mounted && scramblerRef.current) {
      const phrases = [
        'Mayank Khandelwal',
        'Senior AI/ML Engineer',
        'Building with LLMs',
        'RAG & Retrieval',
        'Production AI Systems',
        'Full-Stack AI',
      ]

      let counter = 0
      const next = () => {
        if (scramblerRef.current) {
          scramblerRef.current.setText(phrases[counter]).then(() => {
            setTimeout(next, 2000)
          })
          counter = (counter + 1) % phrases.length
        }
      }

      next()
    }
  }, [mounted])

  return (
    <h1
      ref={elementRef}
      className="text-white text-3xl font-bold tracking-wider md:text-5xl lg:text-6xl"
      style={{ fontFamily: 'var(--font-mono, monospace)' }}
    >
      Mayank Khandelwal
    </h1>
  )
}

const RainingLetters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const animatingRef = useRef(true)

  const createCharacters = useCallback(() => {
    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
    const charCount = 250
    const newCharacters: Character[] = []

    for (let i = 0; i < charCount; i++) {
      newCharacters.push({
        char: allChars[Math.floor(Math.random() * allChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.08 + Math.random() * 0.2,
      })
    }

    return newCharacters
  }, [])

  useEffect(() => {
    setCharacters(createCharacters())
  }, [createCharacters])

  // Pause animation when off-screen
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { animatingRef.current = entry.isIntersecting },
      { threshold: 0.1 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateActiveIndices = () => {
      const newActiveIndices = new Set<number>()
      const numActive = Math.floor(Math.random() * 3) + 3
      for (let i = 0; i < numActive; i++) {
        newActiveIndices.add(Math.floor(Math.random() * characters.length))
      }
      setActiveIndices(newActiveIndices)
    }

    const flickerInterval = setInterval(updateActiveIndices, 80)
    return () => clearInterval(flickerInterval)
  }, [characters.length])

  useEffect(() => {
    let animationFrameId: number
    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

    const updatePositions = () => {
      if (animatingRef.current) {
        setCharacters(prevChars =>
          prevChars.map(char => ({
            ...char,
            y: char.y + char.speed,
            ...(char.y >= 100 && {
              y: -5,
              x: Math.random() * 100,
              char: allChars[Math.floor(Math.random() * allChars.length)],
            }),
          }))
        )
      }
      animationFrameId = requestAnimationFrame(updatePositions)
    }

    animationFrameId = requestAnimationFrame(updatePositions)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <section data-no-snap ref={containerRef} className="relative w-full h-screen overflow-hidden" style={{ background: 'var(--color-surface-950)' }}>
      {/* Center content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
        {/* Scrambled name */}
        <ScrambledTitle />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-4 text-center text-sm tracking-widest uppercase text-slate-500 md:text-base"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}
        >
          Building Production AI Systems with LLMs, RAG, NLP & MLOps
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-brand-300"
          >
            View Projects <ArrowDown size={16} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-slate-600 hover:bg-slate-800"
          >
            <Download size={16} /> Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/40 px-5 py-2.5 text-sm text-slate-400 backdrop-blur-sm transition-colors hover:border-slate-700 hover:text-slate-300"
          >
            Contact
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors"
        >
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.a>
      </div>

      {/* Dark vignette overlay for readability */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.85) 70%)',
        }}
      />

      {/* Bottom fade to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--color-surface-950) 0%, transparent 100%)',
        }}
      />

      {/* Raining Characters */}
      {characters.map((char, index) => (
        <span
          key={index}
          className="absolute font-light"
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            transform: `translate(-50%, -50%) ${activeIndices.has(index) ? 'scale(1.3)' : 'scale(1)'}`,
            color: activeIndices.has(index) ? 'var(--color-brand-400)' : 'var(--color-surface-700)',
            textShadow: activeIndices.has(index)
              ? '0 0 10px var(--color-brand-400), 0 0 20px rgba(245,158,11,0.3)'
              : 'none',
            opacity: activeIndices.has(index) ? 1 : 0.3,
            transition: 'color 0.15s, transform 0.15s, text-shadow 0.15s, opacity 0.15s',
            willChange: 'transform, top',
            fontSize: '1.4rem',
            fontFamily: 'var(--font-mono, monospace)',
          }}
        >
          {char.char}
        </span>
      ))}
    </section>
  )
}

export default RainingLetters
