import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  // {authorizationParams: { screen_hint: "signup" }} --> tells Auth0 to show the signup screen instead of the login screen
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <>
      <div>
        {isAuthenticated === false ? (
          <div>
            <button
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    scope: "openid profile email",
                    prompt: "none",
                  },
                })
              }
            >
              Login
            </button>
            <button
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: { screen_hint: "signup" },
                })
              }
            >
              Sign up
            </button>
          </div>
        ) : (
          <div>
            <button onClick={() => logout()}>Logout</button>
            <p content={user.email}>Email</p>
          </div>
        )}
      </div>
    </>
  );
}
