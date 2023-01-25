import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";


const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});


export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  const { req, res } = _opts
  return { req, res };
};

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
