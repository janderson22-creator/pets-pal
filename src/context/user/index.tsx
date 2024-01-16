"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ContextValue = {
  user: User | undefined;
};

export const UserContext = React.createContext<ContextValue | undefined>(
  undefined,
);

export const UserProvider: React.FC<ChildrenProps> = ({
  children,
  ...rest
}) => {
  const { data } = useSession();
  const [user, setUser] = useState<User>();

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`/api/user?email=${data?.user?.email}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error to get user:", error);
    }
  }, [data?.user?.email]);

  const fetchUserFollowers = useCallback(async () => {
    try {
      const response = await axios.get(`/api/user?id=${user?.id}`);
      // console.log(response);
    } catch (error) {
      console.error("Error to get user followers:", error);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!data?.user?.email) return;

    fetchUser();
  }, [data, fetchUser]);

  useEffect(() => {
    if (!user?.id) return;

    fetchUserFollowers();
  }, [data, fetchUser, fetchUserFollowers, user?.id]);

  const value = useMemo(() => ({ user }), [user]);

  return (
    <UserContext.Provider value={value} {...rest}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): ContextValue => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within an CommerceProvider");
  }

  return context;
};

//
// Utils
//

interface ChildrenProps {
  children: React.ReactNode;
}
