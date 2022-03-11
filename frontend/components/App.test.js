import AppClass from "./AppClass";
import React from "react";
import { render, fireEvent, screen, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Renders without errors", () => {
  render(<AppClass/>);
});

test("Everything is visible", () => {
  render(<AppClass/>);
  const left = screen.getByText("LEFT");
  expect(left).toBeInTheDocument();
  const right = screen.getByText("RIGHT");
  expect(right).toBeInTheDocument();
  const up = screen.getByText("UP");
  expect(up).toBeInTheDocument();
  const down = screen.getByText("DOWN");
  expect(down).toBeInTheDocument();
  const reset = screen.getByText("reset");
  expect(reset).toBeInTheDocument();
  const email = screen.getByPlaceholderText("type email");
  expect(email).toBeInTheDocument();
  const heading = screen.getByText("Coordinates", { exact: false });
  expect(heading).toBeInTheDocument();
});

test('can input an email & see if its there', () => {
  render(<AppClass/>);
  const email = screen.getByPlaceholderText("type email");
  fireEvent.change(email,{target: {value: 'fooBar@gmail.com'}});
  expect(email).toHaveValue('fooBar@gmail.com');
})

test('Submit clears email field',()=>{
  render(<AppClass/>);
  const email = screen.getByPlaceholderText("type email");
  fireEvent.change(email,{target: {value: 'fooBar@gmail.com'}});
  const submit = document.querySelector('#submit');
  fireEvent.click(submit);
  expect(email).toHaveValue('');
})

test('Reset button functions', ()=>{
  render(<AppClass/>);
  const email = screen.getByPlaceholderText("type email");
  fireEvent.change(email,{target: {value: 'fooBar@gmail.com'}});
  const reset = screen.getByText("reset");
  fireEvent.click(reset);
  expect(email).toHaveValue('');
})