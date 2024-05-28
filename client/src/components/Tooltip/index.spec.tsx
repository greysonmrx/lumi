import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { Tooltip } from ".";

describe("Tooltip", () => {
  it("should render the tooltip trigger", () => {
    const { getByTestId } = render(
      <Tooltip.Root>
        <Tooltip.Trigger>
          <button>trigger</button>
        </Tooltip.Trigger>
      </Tooltip.Root>
    );

    const tooltipTriggerElement = getByTestId("tooltip-trigger");

    expect(tooltipTriggerElement).toBeInTheDocument();
  });

  it("should render the tooltip content when mouse hovers tooltip trigger", async () => {
    const { getByTestId, findAllByText, findAllByTestId } = render(
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger>
          <button>trigger</button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <span>content</span>
        </Tooltip.Content>
      </Tooltip.Root>
    );

    const tooltipTriggerElement = getByTestId("tooltip-trigger");

    await userEvent.hover(tooltipTriggerElement, { skipHover: false });

    const [tooltipContentElement] = await findAllByTestId("tooltip-content");
    const [tooltipContentTextElement] = await findAllByText("content");

    expect(tooltipContentElement).toBeInTheDocument();
    expect(tooltipContentTextElement).toBeInTheDocument();
  });
});
