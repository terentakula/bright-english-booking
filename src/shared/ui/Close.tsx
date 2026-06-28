type CloseProps = {
    toggleMenu: () => void
    isMenuOpen: boolean
}

export function Close({toggleMenu, isMenuOpen}: CloseProps) {
  return (
    <button
      type="button"
      onClick={toggleMenu}
      className=" inline-flex size-11 items-center justify-center rounded-2xl border border-brand-brown bg-white text-brand-brown transition hover:bg-brand-soft"
      aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
    >
      <span className="grid gap-1.5">
        <span
          className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? " opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </span>
    </button>
  );
}
