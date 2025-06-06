import { defineConfig } from "tsdown/config";

export default defineConfig({
  dts: { resolve: true, emitDtsOnly: true },
  outDir: "src",
  clean: false,
  outExtensions: () => ({ dts: ".d.ts" }),
});
