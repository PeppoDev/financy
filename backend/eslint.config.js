import js from "@eslint/js";
import tseslint, { plugin } from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    plugins: {
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",

      "@typescript-eslint/no-explicit-any": "warn",

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],

      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",

      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
];
