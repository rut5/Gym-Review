import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { PacmanLoader } from "react-spinners";

export default function Login() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect({
        authorizationParams: {
          returnTo: "/",
          screen_hint: "login",
          scope: "openid profile email",
        },
      });
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <PacmanLoader cssOverride={{}} margin={2} size={25} />
      ) : isAuthenticated ? (
        <button onClick={() => logout()}>Logout</button>
      ) : null}
    </>
  );
}
