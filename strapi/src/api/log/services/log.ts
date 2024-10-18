/**
 * log service
 */

// Libraries
import fs from "fs";
import path from "path";

// Utils
import { logger } from "../../../utils";

export default () => ({
  getLogs: async () => {
    const logFilePath = path.resolve(process.cwd(), "logs/server.log");

    try {
      const data = await fs.promises.readFile(logFilePath, "utf-8");

      return data;
    } catch (error) {
      throw new Error("Failed to read the log file: " + error.message);
    }
  },
});
