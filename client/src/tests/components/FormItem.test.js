import React from 'react';
import { render, getByLabelText, fireEvent } from '@testing-library/react';
import FormItem from '../../components/form/FormItem';

let hasChanged = false;
const changeHandler = (e) => { hasChanged = true }

let component;
let container;
let asFragment;

describe("FormItem", () => {

  beforeEach(() => {
    hasChanged = false;
    component = render(
      <FormItem id="title" label="Title" value="My title" type="text"
          onChange={changeHandler} />
    );
    container = component.container;
    asFragment = component.asFragment;
  });

  it("exists", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows values", () => {
    expect(getByLabelText(container, "Title")).toBeVisible();
  });

  it("change handler", () => {
    const input = container.querySelector("input");
    expect(hasChanged).toBe(false);
    fireEvent.change(input, { target: { value: "new title" } });
    expect(hasChanged).toBe(true);
  });

  it("change handler for currency", () => {
    component = render(
      <FormItem id="title" label="Title" value="My title" type="number"
          onChange={changeHandler} currency={true} />
    );
    container = component.container;
    asFragment = component.asFragment;

    const input = container.querySelector("input");
    expect(hasChanged).toBe(false);
    fireEvent.change(input, { target: { value: "1.123" } });
    expect(hasChanged).toBe(false);
  });
});