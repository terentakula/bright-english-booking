import { NavLink } from "react-router-dom";
import { ROUTES } from "../../app/router/routes";
import { Container } from "./Container";
import { businessConfig } from "../config/business.config";
import { useState } from "react";
import { Close } from "./Close";
import { Logo } from "./Logo";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useAuthStore } from "../../features/auth/auth.store";

const navLinks = [
  {
    label: "Главная",
    to: ROUTES.home,
  },
  {
    label: "Курсы",
    to: ROUTES.services,
  },
  {
    label: "Запись",
    to: ROUTES.booking,
  },
  {
    label: "Кабинет",
    to: ROUTES.clientDashboard,
    roles: ["client"],
  },
  {
    label: "Admin",
    to: ROUTES.adminDashboard,
    roles: ["admin"],
  },
];

const menuVariants: Variants = {
  closed: {
    x: "-100%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  open: {
    x: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 0, 0.36, 1],
    },
  },
};

const linkListVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      staggerChildren: 0.15,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.2,
    },
  },
};

const linkVariants: Variants = {
  closed: {
    x: 24,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.logout);

  const visidleNavLinks = navLinks.filter((link) => {
    if (!link.roles) {
      return true
    }

    return link.roles.includes(role);
  });

  function handleLogout() {
    logout();
    closeMenu();
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((current) => !current);
  }

  return (
    <header className="fixed w-full left-0 top-0 z-40 border-b border-brand-soft bg-brand-soft/50 backdrop-blur-xl">
      <Container>
        <div className="relative z-50 flex min-h-20 items-center justify-between gap-6">
          <Logo closeMenu={closeMenu} businessConfig={businessConfig} />

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-1 rounded-2xl bg-brand-page p-1 lg:flex">
              {visidleNavLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      "flex rounded-2xl p-4 text-base font-bold transition",
                      isActive
                        ? "bg-brand-cream text-brand-orange"
                        : "text-brand-brown hover:bg-brand-soft hover:text-brand-orange",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            {role !== "guest" ? (
              <NavLink
                to={ROUTES.login}
                onClick={handleLogout}
                className="rounded-2xl bg-brand-brown px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Выйти
              </NavLink>
            ) : (
              <NavLink
                to={ROUTES.login}
                onClick={handleLogout}
                className="rounded-2xl bg-brand-brown px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Войти
              </NavLink>
            )}
            <div className="lg:hidden">
              <Close toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            </div>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Закрыть меню"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" fixed h-dvh inset-0 z-40 cursor-default bg-brand-soft/40 backdrop-blur-xl"
            />

            <motion.aside
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 w-[320px] h-dvh px-5 py-10 z-50 bg-brand-brown shadow-2xl shadow-brand-brown/40 backdrop-blur-3xl"
            >
              <motion.nav
                variants={linkListVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col gap-4"
              >
                {visidleNavLinks.map((link) => (
                  <motion.div key={link.to} variants={linkVariants}>
                    <NavLink
                      to={link.to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        [
                          "flex rounded-2xl p-4 text-base font-bold transition",
                          isActive
                            ? "bg-white text-brand-orange"
                            : "bg-white/10 text-white hover:text-brand-orange",
                        ].join(" ")
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>
              
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
