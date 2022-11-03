import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export default async function guessRoutes(app: FastifyInstance) {
  app.get("/guesses/count", async () => {
    const count = await prisma.guess.count();
    return { count };
  });
}
