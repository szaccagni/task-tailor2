import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from '../server/api/root'

type RouterOutput = inferRouterOutputs<AppRouter>;
type allTodosOutput = RouterOutput["todo"]["getAll"];

export type Todo = allTodosOutput[number];