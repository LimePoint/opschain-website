'use client'

import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  targetDate: string
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMs: number
}

function calcTimeRemaining(target: Date): TimeRemaining {
  const now = Date.now()
  const totalMs = target.getTime() - now

  if (totalMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs }
  }

  const totalSeconds = Math.floor(totalMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, totalMs }
}

const ONE_HOUR_MS = 60 * 60 * 1000

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-20 sm:w-20'>
        <span className='text-2xl font-heading font-bold tabular-nums sm:text-3xl'>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className='mt-2 text-xs font-body font-medium uppercase tracking-wider text-gray-500'>{label}</span>
    </div>
  )
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const target = new Date(targetDate)
  const [time, setTime] = useState<TimeRemaining>(() => calcTimeRemaining(target))

  useEffect(() => {
    const id = setInterval(() => {
      setTime(calcTimeRemaining(target))
    }, 1000)

    return () => clearInterval(id)
  }, [targetDate]) // eslint-disable-line react-hooks/exhaustive-deps

  // Event has ended
  if (time.totalMs <= 0) {
    return (
      <div className='rounded-xl border border-gray-200 bg-gray-50 px-6 py-8 text-center'>
        <p className='text-lg font-heading font-semibold text-gray-500'>This event has ended</p>
      </div>
    )
  }

  // Within 1 hour of start
  if (time.totalMs <= ONE_HOUR_MS) {
    return (
      <div className='rounded-xl border border-primary/30 bg-primary/5 px-6 py-8 text-center'>
        <p className='text-lg font-heading font-semibold text-primary'>Registration Open &mdash; happening now</p>
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center gap-3 sm:gap-5'>
      <TimeBox value={time.days} label='Days' />
      <span className='mt-[-1.25rem] text-2xl font-bold text-gray-300' aria-hidden='true'>
        :
      </span>
      <TimeBox value={time.hours} label='Hours' />
      <span className='mt-[-1.25rem] text-2xl font-bold text-gray-300' aria-hidden='true'>
        :
      </span>
      <TimeBox value={time.minutes} label='Minutes' />
      <span className='mt-[-1.25rem] text-2xl font-bold text-gray-300' aria-hidden='true'>
        :
      </span>
      <TimeBox value={time.seconds} label='Seconds' />
    </div>
  )
}
