import { describe, expect, it } from "vitest";
import ErrorBoundary from "../components/ErrorBoundary";
import { render, screen } from "@testing-library/react";

const childText = "children rendered";
const fbackText = "fallback rendered";
const ThrowErr = () => {
  throw new Error("test");
};
const fback = <h1 data-testid={fbackText}>{fbackText}</h1>;
const child = (
  <div>
    <h1>{childText}</h1>
  </div>
);

describe("<ErrorBoundary />", () => {
  it("Displays children if there are no errors", () => {
    render(<ErrorBoundary fallback={fback}>{child}</ErrorBoundary>);
    const boundary = screen.getByText(childText);
    expect(boundary).toBeInTheDocument();
  });
  it("Displays a fallback if an error is thrown", () => {
    render(<ErrorBoundary fallback={fback}>{<ThrowErr />}</ErrorBoundary>);
    const boundary = screen.getByText(fbackText);
    expect(boundary).toBeInTheDocument();
  });
});
