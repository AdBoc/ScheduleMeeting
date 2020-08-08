#DND character sheet and calendar

##Backend

REST API made in GO and MongoDB

API Routes
- post "/" - sends month and rereived data for said month 
- post "/new" - adds new data to DB
- patch "/" - deletes data in DB

Install Locally: 

- go mod download
- go build
- ./calendar.exe

##Frontend

Front - React(Typescript) and SCSS

Front Routes
- "/" - calendar component
- "/sheet" - character sheet

Install Locally:

- npm i
- npm run start

<details><summary>FrontEnd Folder Structure</summary>
<p>CLI command: tree /F</p>
<p>
C:.
│   f.txt
│   package-lock.json
│   package.json
│   tsconfig.json
│   
├───public
│       favicon.svg
│       index.html
│       logo192.png
│       logo512.png
│       manifest.json
│       robots.txt
│       
└───src
    │   App.tsx
    │   index.tsx
    │   react-app-env.d.ts
    │   serviceWorker.ts
    │   
    ├───assets
    │       GitHub-Mark-64px.png
    │       index.css
    │       Roboto-Light.ttf
    │       
    ├───Calendar
    │   │   Calendar.scss
    │   │   Calendar.tsx
    │   │   index.ts
    │   │   
    │   ├───Footer
    │   │       index.tsx
    │   │       
    │   ├───Month
    │   │   │   index.tsx
    │   │   │   
    │   │   └───Days
    │   │           index.tsx
    │   │           
    │   └───Players
    │           index.tsx
    │           
    ├───CharacterSheet
    │   │   CharacterSheet.scss
    │   │   CharacterSheet.tsx
    │   │   index.ts
    │   │   
    │   ├───Attacks
    │   │   │   Attacks.tsx
    │   │   │   
    │   │   └───AddAttack
    │   │           AddAttack.tsx
    │   │           
    │   ├───Equipment
    │   │   │   Equipment.tsx
    │   │   │   
    │   │   └───AddEquipment
    │   │           AddEquipment.tsx
    │   │           
    │   ├───QuickAccess
    │   │       QuickAccess.tsx
    │   │       
    │   ├───SavingThrows
    │   │       SavingThrows.tsx
    │   │       
    │   ├───Skills
    │   │       Skills.tsx
    │   │       
    │   ├───Stats
    │   │       Stats.tsx
    │   │       
    │   └───Story
    │           Story.tsx
    │           
    ├───components
    │       InputField.tsx
    │       NumberSelect.tsx
    │       StatButtons.tsx
    │       TextAreaField.tsx
    │       
    ├───context
    │   └───Character
    │           index.tsx
    │           reducer.ts
    │           
    ├───hooks
    │   ├───UseCalendar
    │   │       index.tsx
    │   │       
    │   └───UseExpandableList
    │           index.tsx
    │           
    ├───Services
    │   ├───CalendarFetch
    │   │       index.ts
    │   │       
    │   └───History
    │           index.ts
    │           
    ├───tests
    │       App.test.tsx
    │       setupTests.ts
    │       
    └───ts
            interfaces.ts
            
</P>
</details>
