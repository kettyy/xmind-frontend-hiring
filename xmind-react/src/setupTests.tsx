// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
// import "mobx-react-lite/batchingForReactDom";
import React from "react";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory, MemoryHistory } from "history";
import { RootStore } from "@/stores/index.store";
import { Provider } from "mobx-react";

// 模拟canvas方法
HTMLCanvasElement.prototype.getContext = jest.fn();

// 模拟Axios请求
jest.mock("axios");

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

export const renderWithIntl = (
  ui: React.ReactElement,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { route?: string; history?: MemoryHistory } = {},
) => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider {...new RootStore()}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
};
