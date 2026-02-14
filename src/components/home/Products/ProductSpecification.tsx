export const ProductSpecs = ({ specs }: { specs: { key: string, value: string }[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6 py-10">
    {specs.map((spec, i) => (
      <div key={i} className="flex justify-between border-b border-gray-50 pb-4">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{spec.key}</span>
        <span className="text-xs font-semibold text-brand-primary">{spec.value}</span>
      </div>
    ))}
  </div>
);