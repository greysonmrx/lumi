import { render } from "@testing-library/react";

import { PageHeader } from ".";

describe("PageHeader", () => {
  it("should render the title", () => {
    const { getByText } = render(<PageHeader.Title>Title</PageHeader.Title>);

    const titleElement = getByText("Title");

    expect(titleElement).toBeInTheDocument();
  });

  it("should render the subtitle", () => {
    const { getByText } = render(
      <PageHeader.Subtitle>Subtitle</PageHeader.Subtitle>
    );

    const subtitleElement = getByText("Subtitle");

    expect(subtitleElement).toBeInTheDocument();
  });
});
