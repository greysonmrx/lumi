import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { Toggle } from ".";

describe("Toggle", () => {
  it("should render the toggle", () => {
    const { getByTestId } = render(
      <Toggle.Root type="single">
        <Toggle.Item value="2023">2023</Toggle.Item>
      </Toggle.Root>
    );

    const toggleElement = getByTestId("toggle");

    expect(toggleElement).toBeInTheDocument();
  });

  it("check the default toggle item state ", async () => {
    render(
      <Toggle.Root type="single">
        <Toggle.Item value="2023">2023</Toggle.Item>
        <Toggle.Item value="2022">2022</Toggle.Item>
      </Toggle.Root>
    );

    const toggleItemElement = screen.getByText("2023");

    expect(toggleItemElement).toHaveAttribute("data-state", "off");
  });

  it("check if the toggle item state changes when pressed", async () => {
    render(
      <Toggle.Root type="single">
        <Toggle.Item value="2023">2023</Toggle.Item>
        <Toggle.Item value="2022">2022</Toggle.Item>
      </Toggle.Root>
    );

    const selectedToggleItemElement = screen.getByText("2023");

    await userEvent.click(selectedToggleItemElement);

    expect(selectedToggleItemElement).toHaveAttribute("data-state", "on");
  });
});
