import React from 'react';
import { Provider } from "react-redux";
import { render } from '@testing-library/react';
import { FETCH_GAMES, START_LOADING } from '../../actions/gameActions';
import { createTestStore } from '../store/testStore';
import axios from 'axios';
import GameTable from '../../components/table/GameTable';

let store;
let dispatch;
let component;
let container;
let asFragment;
let games = [
  { id: "1", title: "Game 1" }
];

jest.mock("axios");

describe("GameTable", () => {

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: { games }
    });
    store = createTestStore({
      mockStore: true,
      initialState: {
        gameReducer: {
          games,
          selectedGame: games[0]
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
        <GameTable />
      </Provider>
    );
    container = component.container;
    asFragment = component.asFragment;
  });

  it("exists", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("fetches games", async () => {
    const expectedActions = [
      { type: START_LOADING },
      { type: FETCH_GAMES, payload: { games } }
    ];

    // await for all dispatches
    await new Promise(r => setTimeout(r, 1));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toEqual(expectedActions);
  });

});