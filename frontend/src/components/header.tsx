import { cva } from "class-variance-authority";
import { NavLink, useLocation, useMatch, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItemVariants = cva("no-underline hover:no-underline", {
  variants: {
    active: {
      true: "text-brand-base font-semibold",
      false: "text-gray-600 hover:bg-gray-100",
    },
  },
  defaultVariants: {
    active: false,
  },
});

const navItems = [
  { label: "Dashboard", to: "/dashboard", end: true },
  { label: "Transações", to: "/dashboard/transactions", end: false },
  { label: "Categorias", to: "/dashboard/categories", end: false },
];

type HeaderNavItemProps = {
  label: string;
  to: string;
  end: boolean;
};

function HeaderNavItem({ label, to, end }: HeaderNavItemProps) {
  const isActive = Boolean(useMatch({ path: to, end }));

  return (
    <Button
      asChild
      variant="link"
      className={cn("h-9 px-3", navItemVariants({ active: isActive }))}
    >
      <NavLink to={to} end={end}>
        {label}
      </NavLink>
    </Button>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const {
  //   user: { name },
  // } = useAuthStore();

  const shouldShowHeader =
    pathname.startsWith("/dashboard") || pathname.startsWith("/account");

  if (!shouldShowHeader) {
    return null;
  }

  function handleNavigateToAccount() {
    navigate("/account");
  }

  return (
    <header className="h-17.25 flex items-center border-b border-gray-200 bg-white">
      <main className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between">
        <img src={logo} className="h-8 w-33.5" alt="Financy" />
        <nav
          className="flex items-center gap-2"
          aria-label="Navegacao principal"
        >
          {navItems.map((item) => (
            <HeaderNavItem
              key={item.label}
              label={item.label}
              to={item.to}
              end={item.end}
            />
          ))}
        </nav>
        <Avatar className="cursor-pointer" onClick={handleNavigateToAccount}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </main>
    </header>
  );
}
