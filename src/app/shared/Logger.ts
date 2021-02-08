import { InjectionToken } from "graphql-modules";
import createLogger, { Logger } from "pino";

export const LoggerToken = new InjectionToken<Logger>("logger");

export const LoggerProvider = {
	provide: LoggerToken,
	useFactory() {
		return createLogger();
	},
};
