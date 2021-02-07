import { createApplication } from "graphql-modules";
import AuthModule from "./auth/auth.module";
import UserModule from "./user/user.module";

const graphqlApplication = createApplication({
	modules: [AuthModule, UserModule],
});

export default graphqlApplication;
