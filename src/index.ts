import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import { ExpressContext, ApolloServer } from "apollo-server-express";
import graphqlApplication from "./app";

declare global {
	namespace GraphQLModules {
		interface GlobalContext {
			request: any;
		}
	}
}

const { createSchemaForApollo } = graphqlApplication;
const schema = createSchemaForApollo();

const server = new ApolloServer({
	schema,
	playground: true,
	context: ({ req }: ExpressContext) => {
		return {
			request: req,
		};
	},
});

const app = express();
server.applyMiddleware({ app });

const httpServer = createServer(app);

httpServer.listen({ port: 3000 }, () => {
	// eslint-disable-next-line no-console
	console.info(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
});
