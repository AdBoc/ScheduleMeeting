import React from "react";
import {render, screen} from "@testing-library/react";
import {playerContext} from "../../context/SelectedUser";
import Players from "./index";

describe('Calendar--Players', () => {
  test('When user selected, button has custom style', () => {
    const user = "Test";
    const handleUser = jest.fn();
    render(
      <playerContext.Provider value={{user, handleUser}}>
        <Players/>
      </playerContext.Provider>
    );
    expect(screen.getByText('Test')).toHaveClass("person-container__person--active");
  });
});