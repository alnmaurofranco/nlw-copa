import axios from "axios";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/auth/users", async (request, reply) => {
    const createUserBodySchema = z.object({
      access_token: z.string(),
    });
    if (!createUserBodySchema.safeParse(request.body).success) {
      return new Error();
    }
    const { access_token } = createUserBodySchema.parse(request.body);
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
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
    return { userInfo };
  });
}
