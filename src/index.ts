import "reflect-metadata";

import { FastifyRequest } from "fastify";

import { start } from "./app";

declare global {
	namespace GraphQLModules {
		interface GlobalContext {
			request: FastifyRequest;
		}
	}
}

start();
