import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export default async function userRoutes(app: FastifyInstance) {
  app.get("/users/count", async () => {
    const count = await prisma.user.count();
    return { count };
  });
}
