import type { ReactNode } from "react";

type Varients = "primary" | "secondary";
type Size = "md" | "sm" | "lg";
export interface ButtonProps {
  varient: Varients;
  size?: Size;
  startIcon?: any;
  endIcon?: any;
  onclick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const varientStyles = {
  primary: "bg-foreground text-background",
  secondary: "bg-muted text-foreground",
};
const sizeStyles = {
  sm: "text-sm px-2 py-1 rounded-sm cursor-pointer",
  md: "text-sm px-4 py-2 rounded-md cursor-pointer",
  lg: "text-base px-6 py-2 rounded-lg cursor-pointer",
};

export const Button = (props: ButtonProps) => {
  const size = props.size || "md";

  const disabledClass = props.disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${varientStyles[props.varient]} ${sizeStyles[size]} flex items-center justify-center gap-1 shadow-sm transition duration-300 ease-in-out ${props.varient === "primary" ? "hover:bg-foreground/90" : props.varient === "secondary" ? "hover:bg-muted/30" : ""} ${disabledClass} ${props.className} `}
      onClick={props.onclick}
      disabled={props.disabled}
    >
      {props.startIcon} {props.children} {props.endIcon}
    </button>
  );
};

<Button varient="primary" size="md" onclick={() => {}}>
  Hi
</Button>;
