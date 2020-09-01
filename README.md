# DND character sheet and calendar

## Backend

REST API made in GO and MongoDB

API Routes

- post "/api/" - sends month and retrieved data for said month
- post "/api/new" - adds new day to month
- patch "/api/" - deletes selected day from month
- post "/api/character" - get selected character data
- patch "/api/character" - store character in DB

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
- "/reset" - use in emergency, clears all localStorage

Install Locally:

```sh
npm i
npm run start
```

<details><summary>FrontEnd Folder Structure</summary>
<p>CLI command: tree /F >tree.txt</p>

```
.
│   App.tsx
│   index.tsx
│   react-app-env.d.ts
│   serviceWorker.ts
├───assets
│       GitHub-Mark-64px.png
│       icons8-trash.svg
│       index.css
│       Roboto-Light.ttf
│       UI_icon_expand.svg
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
│   │   CurrentComponent.tsx
│   │   index.ts
│   ├───Attacks
│   │       AddAttack.tsx
│   │       index.tsx
│   │       styles.scss
│   ├───Equipment
│   │       AddEquipment.tsx
│   │       index.tsx
│   │       styles.scss
│   ├───QuickAccess
│   │       ChangeUserAndData.tsx
│   │       index.tsx
│   │       styles.scss
│   ├───SavingThrows
│   │       index.tsx
│   │       styles.scss
│   │       ThrowsValues.tsx
│   ├───Skills
│   │       index.tsx
│   │       styles.scss
│   ├───Stats
│   │       index.tsx
│   │       styles.scss
│   ├───Story
│   │       index.tsx
│   │       styles.scss
│   └───TopDisplay
│           index.tsx
│           styles.scss
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
│   └───useCalendar
│           index.ts
├───Services
│   ├───CharacterMethods
│   │       index.ts
│   ├───FetchAPI
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

## TO DO:

Better typescript integration especially while calculating currency
Better current active effects style
Add Extra layer to details view with handler to hide it on click

Performance idea -> values like spell save DC only changed when level (proficiency)
Zapisywac bonus damage w attack jako number

UsePrevious hook 
export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
