import { render } from "@testing-library/react";

import { Icon } from ".";

describe("Icon", () => {
  it("should render an icon", () => {
    const { getByLabelText } = render(<Icon name="leaf" size={24} />);

    const iconElement = getByLabelText("leaf");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render an icon with 24 of size", () => {
    const { getByLabelText } = render(<Icon name="leaf" size={24} />);

    const iconElement = getByLabelText("leaf");

    expect(iconElement).toHaveAttribute("width", "24");
    expect(iconElement).toHaveAttribute("height", "24");
  });

  it("should render the dashboard icon", () => {
    const { getByLabelText } = render(<Icon name="dashboard" size={24} />);

    const iconElement = getByLabelText("dashboard");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render the history icon", () => {
    const { getByLabelText } = render(<Icon name="history" size={24} />);

    const iconElement = getByLabelText("history");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render the lightning icon", () => {
    const { getByLabelText } = render(<Icon name="lightning" size={24} />);

    const iconElement = getByLabelText("lightning");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render the plug icon", () => {
    const { getByLabelText } = render(<Icon name="plug" size={24} />);

    const iconElement = getByLabelText("plug");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render the leaf icon", () => {
    const { getByLabelText } = render(<Icon name="leaf" size={24} />);

    const iconElement = getByLabelText("leaf");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render the wallet icon", () => {
    const { getByLabelText } = render(<Icon name="wallet" size={24} />);

    const iconElement = getByLabelText("wallet");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render the trend-up icon", () => {
    const { getByLabelText } = render(<Icon name="trend-up" size={24} />);

    const iconElement = getByLabelText("trend-up");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render the trend-down icon", () => {
    const { getByLabelText } = render(<Icon name="trend-down" size={24} />);

    const iconElement = getByLabelText("trend-down");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render the scales icon", () => {
    const { getByLabelText } = render(<Icon name="scales" size={24} />);

    const iconElement = getByLabelText("scales");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render the search icon", () => {
    const { getByLabelText } = render(<Icon name="search" size={24} />);

    const iconElement = getByLabelText("search");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render the invoice icon", () => {
    const { getByLabelText } = render(<Icon name="invoice" size={24} />);

    const iconElement = getByLabelText("invoice");

    expect(iconElement).toBeInTheDocument();
  });

  it("should render the upload icon", () => {
    const { getByLabelText } = render(<Icon name="upload" size={24} />);

    const iconElement = getByLabelText("upload");

    expect(iconElement).toBeInTheDocument();
  });
});
