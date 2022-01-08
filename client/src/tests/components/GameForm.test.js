import React from 'react';
import { Provider } from "react-redux";
import { render, getByText, fireEvent } from '@testing-library/react';
import { START_SAVING, CREATE_GAME, UPDATE_GAME } from '../../actions/gameActions';
import { SHOW_SUCCESS } from '../../actions/toastActions';
import { createTestStore } from '../store/testStore';
import axios from 'axios';
import GameForm from '../../components/form/GameForm';

let store;
let dispatch;
let component;
let container;
let asFragment;
let game = {
  id: "123", title: "My Game"
};

jest.mock("axios");

describe("GameForm", () => {

  beforeEach(() => {
    store = createTestStore({
      mockStore: true,
      initialState: {
        gameReducer: {
          selectedGame: game
        },
        authenticationReducer: {
          user: {
            id: 1
          }
        }
      }
    });
    dispatch = store.dispatch;
    component = render(
      <Provider store={store}>
        <GameForm />
      </Provider>
    );
    container = component.container;
    asFragment = component.asFragment;
  });

  it("exists", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("create new game", async () => {
    axios.post.mockResolvedValue({ data: game });
    const expectedActions = [
      { type: START_SAVING },
      { type: CREATE_GAME, payload: { game } },
      { type: SHOW_SUCCESS, payload: { message: "Game added." } }
    ];

    const button = getByText(container, "Create New");
    expect(dispatch).not.toHaveBeenCalled();
    fireEvent.click(button);
    // await for all dispatches
    await new Promise(r => setTimeout(r, 1));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("update game", async () => {
    axios.put.mockResolvedValue({ data: game });
    const expectedActions = [
      { type: START_SAVING },
      { type: UPDATE_GAME, payload: { game } },
      { type: SHOW_SUCCESS, payload: { message: "Game updated." } }
    ];

    const button = getByText(container, "Update");
    expect(dispatch).not.toHaveBeenCalled();
    fireEvent.click(button);
    // await for all dispatches
    await new Promise(r => setTimeout(r, 1));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toEqual(expectedActions);
  });

});