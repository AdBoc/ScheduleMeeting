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
<p>CLI command: tree /F</p>

```
.
│   package.json
│   tsconfig.json
├───public
│       favicon.svg
│       index.html
│       logo192.png
│       logo512.png
│       manifest.json
│       robots.txt
└───src
    │   App.tsx
    │   index.tsx
    │   react-app-env.d.ts
    │   serviceWorker.ts
    ├───assets
    │       GitHub-Mark-64px.png
    │       index.css
    │       Roboto-Light.ttf
    ├───Calendar
    │   │   Calendar.scss
    │   │   Calendar.tsx
    │   │   index.ts
    │   ├───Footer
    │   │       index.tsx
    │   ├───Month
    │   │       Days.tsx
    │   │       index.tsx
    │   └───Players
    │           index.tsx
    ├───CharacterSheet
    │   │   CharacterSheet.scss
    │   │   CharacterSheet.tsx
    │   │   index.ts
    │   ├───Attacks
    │   │       AddAttack.tsx
    │   │       index.tsx
    │   ├───Equipment
    │   │       AddEquipment.tsx
    │   │       index.tsx
    │   ├───QuickAccess
    │   │       ChangeUser.tsx
    │   │       index.tsx
    │   ├───SavingThrows
    │   │       index.tsx
    │   ├───Skills
    │   │       index.tsx
    │   ├───Stats
    │   │       index.tsx
    │   ├───Story
    │   │       index.tsx
    │   └───TopDisplay
    │           index.tsx
    ├───components
    │       InputField.tsx
    │       InputNumber.tsx
    │       NumberSelect.tsx
    │       StatButtons.tsx
    │       TextAreaField.tsx
    ├───context
    │   └───Character
    │           index.tsx
    │           reducer.ts
    ├───hooks
    │   ├───useCalendar
    │   │       index.ts
    │   └───useExpandableList
    │           index.ts
    ├───Services
    │   ├───CalendarFetch
    │   │       index.ts
    │   ├───CharacterMethods
    │   │       index.ts
    │   └───History
    │           index.ts
    ├───tests
    │       App.test.tsx
    │       setupTests.ts
    └───ts
            interfaces.ts
```           
 
</P>
</details>
