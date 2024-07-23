// src/server/routers/example.ts
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  addPost: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(3),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session?.user) {
        return await ctx.prisma.post.create({
          data: {
            title: input.title,
            content: input.content,
            userId: ctx.session?.user.id,
          },
        });
      } else {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
  getPosts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.post.findMany({
      include: {
        user: true,
      },
    });
  }),
  deleteOldPosts: publicProcedure
    .input(
      z.object({
        beforeDate: z.string(), // expecting date in ISO string format
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session?.user) {
        const beforeDate = new Date(input.beforeDate);
        await ctx.prisma.post.deleteMany({
          where: {
            createdAt: {
              lt: beforeDate,
            },
          },
        });
        return { success: true };
      } else {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});