import * as _trpc_server_unstable_core_do_not_import0 from "@trpc/server/unstable-core-do-not-import";
import * as _trpc_server1 from "@trpc/server";
import { Pool } from "pg";

//#region src/index.d.ts
declare const db: Pool;
declare const dbHelpers: {
  getUser(id: string): Promise<any>;
  createUser(name: string, email: string): Promise<any>;
  updateUser(id: string, name: string): Promise<any>;
};
interface Context {
  user?: {
    id: string;
    name: string;
  };
}
declare const appRouter: _trpc_server_unstable_core_do_not_import0.BuiltRouter<{
  ctx: Context;
  meta: object;
  errorShape: _trpc_server_unstable_core_do_not_import0.DefaultErrorShape;
  transformer: false;
}, _trpc_server_unstable_core_do_not_import0.DecorateCreateRouterOptions<{
  greeting: _trpc_server1.TRPCQueryProcedure<{
    input: {
      name: string;
    };
    output: {
      message: string;
      timestamp: string;
    };
    meta: object;
  }>;
  createUser: _trpc_server1.TRPCMutationProcedure<{
    input: {
      name: string;
      email: string;
    };
    output: {
      success: boolean;
      user: any;
    };
    meta: object;
  }>;
  getUser: _trpc_server1.TRPCQueryProcedure<{
    input: {
      id: string;
    };
    output: {
      user: any;
    };
    meta: object;
  }>;
  getUserInfo: _trpc_server1.TRPCQueryProcedure<{
    input: void;
    output: {
      user: {
        id: string;
        name: string;
      };
      serverTime: string;
    };
    meta: object;
  }>;
  updateUserName: _trpc_server1.TRPCMutationProcedure<{
    input: {
      name: string;
    };
    output: {
      success: boolean;
      user: any;
    };
    meta: object;
  }>;
  healthCheck: _trpc_server1.TRPCQueryProcedure<{
    input: void;
    output: {
      status: string;
      database: string;
      serverTime: any;
    };
    meta: object;
  }>;
  riskOperation: _trpc_server1.TRPCMutationProcedure<{
    input: {
      action: "safe" | "risky" | "forbidden";
    };
    output: {
      result: string;
    };
    meta: object;
  }>;
}>>;
type AppRouter = typeof appRouter;
//#endregion
export { AppRouter, appRouter, db, dbHelpers };