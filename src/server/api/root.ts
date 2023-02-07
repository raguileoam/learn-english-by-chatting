import { createTRPCRouter } from "./trpc";
import { generateTextRouter } from "./routers/generateText";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  generateText: generateTextRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
