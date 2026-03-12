export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.06)_0%,_transparent_50%)]" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(148,163,184,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />
      <div className="relative z-10 w-full max-w-md px-4">{children}</div>
    </div>
  );
}
