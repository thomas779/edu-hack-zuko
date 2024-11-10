"use-client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import ApiService from "@/ApiService";
import { setCookie } from "@/helper";
import { HashLoader } from "react-spinners";

interface AuthUser {
  vaultId: string | null;
  jwt: string | null;
  newUser: string | null;
}

function AuthUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const cookies = new Cookies();
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    setUser({
      vaultId: searchParams.get("vaultId"),
      jwt: searchParams.get("jwt"),
      newUser: searchParams.get("newUser"),
    });
  }, [loading]);

  const handleSubmitUsername = async () => {
    setLoading(true);
    if (user) {
      const res = await ApiService.createUser(user.vaultId as string, userName);
      if (res) {
        setUser(null); // set user to null again
        await setCookie({
          vault_id: res.vault_id,
          username: userName,
        });
        setLoading(false);
        router.push("/dashboard/home");
      }
    }
  };

  return (
    <div>
      {user?.newUser === "true" ? (
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Welcome to Zuko!
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Choose your username and embrace complete anonymity in this forum,
            powered by the magic of ZK!
          </p>

          <Input
            id="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={"Input username..."}
            className="no-focus searchbar_input"
          />
          <br></br>

          <Button className="gap-5" onClick={handleSubmitUsername}>
            Submit
          </Button>
          <br></br>
          {loading ? 
          <HashLoader 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
            color="000000"
            /> 
            : null
          }
        </div>
      ) : null}
    </div>
  );
}

export default AuthUser;
