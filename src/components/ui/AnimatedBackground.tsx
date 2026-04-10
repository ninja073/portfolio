import { useTheme } from '@/context/useTheme'

export function AnimatedBackground() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid dot pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${
            isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'
          } 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      {/* Floating gradient orb 1 */}
      <div
        className="absolute -left-32 -top-32 h-96 w-96 animate-float rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent 70%)',
          animationDelay: '0s',
        }}
      />

      {/* Floating gradient orb 2 */}
      <div
        className="absolute -bottom-32 -right-32 h-96 w-96 animate-float rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4), transparent 70%)',
          animationDelay: '-3s',
        }}
      />

      {/* Floating gradient orb 3 */}
      <div
        className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 animate-float rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)',
          animationDelay: '-1.5s',
        }}
      />
    </div>
  )
}
