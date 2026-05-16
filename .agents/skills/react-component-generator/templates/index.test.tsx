import { render, screen } from "@testing-library/react";
import ComponentName from "./index";

describe("ComponentName", () => {
  it("renders component", () => {
    render(<ComponentName />);

    expect(screen.getByText("ComponentName")).toBeTruthy();
  });
});
