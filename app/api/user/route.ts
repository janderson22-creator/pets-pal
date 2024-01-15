import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
  const prisma = new PrismaClient();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const id = searchParams.get("id");

  if (!email && !id) {
    return new Response("Email or id are required fields.", {
      status: 400,
    });
  }

  let user;

  if (email) {
    user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: { followers: true, following: true },
    });
  } else if (id) {
    user = await prisma.user.findUnique({
      where: { id: id },
      include: { followers: true, following: true },
    });
  }

  if (!user) {
    return new Response("User not found.", {
      status: 404,
    });
  }

  return Response.json(user);
}
