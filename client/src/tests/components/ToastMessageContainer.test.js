import React from 'react';
import { Provider } from "react-redux";
import { render, findByText } from '@testing-library/react';
import { showSuccessToast } from '../../actions/toastActions';
import { createTestStore } from '../store/testStore';
import ToastMessageContainer from '../../components/layout/ToastMessageContainer';

let store;
let dispatch;
let component;
let container;
let asFragment;

describe("ToastMessageContainer", () => {

  beforeEach(() => {
    store = createTestStore();
    dispatch = store.dispatch;
    component = render(
      <Provider store={store}>
        <ToastMessageContainer />
      </Provider>
    );
    container = component.container;
    asFragment = component.asFragment;
  });

  it("exists", () => {
    expect(asFragment()).toMatchSnapshot();
  });
  
  it("shows one toast", async () => {
    dispatch(showSuccessToast("My toast"));

    expect(await findByText(container, "My toast")).toBeVisible();
  });
});

