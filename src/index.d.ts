import * as _trpc_server0 from "@trpc/server";

//#region src/index.d.ts
interface Context {
  user?: {
    id: string;
    name: string;
  };
}
declare const appRouter: _trpc_server0.CreateRouterInner<_trpc_server0.RootConfig<{
  ctx: Context;
  meta: object;
  errorShape: _trpc_server0.DefaultErrorShape;
  transformer: _trpc_server0.DefaultDataTransformer;
}>, {
  greeting: _trpc_server0.BuildProcedure<"query", {
    _config: _trpc_server0.RootConfig<{
      ctx: Context;
      meta: object;
      errorShape: _trpc_server0.DefaultErrorShape;
      transformer: _trpc_server0.DefaultDataTransformer;
    }>;
    _meta: object;
    _ctx_out: Context;
    _input_in: {
      name: string;
    };
    _input_out: {
      name: string;
    };
    _output_in: typeof _trpc_server0.unsetMarker;
    _output_out: typeof _trpc_server0.unsetMarker;
  }, {
    message: string;
    timestamp: string;
  }>;
  getUserInfo: _trpc_server0.BuildProcedure<"query", {
    _config: _trpc_server0.RootConfig<{
      ctx: Context;
      meta: object;
      errorShape: _trpc_server0.DefaultErrorShape;
      transformer: _trpc_server0.DefaultDataTransformer;
    }>;
    _meta: object;
    _ctx_out: {
      user: {
        id: string;
        name: string;
      };
    };
    _input_in: typeof _trpc_server0.unsetMarker;
    _input_out: typeof _trpc_server0.unsetMarker;
    _output_in: typeof _trpc_server0.unsetMarker;
    _output_out: typeof _trpc_server0.unsetMarker;
  }, {
    user: {
      id: string;
      name: string;
    };
    serverTime: string;
  }>;
  updateUserName: _trpc_server0.BuildProcedure<"mutation", {
    _config: _trpc_server0.RootConfig<{
      ctx: Context;
      meta: object;
      errorShape: _trpc_server0.DefaultErrorShape;
      transformer: _trpc_server0.DefaultDataTransformer;
    }>;
    _meta: object;
    _ctx_out: {
      user: {
        id: string;
        name: string;
      };
    };
    _input_in: {
      name: string;
    };
    _input_out: {
      name: string;
    };
    _output_in: typeof _trpc_server0.unsetMarker;
    _output_out: typeof _trpc_server0.unsetMarker;
  }, {
    success: boolean;
    user: {
      name: string;
      id: string;
    };
  }>;
  riskOperation: _trpc_server0.BuildProcedure<"mutation", {
    _config: _trpc_server0.RootConfig<{
      ctx: Context;
      meta: object;
      errorShape: _trpc_server0.DefaultErrorShape;
      transformer: _trpc_server0.DefaultDataTransformer;
    }>;
    _meta: object;
    _ctx_out: Context;
    _input_in: {
      action: "safe" | "risky" | "forbidden";
    };
    _input_out: {
      action: "safe" | "risky" | "forbidden";
    };
    _output_in: typeof _trpc_server0.unsetMarker;
    _output_out: typeof _trpc_server0.unsetMarker;
  }, {
    result: string;
  }>;
}>;
type AppRouter = typeof appRouter;
//#endregion
export { AppRouter };