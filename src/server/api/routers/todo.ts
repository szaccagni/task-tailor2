import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: {
        authorId: ctx.userId
      }
    })
  }),

  create: privateProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        dueDate: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const newTodo = await ctx.prisma.todo.create({
        data: {
          authorId,
          title: input.title,
          description: input.description,
          dueDate: new Date(input.dueDate),
        },
      });

      return newTodo;
    }),
});
