import winston from "winston";

const isProd = process.env.NODE_ENV === "production";

const { combine, timestamp, errors, json, printf, colorize } = winston.format;

/**
 * PROD → pure JSON (fastest, no string formatting)
 */
const prodFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json()
);

/**
 * DEV → readable but still cheap
 */
const devFormat = combine(
  colorize(),
  timestamp({ format: "HH:mm:ss" }),
  printf(({ level, message, timestamp, stack }) =>
    stack
      ? `${timestamp} ${level}: ${stack}`
      : `${timestamp} ${level}: ${message}`
  )
);

export const logger = winston.createLogger({
  level: isProd ? "info" : "debug",
  format: isProd ? prodFormat : devFormat,
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
  exitOnError: false,
});
