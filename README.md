# DND character sheet and calendar

## How to use

HP -> Tap on HP to add or subtract from total pool of HP.

Stats -> In order to change stat tap on number.

Sills -> Skills values are recalculated with every stat change. Press edit to tag and manually increment skill value.

Save throws -> Tap on saving throw to tag it. Only two can be tagged simultaneously.

Actions -> Tab with attacks, spells, actions and effects.

Actons -> Attacks -> Add attacks. Attaks are sorted alphabetically. To give attacks high order give it name with special characters. (example: -Sword- is higher in order than Sword).

Actons -> Spells -> Add spells, Manage spell slots, Tap on Save DC to select appropriate stat. Click on labels to sort spells.

Actons -> Actions -> Tap to see description of all generic actions.

Actons -> Effects -> Create and activate effects.

Equipment -> Add items and use Select to filter them, items are sorted alphabetically.

Equipment -> Gold -> Tap on total GP to manage your currencies.

Background -> Describe your character here.

Quick Accsess -> Change some stats.

## Backend

REST API written in GO 

Database: MongoDB

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

<details><summary>Frontend Structure</summary>
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
│   │   CharacterSheet.tsx
│   │   CurrentComponent.tsx
│   │   index.ts
│   │   styles.scss
│   │   variables.scss
│   ├───AllActions
│   │   │   AllActions.tsx
│   │   │   index.ts
│   │   │   styles.scss
│   │   ├───Actions
│   │   │       index.tsx
│   │   ├───Attacks
│   │   │       AddAttack.tsx
│   │   │       index.tsx
│   │   ├───Effects
│   │   │       AddEffect.tsx
│   │   │       index.tsx
│   │   └───Spells
│   │           AddSpell.tsx
│   │           index.tsx
│   │           SpellSlots.tsx
│   ├───Equipment
│   │       AddEquipment.tsx
│   │       Gold.tsx
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
│   │       Skill.tsx
│   │       styles.scss
│   ├───Stats
│   │       index.tsx
│   │       StatsSelect.tsx
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
│       Reset.tsx
│       StatButtons.tsx
│       TextAreaField.tsx
├───context
│   └───Character
│           index.tsx
│           reducer.ts
├───hooks
│   ├───useCalendar
│   │        index.ts
│   └───useOutsideClick
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

### TO DO:

Select All, Remove All in current month

Better typescript integration (currency)

Improve styles and css structure

Add Extra layer to details view with handler to hide it on click

today: 
diceSim
animations on form 
select/unselect All days
swipe