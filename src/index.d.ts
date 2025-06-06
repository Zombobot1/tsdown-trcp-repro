import * as _trpc_server_unstable_core_do_not_import0 from "@trpc/server/unstable-core-do-not-import";
import * as _trpc_server1 from "@trpc/server";

//#region src/index.d.ts
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
      user: {
        name: string;
        id: string;
      };
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
export { AppRouter };