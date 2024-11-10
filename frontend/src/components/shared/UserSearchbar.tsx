"use client";

import ApiService from "@/ApiService";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import UserCard from "../cards/UserCard";
import UserList from "../lists/UserList";

interface UserData {
  username: string;
  vaultId: string;
}

function UserSearchBar() {
  const [vaultId, setVaultId] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleUserSearch = async () => {
    const data = await ApiService.fetchUserByVaultId(vaultId);
    setUserData(data);
  };

  return (
    <div>
      <div className="searchbar">
        <Image
          src="/assets/magnifying-glass-solid.svg"
          alt="search"
          width={22}
          height={22}
          className="object-contain"
        />
        <Input
          id="text"
          value={vaultId}
          onChange={(e) => setVaultId(e.target.value)}
          placeholder={"Enter VaultID..."}
          className="no-focus searchbar_input"
        />
        <Button className="gap-5 bg-primary/10 hover:bg-primary/30" onClick={handleUserSearch}>
          Search
        </Button>
      </div>
      <div className="flex flex-col gap-9rounded-lg p-5">
        {userData ? (
          <>
            <UserCard
              key={userData.vaultId}
              vaultid={userData.vaultId}
              username={userData.username}
            />
            <hr />
          </>
        ) : (
          <div>
            <UserList />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSearchBar;
