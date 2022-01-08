import React from 'react';
import { Provider } from "react-redux";
import { render, getByText } from '@testing-library/react';
import { createTestStore } from '../store/testStore';
import GameDetails from '../../components/details/GameDetails';

let store;
let dispatch;
let component;
let container;
let asFragment;

describe("GameDetails", () => {

  beforeEach(() => {
    store = createTestStore({
      mockStore: true,
      initialState: {
        gameReducer: {
          selectedGame: {
            id: "123", title: "My Game"
          }
        }
      }
    });
    dispatch = store.dispatch;
    component = render(
      <Provider store={store}>
        <GameDetails />
      </Provider>
    );
    container = component.container;
    asFragment = component.asFragment;
  });

  it("exists", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("has game title", () => {
    expect(getByText(container, "My Game")).toBeVisible();
  });

});