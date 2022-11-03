import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export default async function pollRoutes(app: FastifyInstance) {
  app.get("/polls/count", async () => {
    const count = await prisma.poll.count();
    return { count };
  });
  app.post("/polls/create", async (request, reply) => {
    const createPoolBodySchema = z.object({
      title: z.string(),
    });
    if (!createPoolBodySchema.safeParse(request.body).success) {
      return new Error();
    }
    const { title } = createPoolBodySchema.parse(request.body);
    const generatorCode = new ShortUniqueId({ length: 6 });
    const code = String(generatorCode()).toUpperCase();
    await prisma.poll.create({
      data: {
        title,
        code,
      },
    });
    return reply.code(201).send({ code });
  });
}
