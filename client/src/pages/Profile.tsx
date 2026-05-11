import { useAuth0, User } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";

function Profile() {
  const { isAuthenticated, user, logout, isLoading } = useAuth0();

  const [secureData, setSecureData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/secure-data`, {
        withCredentials: true,
      });
      setSecureData(response.data.message);
    } catch (err) {
      setFetchError(err.message);
    }
  };

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
            {user.picture && (
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
            <p>Username: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => fetchData()}>Fetch secure data</button>
            {secureData && <p>{secureData}</p>}
            {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
          </div>
        ) : (
          <p>Please login to view Profile</p>
        )}
      </div>
    </>
  );
}
export default Profile;
