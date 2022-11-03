import cors from "@fastify/cors";
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
  await app.register(cors, {
    origin: true,
  });
  await app.register(authRoutes);
  await app.register(pollRoutes);
  await app.register(userRoutes);
  await app.register(gameRoutes);
  await app.register(guessRoutes);
  await app.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
