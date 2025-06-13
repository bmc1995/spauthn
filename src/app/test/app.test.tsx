import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("<App />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock child components and modules
    vi.mock("react-redux");
    vi.mock("@mui/joy");
    vi.mock("../features/network-detector/NetworkDetector", () => ({
      NetworkDetector: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="network-detector">{children}</div>
      ),
    }));

    vi.mock("../common/Layout/Layout", () => ({
      Layout: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
      ),
    }));

    vi.mock("../common/notifications/ToastContainer", () => ({
      ToastContainer: () => <div data-testid="toast-container" />,
    }));

    vi.mock("../features/auth/pages/LoginPage", () => ({
      LoginPage: () => <div data-testid="login-page" />,
    }));

    render(<App />);
  });

  it("renders the layout component", () => {
    const layout = screen.findByTestId("layout");
    expect(layout).toBeDefined();
  });

  it("renders the network detector", () => {
    const networkDetector = screen.findByTestId("network-detector");
    expect(networkDetector).toBeDefined();
  });

  it("renders the login page by default", () => {
    const loginPage = screen.findByTestId("login-page");
    expect(loginPage).toBeDefined();
  });
});
