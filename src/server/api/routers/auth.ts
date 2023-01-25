import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecret } from "../../../lib/auth";
import cookie from "cookie";

export const authRouter = createTRPCRouter({
    login: publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string(),
            })
        )
        .mutation(async ({ input: { email, password }, ctx: { res } }) => {
            if (
                email === process.env.ADMIN_EMAIL &&
                password === process.env.ADMIN_PASSWORD
            ) {
                const token = await new SignJWT({})
                    .setProtectedHeader({ alg: "HS256" })
                    .setJti(nanoid())
                    .setIssuedAt()
                    .setExpirationTime("1m")
                    .sign(new TextEncoder().encode(getJwtSecret()));

                res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("user-token", token, {
                        httpOnly: true,
                        path: "/",
                        secure: process.env.NODE_ENV === "production",
                    })
                );

                return;
            }

            return new TRPCError({
                code: "UNAUTHORIZED",
                message: "Invalid email or password.",
            });
        }),
});
