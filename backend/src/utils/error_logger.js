const { createLogger, transports, format } = require('winston');

function e_logger() {
    return createLogger({
        transports: [
            new transports.File({
                level: 'error',
                filename: 'loggers/e_logger.log',
                format: format.combine(
                    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    format.json()
                ),
                silent: false // Optionally set silent to true or remove it
            }),
            new transports.Console({
                level: 'error',
                format: format.combine(
                    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    format.json()
                ),
                silent: false // Optionally set silent to true or remove it
            }),
        ]
    });
}

module.exports = e_logger();
