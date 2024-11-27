import MobileMenu from "@/components/MobileMenu";
import NavbarLinks from "@/components/NavbarLinks";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      {/* Logo */}
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold">
            Game<span className="text-primary">tamin</span>
          </h1>
        </Link>
      </div>

      {/* Links */}
      <NavbarLinks />

      {/* Login-Register */}
      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        <Button>Login</Button>
        <Button variant={"secondary"}>Register</Button>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu></MobileMenu>
        </div>
      </div>
    </nav>
  );
}
