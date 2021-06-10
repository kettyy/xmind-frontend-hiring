import React from "react";
import { createMemoryHistory } from "history";
import App from "./App";
import { renderWithIntl } from "./setupTests";
import { waitFor } from "@testing-library/dom";

test("The default route is /bill", async () => {
  const history = createMemoryHistory({ initialEntries: ["/"] });

  const { container } = renderWithIntl(<App />, {
    history,
  });

  await waitFor(
    () => {
      expect(history.location.pathname).toMatch("/bill");
    },
    { container },
  );
});
