import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        "w-full min-w-0 bg-white rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-brand-orange",
        className,
      )}
      {...props}
    />
  );
}
