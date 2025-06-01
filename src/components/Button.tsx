import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading = false,
}: ButtonProps) {
  return (
    <button
      onClick={loading ? undefined : onClick}
      className={`
        ${variantClasses[variant]} 
        ${defaultStyles} 
        ${fullWidth ? "w-full justify-center pr-7" : ""}
        ${loading ? "opacity-45 cursor-not-allowed" : "cursor-pointer"}
      `}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          Loading...
        </>
      ) : (
        <>
          {startIcon && <div className="pr-2">{startIcon}</div>}
          {text}
        </>
      )}
    </button>
  );
}
