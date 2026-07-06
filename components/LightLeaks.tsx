type LightLeaksProps = {
  className?: string;
};

export default function LightLeaks({ className = "" }: LightLeaksProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-500/10 mix-blend-screen blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-900/10 mix-blend-screen blur-[120px]" />
    </div>
  );
}
