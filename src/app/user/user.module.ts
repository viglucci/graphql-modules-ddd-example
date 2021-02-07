import { createModule, gql } from "graphql-modules";

const UserModule = createModule({
	id: "user",
	dirname: __dirname,
	typeDefs: gql`
		type User {
			id: String
			username: String
		}
	`,
	resolvers: {
		User: {
			id: (user: any) => user.id,
			username: (user: any) => user.username,
		},
	},
});

export default UserModule;
