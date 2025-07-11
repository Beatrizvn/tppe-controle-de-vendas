import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
// REMOVA: import prettier from "eslint-plugin-prettier/recommended";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // REMOVA: prettier, // Esta linha deve ser removida
  {
    files: ["src/**/*.ts"],
    rules: {
      // Coloque suas regras personalizadas aqui.
    },
  },
  {
    ignores: ["node_modules/", "dist/", "build/"],
  }
];