import { render } from "@testing-library/react";

import { Button } from ".";

describe("Button", () => {
  it("should render a button", () => {
    const { getByText, getByRole } = render(<Button>button</Button>);

    const buttonElement = getByRole("button");
    const buttonTextElement = getByText("button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonTextElement).toBeInTheDocument();
  });

  it("should render a disabeld button", () => {
    const { getByRole } = render(<Button disabled>disabeld</Button>);

    const buttonElement = getByRole("button");

    expect(buttonElement).toBeDisabled();
  });
});
