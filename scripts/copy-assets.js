const { cpSync, existsSync } = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const imageDirectory = path.join(projectRoot, "img");
const outputDirectory = path.join(projectRoot, "dist", "img");

if (!existsSync(imageDirectory)) {
  throw new Error(`Image directory not found: ${imageDirectory}`);
}

cpSync(imageDirectory, outputDirectory, { recursive: true });
