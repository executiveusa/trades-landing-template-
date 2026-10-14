// Authored line icons, one stroke weight (2). No icon library, no emoji.
type P = { className?: string }

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

export function ChatIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 5h16v11H11l-5 4v-4H4z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  )
}

export function PhoneIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z" />
    </svg>
  )
}

export function ArrowIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function CheckIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}
