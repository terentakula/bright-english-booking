import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={clsx(
        "w-full min-w-0 rounded-2xl bg-white border border-orange-100 px-4 py-3 outline-none transition focus:border-brand-orange",
        className,
      )}
      {...props}
    />
  );
}
