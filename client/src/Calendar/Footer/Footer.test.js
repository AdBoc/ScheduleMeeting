import React from 'react';
import {render, screen} from '@testing-library/react';
import Footer from "./index";
import {playerContext} from '../../context/SelectedUser';
import userEvent from "@testing-library/user-event";

function renderFooter(user) {
  const handleUser = jest.fn();
  render(
    <playerContext.Provider value={{user, handleUser}}>
      <Footer/>
    </playerContext.Provider>
  );
}

describe('Calendar--Footer', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({character: "{character}"}),
  }));

  beforeEach(() => {
    fetch.mockClear();
  })

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });

  test('Render Footer without selected User', () => {
    renderFooter(null);
    expect(screen.getByText(/v/)).toBeInTheDocument();
    expect(screen.queryByText("Sheet")).toBeNull();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute('href', 'https://github.com/AdBoc/ScheduleMeeting');
  });

  test('Renders Footer with selected User', () => {
    renderFooter("Test");
    expect(screen.getByText(/v/)).toBeInTheDocument();
    expect(screen.getByText("Sheet")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute('href', 'https://github.com/AdBoc/ScheduleMeeting');
  });

  test('Press Sheet button when user is set redirects', async () => {
    renderFooter("Test");
    await userEvent.click(screen.getByRole('button'));
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

// import React from 'react';
// import {render} from '@testing-library/react';
// import App from './App';
//
// test('renders learn react link', () => {
//   const {getByText} = render(<App/>);

//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
