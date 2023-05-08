import "@testing-library/jest-dom";

import { cleanup, render, screen } from "@testing-library/react";
import React from "react";

import Button from "./index";

afterEach(cleanup);
describe("Text render correctly", () => {
  it("should render test", () => {
    render(<Button>test</Button>);
    expect(screen.getByRole("button").textContent).toBe("test");
  });

  it("should render Children", () => {
    render(<Button>Children</Button>);
    expect(screen.getByRole("button").textContent).toBe("Children");
  });
});
describe("Loading render correctly", () => {
  it("should not show spinner", () => {
    render(<Button>test</Button>);
    const loading = screen.queryByRole("status");
    expect(loading).not.toBeInTheDocument();
  });

  it("should show spinner", () => {
    render(<Button isLoading>test</Button>);
    const loading = screen.queryByRole("status");
    expect(loading).toBeInTheDocument();
  });
});
