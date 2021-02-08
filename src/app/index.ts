import {
	Application,
	createApplication as createGraphlApplication,
} from "graphql-modules";
import { ApolloServer } from "apollo-server-fastify";
import makeFastifyApp, { FastifyRequest } from "fastify";

import { GraphQLSchema } from "graphql";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { LoggerProvider, LoggerToken } from "./shared/Logger";

export const createApplication = (): Application => {
	return createGraphlApplication({
		modules: [AuthModule, UserModule],
		providers: [LoggerProvider],
	});
};

const createApolloServer = (schema: GraphQLSchema): ApolloServer => {
	return new ApolloServer({
		schema,
		playground: true,
		context: ({ request }: { request: FastifyRequest }) => {
			return {
				request,
			};
		},
	});
};

export const start = async () => {
	const graphqlApplication = createApplication();
	const schema = graphqlApplication.createSchemaForApollo();
	const apolloServer = createApolloServer(schema);
	const fastifyApp = makeFastifyApp();
	const logger = graphqlApplication.injector.get(LoggerToken);
	fastifyApp.register(apolloServer.createHandler());
	const port = 3000;
	await fastifyApp.listen(port);
	const serverPath = `http://localhost:${port}${apolloServer.graphqlPath}`;
	logger.info(`Server ready at ${serverPath}`);
};
