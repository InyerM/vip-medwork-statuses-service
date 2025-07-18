const config = {
  "**/*.{ts?(x),mts}": () => "tsc -p tsconfig.build.json --noEmit",
  "**/{src,test}/**/*.{ts,tsx}": ["eslint", "prettier --write"],
  "*.{md,json}": "prettier --write",
};

export default config;