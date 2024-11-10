"use client";

import TypewriterTitle from "@/components/shared/TypewriterTitle";
import SkeletonLoading from "@/components/ui/SkeletonLoading";
import { Button } from "@/components/ui/button";
import SismoButton from "@/components/ui/sismoConnectButton";
import { getCookie } from "@/helper";
import useGetLoggedInUser from "@/hooks/useGetLoggedInUser";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HashLoader } from "react-spinners";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const cookie = getCookie();
  const router = useRouter();

  const handleEnterZuko = () => {
    router.push('/dashboard/home');
  }

  return (
    <div className="w-screen h-screen circles">
      <nav className="topbar px-5 py-5">
        <Link href="/" className="absolute">
            <Image
              src="/assets/zuko-logo-white-nobg.png"
              alt="logo"
              width={165}
              height={165}
            />
        </Link>
    <div className="flex items-center gap-1">
      <div className="block md:hidden"></div>
    </div>

    <div>
      <div className="flex items-center gap-5">
        <Link href="https://documenter.getpostman.com/view/24722250/2s9YR6ZtJc">
          <Image
              src="/assets/book-solid.svg"
              alt="logo"
              width={30}
              height={30}
              className="cursor-pointer"
            />
        </Link>
        <Link href="https://github.com/usezuko">
          <Image
            src="/assets/github.svg"
            alt="logo"
            width={30}
            height={30}
            className="cursor-pointer hover:"
          />
        </Link>
      </div>
    </div>
    </nav>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        {loading ? (
          <h1 className="font-semibold text-5xl text-center blue-text-gradient">
            <HashLoader 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
              color="000000"
            />
          </h1>
        ) : (
          <div>
            {" "}
            <h1 className="font-semibold text-6xl text-center">
              Zuko
            </h1>
            <div className="mt-4"></div>
            <h2 className="font-semibold text-4xl text-center">
              Permissionless, Privacy-Focused Social dApp
            </h2>
            <div className="mt-4"></div>
            <h3 className="font-semibold text-2xl text-center text-black">
              <TypewriterTitle />
            </h3>
            <div className="mt-4"></div>
            <div className="flex justify-center">
              {cookie ? 
              <Button 
                onClick={handleEnterZuko}
                className="w-250 h-250 font-bold text-2xl bg-primary/10 rouded-lg"
              >
                Enter Zuko <ArrowRight size={30} />
              </Button> : (
                <SismoButton loading={loading} setLoading={setLoading} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
