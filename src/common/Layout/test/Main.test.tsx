import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Main } from "../Main";

describe("<Main />", () => {
  it("Is a `<main />` HTML Element (Semantic HTML) ", async () => {
    const component = render(
      <Main>
        <nav>Navbar</nav>
      </Main>
    );
    component.container.firstElementChild?.setAttribute(
      "data-testid",
      "mainComponent"
    );

    const headerEl = await screen.findByTestId("mainComponent");
    expect(headerEl.tagName).toBe("MAIN");
  });
  it("renders child components", async () => {
    render(
      <Main>
        <nav data-testid="childEl">Navbar</nav>
      </Main>
    );
    const childEl = await screen.findByTestId("childEl");
    expect(childEl).toBeInTheDocument();
  });
});
