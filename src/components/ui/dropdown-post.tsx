import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { UsePost } from "@/context/publication";
import { usePet } from "@/context/pet";
import { useEffect, useMemo } from "react";

interface Props {
  idPost: string;
  idPet: string;
}

const DropdownPost: React.FC<Props> = ({ idPost, idPet }) => {
  const { deletePublication } = UsePost();
  const { pets } = usePet();

  const isMyPost = useMemo(() => {
    const petIds = pets?.map((pet) => pet.id);

    return petIds?.some((pet) => pet === idPet);
  }, [pets, idPet]);

  return (
    <DropdownMenu>
      <div className="ml-auto">
        <DropdownMenuTrigger asChild>
          <MoreVertical size={18} />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mr-5">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => deletePublication(idPost, isMyPost)}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Excluir</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

export default DropdownPost;
