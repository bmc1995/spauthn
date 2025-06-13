import { describe, expect, it } from "vitest";
import { Header } from "../Header";
import { render, screen } from "@testing-library/react";

describe("<Header />", () => {
  it("Renders children", async () => {
    render(
      <Header>
        <nav data-testid="childEl">Navbar</nav>
      </Header>
    );
    const childEl = await screen.findByTestId("childEl");

    expect(childEl).toBeInTheDocument();
  });
  it("Is a `<header />` HTML element (Semantic HTML)", async () => {
    const component = render(
      <Header>
        <nav>Navbar</nav>
      </Header>
    );
    component.container.firstElementChild?.setAttribute(
      "data-testid",
      "headerComponent"
    );

    const headerEl = await screen.findByTestId("headerComponent");
    expect(headerEl.tagName).toBe("HEADER");
  });
});
