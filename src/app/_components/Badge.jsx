const variants = {
  default:
    "border border-white bg-zinc-900 text-white hover:bg-zinc-800 transition-all duration-300 ease-out cursor-pointer",
  secondary:
    "border bg-white border-black text-black hover:bg-zinc-200 transition-all duration-300 ease-out cursor-pointer",
};

export const Badge = ({ children, variant, className = "" }) => {
  const variantStyle = variants[variant] || variants.default;

  return (
    <div
      className={`py-1 px-3 rounded-full inline-flex items-center justify-center text-xs font-medium whitespace-nowrap ${variantStyle} ${className}`}
    >
      {children}
    </div>
  );
};
