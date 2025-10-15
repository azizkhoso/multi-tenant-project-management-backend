import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'MM-DD HH:mm' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

// info, warn and error logging methods
export const logInfo = (message: string, ...meta: any[]) => {
  logger.info(message, ...meta);
};

export const logWarn = (message: string, ...meta: any[]) => {
  logger.warn(message, ...meta);
};

export const logError = (message: string, ...meta: any[]) => {
  logger.error(message, ...meta);
  console.error(...meta);
};

export default logger;