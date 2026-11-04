interface Props {
  proteinG: number
  carbsG: number
  fatG: number
  size?: number
}

export function MacroRing({ proteinG, carbsG, fatG, size = 120 }: Props) {
  const total = proteinG + carbsG + fatG
  if (total === 0) return null

  const r = 40
  const cx = 60
  const cy = 60
  const circumference = 2 * Math.PI * r

  const segments = [
    { value: proteinG, color: '#ef4444', label: 'Protein' },
    { value: carbsG,   color: '#3b82f6', label: 'Kohlenhydrate' },
    { value: fatG,     color: '#92400e', label: 'Fett' },
  ]

  let offset = 0
  const arcs = segments.map(seg => {
    const fraction = seg.value / total
    const dash = fraction * circumference
    const arc = { ...seg, dash, offset, fraction }
    offset += dash
    return arc
  })

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox="0 0 120 120">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="18" />
        {arcs.map(arc => (
          <circle
            key={arc.label}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={arc.color}
            strokeWidth="18"
            strokeDasharray={`${arc.dash} ${circumference - arc.dash}`}
            strokeDashoffset={-arc.offset}
            strokeLinecap="butt"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px' }}
          />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="currentColor" className="font-semibold">
          {Math.round(total)}g
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" fontSize="9" fill="#9ca3af">Makros</text>
      </svg>
      <div className="flex flex-col gap-1 text-xs">
        {segments.map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: s.color }} />
            <span className="text-gray-500 dark:text-gray-400">{s.label}</span>
            <span className="font-medium ml-auto pl-2">{Math.round(s.value)}g</span>
          </div>
        ))}
      </div>
    </div>
  )
}
