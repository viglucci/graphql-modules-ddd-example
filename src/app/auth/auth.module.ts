import {
	CONTEXT,
	createModule,
	gql,
	InjectionToken,
	Scope,
} from "graphql-modules";

import { LoggerToken } from "../shared/Logger";

interface IAuthenticatedUser {
	_id: number;
	username: string;
}
const AuthenticatedUser = new InjectionToken<IAuthenticatedUser>(
	"authenticated-user"
);

export const AuthModule = createModule({
	id: "auth",
	dirname: __dirname,
	typeDefs: gql`
		type Query {
			me: User
		}
	`,
	resolvers: {
		Query: {
			me(_root: {}, _args: {}, context: GraphQLModules.Context) {
				return context.injector.get(AuthenticatedUser);
			},
		},
	},
	providers: [
		{
			provide: AuthenticatedUser,
			scope: Scope.Operation,
			deps: [CONTEXT, LoggerToken],
			useFactory({ request }: GraphQLModules.GlobalContext, logger: any) {
				const { authorization } = request.headers;
				if (authorization) {
					logger.info({ authorization });
				}

				return {
					id: 1,
					username: "me",
				};
			},
		},
	],
});
