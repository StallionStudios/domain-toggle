import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				index: "index.html",
				background: "src/background.ts",
			},
			output: {
				entryFileNames: (chunk) => {
					if (chunk.name === "background") {
						return "background.js";
					}
					return "[name].js";
				},
			},
		},
		outDir: "dist",
	},
});
