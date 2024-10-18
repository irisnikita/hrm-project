// Libraries
import dayjs from "dayjs";
import fs from "fs";
import path from "path";
import winston from "winston";

const { format } = winston;
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
};
const customFormat = format.combine(
  // Add a timestamp to every log
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  // Pretty print the log message
  format.prettyPrint(),
  format.errors({ stack: true })
);
const terminalFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.colorize({ all: true }),
  format.errors({ stack: true }),
  format.simple(),
  format.printf((info) => {
    const { level, message, timestamp, ...restOfInfo } = info;

    return `[${timestamp}] [${level}]: ${message} - meta: ${JSON.stringify(
      restOfInfo
    )}`;
  })
);

winston.addColors(colors);

function createLogFolderPath(): string {
  const folderPath = path.join("logs", dayjs().format("YYYY-MM-DD"));

  // Ensure the directory exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  return folderPath;
}

// Function to get the log file path dynamically
function getLogFilePath(): string {
  const folderPath = createLogFolderPath();
  return path.join(folderPath, "server.log"); // Name of the log file
}

export const logger = winston.createLogger({
  // level: "info",
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    // new winston.transports.File({
    //   format: customFormat,
    //   filename: getLogFilePath(),
    // }),
    // new winston.transports.Http({ host: "localhost", port: 8080 }),
  ],
  silent: process.env.NODE_ENV === "test",
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({ format: terminalFormat }));
}

if (process.env.NODE_ENV !== "test") {
  logger.add(
    new winston.transports.File({
      format: customFormat,
      filename: getLogFilePath(),
    })
  );
}
