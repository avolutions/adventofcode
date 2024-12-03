import * as fs from 'fs';
import * as path from 'path';

export function readFileFromCurrentDirectory(): string {
  const srcBaseDir = path.resolve(__dirname, "../..");
  const filePath = path.join(srcBaseDir, 'input.txt');

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  return fs.readFileSync(filePath, "utf-8");
}
