import { Home, TrendingUp, ShoppingCart, Settings } from 'lucide-react'

type Tab = 'home' | 'trends' | 'shop' | 'settings'

interface Props {
  active: Tab
  onChange: (tab: Tab) => void
}

const TABS: { id: Tab; icon: typeof Home; label: string }[] = [
  { id: 'home',     icon: Home,          label: 'Heute' },
  { id: 'trends',   icon: TrendingUp,    label: 'Trends' },
  { id: 'shop',     icon: ShoppingCart,  label: 'Einkauf' },
  { id: 'settings', icon: Settings,      label: 'Einstellungen' },
]

export function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-black border-t border-gray-200 dark:border-[#38383a] flex" style={{ paddingBottom: 'var(--safe-bottom)' }}>
      {TABS.map(tab => {
        const Icon = tab.icon
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition-colors ${
              isActive
                ? 'text-orange-500 dark:text-orange-400'
                : 'text-gray-400 dark:text-[#8e8e93]'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
