# DND character sheet and calendar

## Backend

REST API made in GO and MongoDB

API Routes
- post "/" - sends month and retrieved data for said month 
- post "/new" - adds new data to DB
- patch "/" - deletes data in DB

Install Locally: 

```sh
 go mod download
 go build
 ./calendar.exe
```

## Frontend

Front - React(Typescript) and SCSS

Front Routes
- "/" - calendar component
- "/sheet" - character sheet

Install Locally:

```sh
npm i
npm run start
```

<details><summary>FrontEnd Folder Structure</summary>
<p>CLI command: tree /F >tree.txt</p>

```
.
│   App.test.tsx
│   App.tsx
│   index.tsx
│   logo.svg
│   react-app-env.d.ts
│   serviceWorker.ts
│   setupTests.ts
│   tree.txt
├───components
│   ├───Backlog
│   │   │   Backlog.scss
│   │   │   Backlog.tsx
│   │   │   initialValues.ts
│   │   ├───BookListElement
│   │   │       BookListElement.scss
│   │   │       BookListElement.tsx
│   │   └───BooksList
│   │           BookList.tsx
│   ├───CurrentReads
│   │       CurrentReads.scss
│   │       CurrentReads.tsx
│   ├───Customization
│   │       Customization.scss
│   │       Customization.tsx
│   ├───Home
│   │       Home.scss
│   │       Home.tsx
│   │       index.ts
│   ├───Login
│   │       Login.scss
│   │       Login.tsx
│   ├───NavBar
│   │   │   NavBar.scss
│   │   │   NavBar.tsx
│   │   ├───SideBar
│   │   │       SideBar.scss
│   │   │       SideBar.tsx
│   │   ├───SideDrawer
│   │   │       SideDrawer.scss
│   │   │       SideDrawer.tsx
│   │   └───TopBar
│   │           TopBar.scss
│   │           TopBar.tsx
│   ├───Register
│   │       Register.scss
│   │       Register.tsx
│   └───ReusableComponents
│           Form.tsx
│           NewBookForm.tsx
│           Select.tsx
│           styles.scss
├───hooks
│   │   FormValidation.tsx
│   └───useContext
│       └───contexts
│               themeContext.tsx
├───redux
│   │   store.ts
│   ├───Books
│   │       actions.ts
│   │       interfaces.ts
│   │       reducer.ts
│   └───User
│           actions.ts
│           interfaces.ts
│           reducer.ts
├───styles
│   └───scss
│           index.scss
│           mixins.scss
│           variables.scss
├───ts
│   ├───interfaces
│   │       interfaces.ts
│   └───types
│           types.ts
└───_helpers
        history.ts
        privateRoute.tsx
        PublicRoute.tsx
        sorting.ts
```           
</P>
</details>
