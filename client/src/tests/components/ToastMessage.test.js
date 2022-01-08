import React from 'react';
import { Provider } from "react-redux";
import { render, getByRole, fireEvent } from '@testing-library/react';
import { HIDE_TOAST } from '../../actions/toastActions';
import { createTestStore } from '../store/testStore';
import ToastMessage from '../../components/layout/ToastMessage';

let store;
let dispatch;
let component;
let container;
let asFragment;
let toast = {
  id: "123",
  isError: false,
  message: "My toast"
}

describe("ToastMessage", () => {

  beforeEach(() => {
    store = createTestStore({
      mockStore: true
    });
    dispatch = store.dispatch;
    component = render(
      <Provider store={store}>
        <ToastMessage key={toast.id} toast={toast} />
      </Provider>
    );
    container = component.container;
    asFragment = component.asFragment;
  });

  it("exists", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("toast initially shown", () => {
    const element = getByRole(container, "alert");
    expect(element.classList.contains("show")).toBeTruthy();
  });
  
  it("hide toast on hidden event", () => {
    const element = getByRole(container, "alert");
    expect(dispatch).not.toHaveBeenCalled();
    fireEvent(element, new CustomEvent("hidden.bs.toast"));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toEqual([
      { type: HIDE_TOAST, payload: { id: "123" } }
    ]);
  });

  it("hide toast on button click", async () => {
    const button = container.querySelector("button");
    expect(dispatch).not.toHaveBeenCalled();
    fireEvent.click(button);
    // delay to fire bootstrap event
    await new Promise(r => setTimeout(r, 1));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toEqual([
      { type: HIDE_TOAST, payload: { id: "123" } }
    ]);
  });

});