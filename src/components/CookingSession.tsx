import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { GeneratedRecipe } from '../types'

interface Props {
  recipe: GeneratedRecipe
  onClose: () => void
}

export function CookingSession({ recipe, onClose }: Props) {
  const [step, setStep] = useState(0)
  const total = recipe.steps.length

  // WakeLock API — keep screen on
  useEffect(() => {
    let lock: WakeLockSentinel | null = null
    if ('wakeLock' in navigator) {
      (navigator as Navigator & { wakeLock: { request(type: string): Promise<WakeLockSentinel> } }).wakeLock
        .request('screen')
        .then(l => { lock = l })
        .catch(() => {})
    }
    return () => { lock?.release() }
  }, [])

  return (
    <div className="fixed inset-0 bg-[#000000] z-[100] flex flex-col text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <button onClick={onClose} className="text-gray-400 text-sm">Beenden</button>
        <span className="text-sm text-gray-400">{step + 1} / {total}</span>
      </div>

      {/* Progress bar */}
      <div className="px-4 mb-6">
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
      </div>

      {/* Step */}
      <div className="flex-1 flex items-center px-6">
        <div>
          <div className="text-5xl font-bold text-orange-500 mb-6">{step + 1}</div>
          <p className="text-xl leading-relaxed">{recipe.steps[step].text}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 px-6 pb-12">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex-1 bg-gray-800 disabled:opacity-30 rounded-2xl py-4 flex items-center justify-center"
        >
          <ChevronLeft size={28} />
        </button>
        {step < total - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            className="flex-1 bg-orange-500 rounded-xl py-4 flex items-center justify-center"
          >
            <ChevronRight size={28} />
          </button>
        ) : (
          <button onClick={onClose} className="flex-1 bg-orange-500 rounded-xl py-4 font-bold">
            Fertig
          </button>
        )}
      </div>
    </div>
  )
}
