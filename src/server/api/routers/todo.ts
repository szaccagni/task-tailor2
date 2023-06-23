import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: {
        authorId: ctx.userId
      }
    })
    return todos.map(todo => todo)
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
          status: 'NOT STARTED'
        },
      });

      return newTodo;
    }),

  delete: privateProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.prisma.todo.delete({
      where: {
        id: input
      },
    })
  }),

  updateStatus: privateProcedure.input(
    z.object({
      id: z.string(),
      status: z.string()
    })
  ).mutation(({ ctx, input }) => {
    const { id, status } = input
    return ctx.prisma.todo.update({
      where: {
        id,
      },
      data: {
        status,
      }
    })
  }),

  getOneTodo: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.prisma.todo.findFirst({
      where: {
        id: input
      }
    })
  }),
});
