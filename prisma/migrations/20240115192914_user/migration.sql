-- DropForeignKey
ALTER TABLE "_PetFollowers" DROP CONSTRAINT "_PetFollowers_A_fkey";

-- DropForeignKey
ALTER TABLE "_PetFollowers" DROP CONSTRAINT "_PetFollowers_B_fkey";

-- DropForeignKey
ALTER TABLE "_PetFollowing" DROP CONSTRAINT "_PetFollowing_A_fkey";

-- DropForeignKey
ALTER TABLE "_PetFollowing" DROP CONSTRAINT "_PetFollowing_B_fkey";

-- AddForeignKey
ALTER TABLE "_PetFollowers" ADD CONSTRAINT "_PetFollowers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetFollowers" ADD CONSTRAINT "_PetFollowers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetFollowing" ADD CONSTRAINT "_PetFollowing_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetFollowing" ADD CONSTRAINT "_PetFollowing_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
