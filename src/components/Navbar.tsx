import MobileMenu from "@/components/MobileMenu";
import NavbarLinks from "@/components/NavbarLinks";
import { Button } from "@/components/ui/button";
import UserNav from "@/components/UserNav";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

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
        {user ? (
          <UserNav
            email={user.email as string}
            name={user.given_name as string}
            userImage={
              user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
          />
        ) : (
          <div className="flex gap-x-2 items-center">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant={"secondary"} asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu></MobileMenu>
        </div>
      </div>
    </nav>
  );
}
