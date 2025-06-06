import { initTRPC } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// Initialize tRPC
const t = initTRPC.create();

// Create router and procedure helpers
const router = t.router;
const publicProcedure = t.procedure;

// Example context type
interface Context {
  user?: {
    id: string;
    name: string;
  };
}

// Create tRPC instance with context
const trpc = initTRPC.context<Context>().create();

// Helper to create authenticated procedures
const authenticatedProcedure = trpc.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

// Example procedures
const appRouter = trpc.router({
  // Public greeting procedure
  greeting: trpc.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        message: `Hello, ${input.name}!`,
        timestamp: new Date().toISOString(),
      };
    }),

  // Protected user info procedure
  getUserInfo: authenticatedProcedure.query(({ ctx }) => {
    return {
      user: ctx.user,
      serverTime: new Date().toISOString(),
    };
  }),

  // Example mutation with error handling
  updateUserName: authenticatedProcedure
    .input(z.object({ name: z.string().min(1).max(50) }))
    .mutation(({ input, ctx }) => {
      if (input.name.includes("admin")) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: 'Username cannot contain "admin"',
        });
      }

      // Simulate updating user name
      return {
        success: true,
        user: {
          ...ctx.user,
          name: input.name,
        },
      };
    }),

  // Example procedure that might throw various errors
  riskOperation: trpc.procedure
    .input(z.object({ action: z.enum(["safe", "risky", "forbidden"]) }))
    .mutation(({ input }) => {
      switch (input.action) {
        case "safe":
          return { result: "Operation completed successfully" };

        case "risky":
          if (Math.random() > 0.5) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Random failure occurred",
            });
          }
          return { result: "Risky operation succeeded" };

        case "forbidden":
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "This operation is not allowed",
          });

        default:
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid action",
          });
      }
    }),
});

// Export type router for client
export type AppRouter = typeof appRouter;

// Example usage function
