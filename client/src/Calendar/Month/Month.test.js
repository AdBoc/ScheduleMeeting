import {playerContext} from "../../context/SelectedUser";
import {render, screen} from '@testing-library/react';
import React from "react";
import Month from "./index";
import {apiService} from "../../Services/FetchAPI";

describe('Calendar--Month', () => {
    const RealDate = Date.now();
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({character: "{character}"}),
    }));
    beforeAll(() => {
        global.Date.now = jest.fn(() => new Date('2020-10-05T10:20:30Z').getDate());

    })
    afterAll(() => {
        global.Date.now = RealDate;

    })
    beforeEach(() => {
        fetch.mockClear();
    })

    test('Is calendar rendered properly', async () => {
        const user = null;
        const handleUser = jest.fn();

        render(
            <playerContext.Provider value={{user, handleUser}}>
                <Month/>
            </playerContext.Provider>
        )

        expect(screen.getByText('31')).toBeInTheDocument();
    })
});