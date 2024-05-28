import { render } from "@testing-library/react";

import { SearchField } from ".";

describe("SearchField", () => {
  it("should render the search field", () => {
    const { getByTestId } = render(<SearchField placeholder="Placeholder" />);

    const searchFieldElement = getByTestId("search-field");

    expect(searchFieldElement).toBeInTheDocument();
  });
});
