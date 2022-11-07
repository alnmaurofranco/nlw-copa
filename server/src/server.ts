import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import env from "@fastify/env";
import Fastify from "fastify";
import authRoutes from "./routes/auth.routes";
import gameRoutes from "./routes/game.routes";
import guessRoutes from "./routes/guess.routes";
import pollRoutes from "./routes/poll.routes";
import userRoutes from "./routes/user.routes";

async function bootstrap() {
  const app = Fastify({
    logger: true,
  });
  await app.register(env, {
    dotenv: true,
    schema: {
      type: "object",
      required: ["PORT"],
      properties: {
        PORT: {
          type: "number",
          default: 3000,
        },
      },
    },
  });
  await app.register(cors, {
    origin: true,
  });
  await app.register(jwt, {
    secret: String(process.env.JWT_KEY_SECRET),
  });
  await app.register(authRoutes);
  await app.register(pollRoutes);
  await app.register(userRoutes);
  await app.register(gameRoutes);
  await app.register(guessRoutes);
  await app.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
