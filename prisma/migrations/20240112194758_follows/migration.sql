-- CreateTable
CREATE TABLE "_PetFollowers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PetFollowing" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PetFollowers_AB_unique" ON "_PetFollowers"("A", "B");

-- CreateIndex
CREATE INDEX "_PetFollowers_B_index" ON "_PetFollowers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PetFollowing_AB_unique" ON "_PetFollowing"("A", "B");

-- CreateIndex
CREATE INDEX "_PetFollowing_B_index" ON "_PetFollowing"("B");

-- AddForeignKey
ALTER TABLE "_PetFollowers" ADD CONSTRAINT "_PetFollowers_A_fkey" FOREIGN KEY ("A") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetFollowers" ADD CONSTRAINT "_PetFollowers_B_fkey" FOREIGN KEY ("B") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetFollowing" ADD CONSTRAINT "_PetFollowing_A_fkey" FOREIGN KEY ("A") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetFollowing" ADD CONSTRAINT "_PetFollowing_B_fkey" FOREIGN KEY ("B") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
