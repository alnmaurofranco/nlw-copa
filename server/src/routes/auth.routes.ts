import axios from "axios";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export default async function authRoutes(app: FastifyInstance) {
  app.get("/me", async (request) => {
    await request.jwtVerify();
    return { user: request.user };
  });
  app.get("/auth/v1/google/callback", async (request) => {
    // console.log(request);
    return { data: 0 };
  });
  app.post("/auth/users", async (request, reply) => {
    const createUserBodySchema = z.object({
      access_token: z.string(),
    });
    if (!createUserBodySchema.safeParse(request.body).success) {
      return new Error();
    }
    const { access_token } = createUserBodySchema.parse(request.body);
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const userData = userResponse.data;
    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });
    if (!userInfoSchema.safeParse(userData).success) {
      return new Error("Invalid user data");
    }
    const userInfo = userInfoSchema.parse(userData);
    let user: any = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          avatarUrl: userInfo.picture,
        },
      });
    }
    const token = app.jwt.sign(
      { name: user.name, avatarUrl: user.avatarUrl },
      {
        expiresIn: "15m",
        sub: user.id,
      }
    );

    return { token };
  });
}
