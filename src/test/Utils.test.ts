import { getStringInfo, toUpperCase } from '../app/Utils';

describe('Utils test suit', () => {
    it('should return uppercase of valid string', () => {
        // arrange:
        const sut = toUpperCase;
        const expected = 'ABC';

        // act:
        const actual = sut('abc');

        // assert:
        expect(actual).toBe(expected);
    });

    describe.only('ToUpperCase Examples', () => {
        it.each([
            {
                input: 'abc',
                expected: 'ABC',
            },
            {
                input: 'my-string',
                expected: 'MY-STRING',
            },
            {
                input: 'def',
                expected: 'DEF',
            },
        ])('$input toUpperCase should be $expected', ({ input, expected }) => {
            const actual = toUpperCase(input);
            expect(actual).toBe(expected);
        });
    });

    it('should return info for valid string', () => {
        const actual = getStringInfo('My-String');

        expect(actual.lowerCase).toBe('my-string');
        expect(actual.extraInfo).toEqual({});

        expect(actual.characters).toHaveLength(9);

        expect(actual.characters).toEqual([
            'M',
            'y',
            '-',
            'S',
            't',
            'r',
            'i',
            'n',
            'g',
        ]);

        expect(actual.characters).toContain<string>('M');

        expect(actual.characters).toEqual(
            expect.arrayContaining([
                'S',
                't',
                'r',
                'i',
                'n',
                'g',
                'M',
                'y',
                '-',
            ]),
        );

        expect(actual.extraInfo).not.toBe(undefined);
        expect(actual.extraInfo).not.toBeUndefined();
        expect(actual.extraInfo).toBeDefined();
        expect(actual.extraInfo).toBeTruthy();
    });
});
