import React from 'react';
import { Provider } from "react-redux";
import { render, getByText } from '@testing-library/react';
import { createTestStore } from '../store/testStore';
import TableCount from '../../components/table/TableCount';

let store;
let dispatch;
let component;
let container;
let asFragment;

describe("TableCount", () => {

  beforeEach(() => {
    store = createTestStore({
      mockStore: true,
      initialState: {
        gameReducer: {
          games: [
            { id: "1", title: "Game 1" },
            { id: "2", title: "Game 2" }
          ]
        }
      }
    });
    dispatch = store.dispatch;
    component = render(
      <Provider store={store}>
        <TableCount pageIndex={0} itemsPerPage={5} />
      </Provider>
    );
    container = component.container;
    asFragment = component.asFragment;
  });

  it("exists", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("has correct text", () => {
    expect(getByText(container, "Showing 1 to 2 of 2")).toBeVisible();
  });

});