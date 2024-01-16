"use client";

import { Pet } from "@prisma/client";
import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useUser } from "../user";

export type ContextValue = {
  fetchPetBySlug: (slug: string | undefined) => Promise<void>;
  postPet: (petData: Pet) => Promise<void>;
  deletePet: () => Promise<void>;
  pets: Pet[] | undefined;
  setCurrentPet: React.Dispatch<React.SetStateAction<Pet | undefined>>;
  currentPet: Pet | undefined;
  setCurrentPetPost: React.Dispatch<React.SetStateAction<Pet | undefined>>;
  currentPetPost: Pet | undefined;
  loadingPets: boolean;
  loadingPet: boolean;
};

export const PetContext = React.createContext<ContextValue | undefined>(
  undefined,
);

export const PetProvider: React.FC<ChildrenProps> = ({ children, ...rest }) => {
  const { user } = useUser();
  const [loadingPet, setLoadingPet] = useState(false);
  const [pets, setPets] = useState<Pet[]>();
  const [currentPet, setCurrentPet] = useState<Pet>();
  const [currentPetPost, setCurrentPetPost] = useState<Pet>();
  const [loadingPets, setLoadingPets] = useState<boolean>(false);

  const fetchPets = useCallback(async () => {
    setLoadingPets(true);

    try {
      const response = await axios.get(`/api/pet/get?userId=${user?.id}`);
      setPets(response.data.pets);
    } catch (error) {
      console.error("Error to get pets:", error);
    } finally {
      setLoadingPets(false);
    }
  }, [user?.id]);

  const fetchPetBySlug = useCallback(async (slug: string | undefined) => {
    if (!slug) return;
    setLoadingPet(true);
    try {
      const response = await axios.get(`/api/pet/get?slug=${slug}`);

      setCurrentPet(response.data.pets[0]);
    } catch (error) {
      console.error("Error to get pet:", error);
    } finally {
      setLoadingPet(false);
    }
  }, []);

  const postPet = useCallback(
    async (petData: Pet) => {
      try {
        const response = await axios.post(`/api/pet/post`, petData);
        fetchPets();
        console.log(response);
      } catch (error) {
        console.error("Erro ao criar pet:", error);
      }
    },
    [fetchPets],
  );

  const deletePet = useCallback(async () => {
    try {
      const response = await axios.delete(
        `/api/pet/delete?petId=${currentPet?.id}`,
      );
      console.log(response);
      fetchPets();
    } catch (error) {
      console.error("Error to delete pets:", error);
    }
  }, [currentPet?.id, fetchPets]);

  useEffect(() => {
    if (!user?.id) return;

    fetchPets();
  }, [fetchPets, user?.id]);

  const value = useMemo(
    () => ({
      setCurrentPet,
      currentPet,
      pets,
      loadingPets,
      postPet,
      deletePet,
      currentPetPost,
      setCurrentPetPost,
      fetchPetBySlug,
      loadingPet,
    }),
    [
      setCurrentPet,
      currentPet,
      pets,
      loadingPets,
      postPet,
      deletePet,
      currentPetPost,
      setCurrentPetPost,
      fetchPetBySlug,
      loadingPet,
    ],
  );

  return (
    <PetContext.Provider value={value} {...rest}>
      {children}
    </PetContext.Provider>
  );
};

export const usePet = (): ContextValue => {
  const context = useContext(PetContext);

  if (context === undefined) {
    throw new Error("usePet must be used within an CommerceProvider");
  }

  return context;
};

//
// Utils
//

interface ChildrenProps {
  children: React.ReactNode;
}
