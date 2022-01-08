import React from 'react';
import { Provider } from "react-redux";
import { render, fireEvent } from '@testing-library/react';
import { START_SAVING, DELETE_GAME } from '../../actions/gameActions';
import { SHOW_SUCCESS } from '../../actions/toastActions';
import { createTestStore } from '../store/testStore';
import DeleteButton from '../../components/table/DeleteButton';

let store;
let dispatch;
let component;
let container;
let asFragment;

jest.mock("axios");

describe("DeleteButton", () => {

  beforeEach(() => {
    store = createTestStore({
      mockStore: true
    });
    dispatch = store.dispatch;
    component = render(
      <Provider store={store}>
        <DeleteButton id="123" />
      </Provider>
    );
    container = component.container;
    asFragment = component.asFragment;
  });

  it("exists", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("deletes game", async () => {
    const expectedActions = [
      { type: START_SAVING },
      { type: DELETE_GAME, payload: { id: "123" } },
      { type: SHOW_SUCCESS, payload: { message: "Game deleted." } }
    ];

    const button = container.querySelector("button");
    expect(dispatch).not.toHaveBeenCalled();
    fireEvent.click(button);
    // await for all dispatches
    await new Promise(r => setTimeout(r, 1));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toEqual(expectedActions);
  });

});