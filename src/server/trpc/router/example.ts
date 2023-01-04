import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({

  addPost: publicProcedure
    .input(
      z.object({
        title: z.string().min(1), content: z.string().min(3),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session?.user) {
        return await ctx.prisma.post.create(
          {
            data: { title: input.title, content: input.content, userId: ctx.session?.user.id }
          }

        )

      }
      else {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

    }),
  getPosts: publicProcedure
    .input(
      z.object({}).nullish()
    ).query(async function ({ctx}) {
      return await ctx.prisma.post.findMany({include:{user : true}});
    })
});

//trpc = function that has an input and query
//query = the process that will happen to the data 
