export function RadioGroup({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="text-sm font-semibold text-gray-700">{label}</span>
      )}
      {children}
    </div>
  );
}
