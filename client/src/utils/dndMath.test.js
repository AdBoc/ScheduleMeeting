import {dndMath} from "./dndMath";
import {cleanup} from "@testing-library/react";

afterEach(cleanup);

describe("dndApi test", () => {
    describe("test skill proficiency calculation", () => {
        let proficiencyByLevel = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
        for (let i = 0; i < proficiencyByLevel.length; i++) {
            test(`count character proficiency for level: ${i + 1}`, () => {
                expect(dndMath.skillProficiency(i + 1)).toEqual(proficiencyByLevel[i]);
            });
        }
    });

    describe("count saving throw", () => {
        test("saving throw, level: 5, stat proficiency: 5, tagged", () => {
            expect(dndMath.savingThrowProficiency(5, 15, true)).toEqual(5);
        });
        test("saving throw, level: 5, stat proficiency: 5, not tagged", () => {
            expect(dndMath.savingThrowProficiency(5, 15, false)).toEqual(2);
        });
    });

    describe("count skill proficiency value", () => {
        let abilityScore = [-5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10];
        for (let i = 0; i < abilityScore.length; i++) {
            test(`check skill proficiency for level: ${i + 1}`, () => {
                expect(dndMath.statModifier(i + 1)).toEqual(abilityScore[i]);
            });
        }
    });
});