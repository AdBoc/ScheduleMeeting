import React from "react";
import {cleanup, render} from "@testing-library/react";
import {Provider} from "react-redux";

import Users from "./index";
import store from "../../../redux/store";
import {userContext} from "../../../context/users";
import styles from "./users.module.scss";
import userEvent from "@testing-library/user-event";

const handleUser = jest.fn();

function testRender(jsx, user) {
    return render(
        <Provider store={store}>
            <userContext.Provider value={{user, handleUser}}>
                {jsx}
            </userContext.Provider>
        </Provider>
    )
}

afterEach(cleanup);

describe("CalendarTest", () => {
    test("All 8 buttons are being rendered correctly", async () => {
        const {findAllByRole} = testRender(<Users/>, null);
        const buttons = await findAllByRole('button');
        expect(buttons).toHaveLength(8);
    });

    test("Button has correct class and changes user", async () => {
        const {findByText} = testRender(<Users/>, null);
        const button = await findByText("Janek");
        expect(button).toHaveClass(styles.userBasic);
        userEvent.click(button);
        expect(handleUser).toHaveBeenCalledTimes(1);
    })

    test("Button with selected user has correct class", async () => {
        const {findByText} = testRender(<Users/>, "Janek");
        const button = await findByText("Janek");
        expect(button).toHaveClass(styles.userActive);
    })
})