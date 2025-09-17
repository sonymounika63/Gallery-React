// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const LinkItem = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      cn(
        navigationMenuTriggerStyle(),
        "px-3",
        isActive ? "bg-primary/10 text-primary" : ""
      )
    }
    end={to === "/"}
  >
    {label}
  </NavLink>
);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <NavLink to="/" className="font-semibold tracking-tight text-primary">
          Global iMatrix
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <LinkItem to="/" label="Home" />
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <LinkItem to="/about" label="About Us" />
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <LinkItem to="/gallery" label="Gallery" />
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <LinkItem to="/contact" label="Contact Us" />
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="px-4 py-4 border-b">
                <NavLink
                  to="/"
                  className="font-semibold tracking-tight text-primary"
                >
                  Global iMatrix
                </NavLink>
              </div>

              <div className="flex flex-col p-2">
                <LinkItem to="/" label="Home" />
                <LinkItem to="/about" label="About Us" />
                <LinkItem to="/gallery" label="Gallery" />
                <LinkItem to="/contact" label="Contact Us" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
