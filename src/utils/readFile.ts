import * as fs from 'fs';
import * as path from 'path';

export function readFileFromCurrentDirectory(relativePath: string): string {
  const srcBaseDir = path.resolve(__dirname, "../../src");
  const filePath = path.join(srcBaseDir, relativePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  return fs.readFileSync(filePath, "utf-8");
}
