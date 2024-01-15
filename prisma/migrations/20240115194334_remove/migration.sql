/*
  Warnings:

  - You are about to drop the `_PetFollowers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PetFollowing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PetFollowers" DROP CONSTRAINT "_PetFollowers_A_fkey";

-- DropForeignKey
ALTER TABLE "_PetFollowers" DROP CONSTRAINT "_PetFollowers_B_fkey";

-- DropForeignKey
ALTER TABLE "_PetFollowing" DROP CONSTRAINT "_PetFollowing_A_fkey";

-- DropForeignKey
ALTER TABLE "_PetFollowing" DROP CONSTRAINT "_PetFollowing_B_fkey";

-- DropTable
DROP TABLE "_PetFollowers";

-- DropTable
DROP TABLE "_PetFollowing";
