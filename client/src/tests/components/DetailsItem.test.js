import React from 'react';
import { render, getByText, queryByText } from '@testing-library/react';
import DetailsItem from '../../components/details/DetailsItem';

describe("DetailsItem", () => {

  it("exists", () => {
    const { asFragment } = render(
      <DetailsItem />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("shows normal values", () => {
    const { container } = render(
      <DetailsItem label="My item" value={12.34} currency={false} />
    );

    expect(getByText(container, "My item")).toBeVisible();
    expect(queryByText(container, "$12.34")).toBe(null);
    expect(getByText(container, "12.34")).toBeVisible();
  });

  it("shows currency values", () => {
    const { container } = render(
      <DetailsItem label="My item" value={12.34} currency={true} />
    );

    expect(getByText(container, "My item")).toBeVisible();
    expect(getByText(container, "$12.34")).toBeVisible();
  });

});