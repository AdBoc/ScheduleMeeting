import React from "react";
import {render} from "@testing-library/react";
import {playerContext} from "../../context/SelectedUser";
import Footer from "../Footer";

describe('Calendar--Players', () => {
  test('When user selected, button has custom styles', () => {
    const user = "Test";
    const handleUser = jest.fn();
    render(
      <playerContext.Provider value={{user, handleUser}}>
        <Footer/>
      </playerContext.Provider>
    );
    // const buttons = screen.getByRole('generic');
    // expect(buttons.children.length).toBe(8);
  });
});