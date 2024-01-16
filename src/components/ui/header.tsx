"use client";

import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PawPrint,
  Search,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { ModeToggle } from "./toggle-dark-mode";
import { useTheme } from "next-themes";
import PetLogoLight from "../../../public/pets-logo-light.png";
import PetLogoDark from "../../../public/pets-logo-dark.png";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePet } from "@/context/pet";

const Header = () => {
  const { status, data } = useSession();
  const [loading, setLoading] = useState(true);
  const { setCurrentPet } = usePet();
  const { theme } = useTheme();

  useEffect(() => {
    if (theme) {
      setLoading(false);
    }
  }, [theme]);

  const logoImg = useMemo(() => {
    if (!loading) {
      if (theme && theme === "light") {
        return PetLogoLight;
      }

      if (theme && theme === "dark") {
        return PetLogoDark;
      }

      return null;
    }
  }, [loading, theme]);

  const loginClick = async () => {
    await signIn();
  };

  const logoutClick = async () => {
    await signOut();
  };

  return (
    <Card className="flex justify-between rounded-[0px] px-7 py-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          <div className="mt-2 flex flex-col gap-2">
            {status === "authenticated" && data?.user && (
              <div className="my-2 flex flex-col">
                <div className="flex items-center gap-2 pb-2 pt-4">
                  <Avatar>
                    <AvatarFallback>
                      {data.user?.name?.[0].toUpperCase()}
                    </AvatarFallback>

                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>

                  <p className="text-sm font-medium">{data.user.name}</p>
                </div>
                <Separator />
              </div>
            )}

            {status === "unauthenticated" && (
              <Button
                onClick={loginClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            )}

            <SheetClose asChild>
              <Link onClick={() => setCurrentPet(undefined)} href="/">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HomeIcon size={16} />
                  Início
                </Button>
              </Link>
            </SheetClose>

            {data && (
              <SheetClose asChild>
                <Link
                  onClick={() => setCurrentPet(undefined)}
                  href={`/profile`}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <PawPrint size={16} />
                    Profile
                  </Button>
                </Link>
              </SheetClose>
            )}

            <Button variant="outline" className="w-full justify-start gap-2">
              <Search size={16} />
              Search
            </Button>

            {status === "authenticated" && (
              <Button
                onClick={logoutClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogOutIcon size={16} />
                Sair
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {loading ? (
        <div className="min-h-[50px] min-w-[50px]" />
      ) : (
        <Link href="/">
          <Image
            alt={"pets-logo"}
            src={logoImg || ""}
            width={50}
            height={50}
            className="max-h-[50px] max-w-[50px]"
            priority
          />
        </Link>
      )}

      <ModeToggle />
    </Card>
  );
};

export default Header;
