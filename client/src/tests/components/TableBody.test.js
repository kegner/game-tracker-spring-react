import React from 'react';
import { Provider } from "react-redux";
import { render, fireEvent } from '@testing-library/react';
import { SELECT_GAME } from '../../actions/gameActions';
import { createTestStore } from '../store/testStore';
import TableBody from '../../components/table/TableBody';

let store;
let dispatch;
let component;
let container;
let asFragment;
let game = {
  id: "123", title: "My Game"
};
let gamesPages = [[game]];

describe("TableBody", () => {

  beforeEach(() => {
    store = createTestStore({
      mockStore: true,
      initialState: {
        gameReducer: {
          selectedGame: game
        }
      }
    });
    dispatch = store.dispatch;
    component = render(
      <Provider store={store}>
        <TableBody gamesPages={gamesPages} pageIndex={0} />
      </Provider>
    );
    container = component.container;
    asFragment = component.asFragment;
  });

  it("exists", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("has the correct row count", () => {
    const rowCount = container.querySelectorAll("tr").length;
    expect(rowCount).toBe(1);
  });

  it("selects a row", async () => {
    const expectedActions = [
      { type: SELECT_GAME, payload: { game }},
    ];

    const rowElement = container.querySelector("tr");
    expect(dispatch).not.toHaveBeenCalled();
    fireEvent.click(rowElement);
    // await for all dispatches
    await new Promise(r => setTimeout(r, 1));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("selects a new row and sets active class", async () => {
    store = createTestStore();
    dispatch = store.dispatch;
    component = render(
      <Provider store={store}>
        <TableBody gamesPages={gamesPages} pageIndex={0} />
      </Provider>
    );
    container = component.container;
    asFragment = component.asFragment;

    const rowElement = container.querySelector("tr");
    let selectedRowCount = container.querySelectorAll(".table-active").length;
    expect(selectedRowCount).toBe(0);
    fireEvent.click(rowElement);
    // await for all dispatches
    await new Promise(r => setTimeout(r, 1));
    selectedRowCount = container.querySelectorAll(".table-active").length;
    expect(selectedRowCount).toBe(1);
  });

});