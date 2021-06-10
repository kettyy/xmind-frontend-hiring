import React from "react";
import { BillProps } from "@/interfaces/routers/bill.router.interface";
import Bill from "@/routers/Bill";
import { renderWithIntl } from "@/setupTests";
import axios from "axios";
import { categories, orders } from "@/stores/__mock__/bill.store.mock";
import { fireEvent, waitFor, screen } from "@testing-library/react";

const props = {} as BillProps;

describe("", () => {
  jest.spyOn(axios, "get").mockImplementation((url) => {
    switch (url) {
      case "/orders":
        return Promise.resolve({ data: { list: orders } });
      case "/categories":
        return Promise.resolve({ data: { list: categories } });
      default:
        return Promise.resolve({ data: {} });
    }
  });

  test("Render the billing list", async () => {
    const { container } = renderWithIntl(<Bill {...props} />);
    await waitFor(
      () => {
        expect(container.innerHTML).toMatch("工资");
      },
      { container },
    );
  });

  test("Render the modal", async () => {
    const { container, findByTestId } = renderWithIntl(<Bill {...props} />);

    expect(container.innerHTML).not.toMatch("ant-form");

    fireEvent.click(await findByTestId("show-create-bill-form"));

    await expect(screen.findByTestId("bill-form")).resolves.toBeInTheDocument();
  });
});
