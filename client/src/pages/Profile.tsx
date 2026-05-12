import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import { PacmanLoader } from "react-spinners";

function Profile() {
  const { isAuthenticated, user, logout, isLoading } = useAuth0();

  return (
    <>
      <div>
        {isLoading ? (
          <PacmanLoader cssOverride={{}} margin={2} size={25} />
        ) : isAuthenticated ? (
          <div>
            {user?.picture && (
              <img
                src={user.picture}
                alt={user.name}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                }}
              />
            )}
            <p>Username: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <button onClick={() => logout()}>Logout</button>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
}
export default Profile;
