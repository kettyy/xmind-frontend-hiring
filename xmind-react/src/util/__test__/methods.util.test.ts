import {
  filterOption,
  inputNumberCurrencyFormatter,
  inputNumberParser,
} from "@/util/methods.util";

test("Verify filterOption", () => {
  expect(filterOption("l", { value: "test", label: "luck" })).toBe(true);
  expect(filterOption("z", { value: "test", label: "luck" })).toBe(false);
});

test("Verify inputNumberCurrencyFormatter", () => {
  expect(inputNumberCurrencyFormatter("$")("1000").indexOf("$")).toBe(0);
  expect(inputNumberCurrencyFormatter("$")("1000")).toBe("$ 1,000");
});

test("Verify inputNumberParser", () => {
  expect(inputNumberParser("10,000,000")).toBe("10000000");
});
