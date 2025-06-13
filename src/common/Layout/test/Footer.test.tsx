import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

describe("<Footer />", () => {
  const h1Text = "The Footer";
  beforeEach(async () => {
    vi.clearAllMocks();
    await vi.importActual("@mui/joy");

    const component = render(
      <Footer>
        <h1>{h1Text}</h1>
      </Footer>
    );
    component.container.firstElementChild?.setAttribute(
      "data-testid",
      "footerTest"
    );
  });

  it("renders the footer component", async () => {
    const footer = await screen.findByTestId("footerTest");
    expect(footer).toBeInTheDocument();
  });

  it("is a `<footer />` HTML Element (Semantic HTML)", async () => {
    const footer = await screen.findByTestId("footerTest");
    expect(footer.tagName).toEqual("footer".toUpperCase());
  });

  it("renders contained/children components", async () => {
    const footer = await screen.findByText(h1Text);
    expect(footer).toBeInTheDocument();
  });
});
