import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";

function Profile() {
  const { isAuthenticated, user, logout, isLoading } = useAuth0();

  return (
    <>
      <div>
        {isLoading ? (
          <div
            style={{
              width: "200px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid darkgreen",
              borderColor: "",
              backgroundColor: "rgba(144, 238, 144, 0.8)",
              fillOpacity: ".8",
            }}
          ></div>
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
