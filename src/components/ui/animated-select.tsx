'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, CheckCircle2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) handler()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, handler])
}

interface AnimatedSelectProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  icon?: React.ReactNode
}

export function AnimatedSelect({
  options,
  value,
  onChange,
  placeholder = 'Select Option',
  className,
  icon
}: AnimatedSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useClickOutside(wrapperRef, () => setIsOpen(false))

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div
      ref={wrapperRef}
      className={cn('group relative w-full', className)}
    >
      <button
        type="button"
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl border border-border bg-muted/30 px-4 py-4 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20",
          isOpen ? "border-orange-500/50 ring-2 ring-orange-500/10" : "hover:border-orange-500/30",
          !value && "text-muted-foreground/40"
        )}
      >
        <div className="flex items-center gap-3">
          {icon && <div className={cn("shrink-0 transition-colors", isOpen ? "text-orange-500" : "text-muted-foreground/30")}>{icon}</div>}
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="shrink-0"
        >
          <ChevronDown className='h-4 w-4 opacity-30' />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role='listbox'
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
            }}
            className={cn(
              'absolute top-[calc(100%+0.5rem)] left-0 z-[100] w-full',
              'overflow-hidden rounded-2xl',
              'bg-card shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border/50 backdrop-blur-xl',
              'dark:bg-zinc-900/95'
            )}
          >
            <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
              <motion.div
                initial='hidden'
                animate='visible'
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.02,
                    },
                  },
                }}
              >
                {options.map((opt) => (
                  <motion.div
                    key={opt.value}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onChange(opt.value)
                        setIsOpen(false)
                      }}
                      className={cn(
                        'flex w-full items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl text-left',
                        'transition-all duration-150',
                        value === opt.value 
                          ? 'bg-orange-500/10 text-orange-500' 
                          : 'text-foreground hover:bg-muted/50'
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {value === opt.value && (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                      )}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
