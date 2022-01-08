import React from 'react';
import { Provider } from "react-redux";
import { render, fireEvent, getByText } from '@testing-library/react';
import { createTestStore } from '../store/testStore';
import TablePagination from '../../components/table/TablePagination';

let hasClicked = false;
let indexNumber = -1;
const clickHandler = (index) => {
  hasClicked = true;
  indexNumber = index;
}

let store;
let dispatch;
let component;
let container;
let asFragment;
let gamesPages = [
  [
    { id: "1", title: "Game 1" },
    { id: "2", title: "Game 2" },
    { id: "3", title: "Game 3" },
    { id: "4", title: "Game 4" },
    { id: "5", title: "Game 5" },
  ],
  [
    { id: "6", title: "Game 6"}
  ]
];

describe("TablePagination", () => {

  beforeEach(() => {
    hasClicked = false;
    indexNumber = -1;
    store = createTestStore({
      mockStore: true
    });
    dispatch = store.dispatch;
    component = render(
      <Provider store={store}>
        <TablePagination gamesPages={gamesPages} pageIndex={0} setPageIndex={clickHandler} />
      </Provider>
    );
    container = component.container;
    asFragment = component.asFragment;
  });

  it("exists", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("has correct page count", () => {
    const pageCount = container.querySelectorAll("li").length;
    expect(pageCount).toBe(4);
  });

  it("selects a page", async () => {
    const button = getByText(container, "2");
    expect(hasClicked).toBe(false);
    expect(indexNumber).toBe(-1);
    fireEvent.click(button);
    expect(hasClicked).toBe(true);
    expect(indexNumber).toBe(1);
  });

});