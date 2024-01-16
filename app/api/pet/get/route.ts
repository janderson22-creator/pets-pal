import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
  const prisma = new PrismaClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("userId");
  const slug = searchParams.get("slug");

  if (!id && !slug) {
    return new Response("userId or petId are required fields.", {
      status: 400,
    });
  }

  let pets;

  if (id) {
    pets = await prisma.pet.findMany({
      where: {
        userId: id,
      },
    });
  } else if (slug) {
    const pet = await prisma.pet.findFirst({
      where: {
        slug: {
          contains: slug,
          mode: "insensitive",
        },
      },
    });

    if (!pet) {
      return new Response("Pet not found", {
        status: 404,
      });
    }

    pets = [pet];
  }

  return new Response(JSON.stringify({ pets }), {
    headers: { "Content-Type": "application/json" },
  });
}
