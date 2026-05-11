TO DO:

# Ask Auth0 credential Rut

# Replace all the "places" by proper term

# Check name for secure data url with Mina and Rut to use in my axios.get request. Profile.tsx

# Warning Explanation on login page of Auth0

Message:

"One or more of your connections are currently using Auth0 development keys and should not be used in production."
Cause:

Your Auth0 application is using development keys (default for testing). These are not secure for production environments.

What It Means for You

For Development: This is fine. You can continue testing locally.
For Production: Before deploying your app, Rut/Mina must:

Replace development keys with production keys in the Auth0 Dashboard.
Configure a custom domain (optional but recommended for security).
