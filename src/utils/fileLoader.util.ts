import path from "path";
import logger from "@/config/logger.config";

export class FileLoader {
  static async loadContext(
    filename: string = "dashboard-info.txt"
  ): Promise<string> {
    try {
      const filePath = path.join(process.cwd(), filename);
      const file = Bun.file(filePath);
      const exists = await file.exists();

      if (!exists) {
        logger.warn(`Context file not found at: ${filePath}`);
        return "";
      }

      const data = await file.text();
      return data;
    } catch (error) {
      logger.error(`Error reading context file with Bun: ${filename}`, error);
      return "";
    }
  }
}
