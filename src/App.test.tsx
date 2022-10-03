import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import App from "./App";
import store from "./redux/store";

test("renders react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText("Timesheet");
  expect(linkElement).toBeInTheDocument();
});
