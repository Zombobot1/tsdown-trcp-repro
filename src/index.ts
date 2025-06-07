import { initTRPC } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Pool } from "pg";

// Initialize PostgreSQL connection pool
export const db = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgresql://localhost:5432/myapp",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Database helper functions
export const dbHelpers = {
  async getUser(id: string) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  async createUser(name: string, email: string) {
    const result = await db.query(
      "INSERT INTO users (name, email, created_at) VALUES ($1, $2, NOW()) RETURNING *",
      [name, email]
    );
    return result.rows[0];
  },

  async updateUser(id: string, name: string) {
    const result = await db.query(
      "UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [name, id]
    );
    return result.rows[0];
  },
};

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

  // Database procedures
  createUser: trpc.procedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const user = await dbHelpers.createUser(input.name, input.email);
        return {
          success: true,
          user,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
          cause: error,
        });
      }
    }),

  getUser: trpc.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const user = await dbHelpers.getUser(input.id);
        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }
        return { user };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch user",
          cause: error,
        });
      }
    }),

  // Protected user info procedure
  getUserInfo: authenticatedProcedure.query(({ ctx }) => {
    return {
      user: ctx.user,
      serverTime: new Date().toISOString(),
    };
  }),

  // Example mutation with error handling and database integration
  updateUserName: authenticatedProcedure
    .input(z.object({ name: z.string().min(1).max(50) }))
    .mutation(async ({ input, ctx }) => {
      if (input.name.includes("admin")) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: 'Username cannot contain "admin"',
        });
      }

      try {
        const updatedUser = await dbHelpers.updateUser(ctx.user.id, input.name);
        return {
          success: true,
          user: updatedUser,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user",
          cause: error,
        });
      }
    }),

  // Database health check
  healthCheck: trpc.procedure.query(async () => {
    try {
      const result = await db.query("SELECT NOW() as server_time");
      return {
        status: "healthy",
        database: "connected",
        serverTime: result.rows[0].server_time,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database connection failed",
        cause: error,
      });
    }
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

// Export the router
export { appRouter };

// Example usage function
