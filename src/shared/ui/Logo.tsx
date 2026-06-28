import { NavLink } from "react-router-dom";
import { ROUTES } from "../../app/router/routes";


type LogoProps = {
    closeMenu: () => void
    businessConfig: {
        shortName: string
        name: string
        tagline: string
    }
}
export function Logo({closeMenu, businessConfig}: LogoProps) {
    return (
        <NavLink
            to={ROUTES.home}
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-brand-orange text-lg text-white font-black shadow-sm  shadow-brand-brown">
              {businessConfig.shortName}
            </div>

            <div>
              <p className="font-bold tracking-tight text-brand-brown">
                {businessConfig.name}
              </p>
              <p className="text-xs font-medium text-brand-brown/70">
                {businessConfig.tagline}
              </p>
            </div>
          </NavLink>
    )
}