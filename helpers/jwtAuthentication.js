import jwtDecode from "jwt-decode";
import moment from "moment";

class JwtAuth {
  checkExpirity = (token) => {
    if (!token) {
      return {
        error: "not matched",
      };
    }
    try {
      const profile = jwtDecode(token);
      const { exp } = profile;
      if (exp > moment().unix())
        return {
          ...profile,
          token,
          exp: new Date(exp),
        };

      return { error: "Token expired" };
    } catch (e) {
      return { error: "Server Error" };
    }
  };
}
export default new JwtAuth();
