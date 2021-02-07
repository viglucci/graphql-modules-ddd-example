import {
	createModule,
	gql,
	InjectionToken,
	Scope,
	CONTEXT,
} from "graphql-modules";

interface IAuthenticatedUser {
	_id: number;
	username: string;
}
const AuthenticatedUser = new InjectionToken<IAuthenticatedUser>(
	"authenticated-user"
);

const AuthModule = createModule({
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
			deps: [CONTEXT],
			useFactory(ctx: GraphQLModules.GlobalContext) {
				const authHeader = ctx.request.headers.authorization;

				console.log({ authHeader });

				return {
					id: 1,
					username: "me",
				};
			},
		},
	],
});

export default AuthModule;
