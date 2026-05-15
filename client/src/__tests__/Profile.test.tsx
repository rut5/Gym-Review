import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Profile from "../pages/Profile/Profile";
import { useAuth0, Auth0ContextInterface, User } from "@auth0/auth0-react";

// Mock useAuth0 hook
vi.mock("@auth0/auth0-react");

const baseMock: Auth0ContextInterface<User> = {
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
  getAccessTokenSilently: vi.fn(),
  getAccessTokenWithPopup: vi.fn(),
  getIdTokenClaims: vi.fn(),
  loginWithCustomTokenExchange: vi.fn(),
  exchangeToken: vi.fn(),
  loginWithRedirect: vi.fn(),
  loginWithPopup: vi.fn(),
  connectAccountWithRedirect: vi.fn(),
  logout: vi.fn(),
  handleRedirectCallback: vi.fn(),
  getDpopNonce: vi.fn(),
  setDpopNonce: vi.fn(),
  generateDpopProof: vi.fn(),
  createFetcher: vi.fn(),
  getConfiguration: vi.fn(),
  mfa: vi.fn(),
  error: undefined,
};

describe("Profile Component", () => {
  it("shows loading skeleton when loading", () => {
    vi.mocked(useAuth0).mockReturnValue({
      ...baseMock,
      isLoading: true,
    });

    render(<Profile />);
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it("shows 'Please login to view Profile' when not authenticated", () => {
    vi.mocked(useAuth0).mockReturnValue({
      ...baseMock,
      isAuthenticated: false,
      isLoading: false,
    });

    render(<Profile />);
    const loginMessage = screen.getByText(/Please login to view Profile/i);
    expect(loginMessage).toBeInTheDocument();
  });

  it("shows user data when authenticated", () => {
    vi.mocked(useAuth0).mockReturnValue({
      ...baseMock,
      isAuthenticated: true,
      isLoading: false,
      user: {
        name: "Test User",
        email: "test@example.com",
        picture: "https://example.com/test.jpg",
      },
    });

    render(<Profile />);
    const usernameElement = screen.getByText(/Username: Test User/i);
    const emailElement = screen.getByText(/Email: test@example.com/i);
    expect(usernameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
  });
});
