import {
    OtherStringUtils,
    calculateComplexity,
    toUpperCaseWithCallBack,
} from '../../app/doubles/OtherUtils';

describe('OtherUtils test suite', () => {
    describe.only('OtherStringUtils spice', () => {
        let sut: OtherStringUtils;

        beforeEach(() => {
            sut = new OtherStringUtils();
        });

        test('Use a spy to replace the implementation of a method', () => {
            jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
                console.log('calling mocked implementation');
            });
            sut.callExternalService();
        });
        test('Use a spy to track calls', () => {
            const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
            sut.toUpperCase('asa');

            expect(toUpperCaseSpy).toBeCalledWith('asa');
        });

        test('Use a spy to track calls to other module', () => {
            const consoleLogSpy = jest.spyOn(sut, 'logString');
            sut.logString('abc');
            expect(consoleLogSpy).toBeCalledWith('abc');
        });
    });

    describe('Tracking callbacks with jest mocks', () => {
        const callbackMock = jest.fn();

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('toUpper case calls callback for invalid arg', () => {
            const actual = toUpperCaseWithCallBack('', callbackMock);
            expect(actual).toBeUndefined();
            expect(callbackMock).toBeCalledWith('Invalid argument');
            expect(callbackMock).toBeCalledTimes(1);
        });

        it('calls callback for valid arg', () => {
            const actual = toUpperCaseWithCallBack('abc', callbackMock);
            expect(actual).toBe('ABC');
            expect(callbackMock).toBeCalledWith('called function with abc');
            expect(callbackMock).toBeCalledTimes(1);
        });
    });

    describe('Tracking callbacks', () => {
        let cbArgs = [];
        let timesCalled = 0;

        function callbackMock(arg: string) {
            cbArgs.push(arg);
            timesCalled++;
        }

        afterEach(() => {
            cbArgs = [];
            timesCalled = 0;
        });

        it('toUpper case calls callback for invalid arg', () => {
            const actual = toUpperCaseWithCallBack('', callbackMock);
            expect(actual).toBeUndefined();
            expect(cbArgs).toContain('Invalid argument');
            expect(timesCalled).toBe(1);
        });

        it('calls callback for valid arg', () => {
            const actual = toUpperCaseWithCallBack('abc', callbackMock);
            expect(actual).toBe('ABC');
            expect(timesCalled).toBe(1);
            expect(cbArgs).toContain('called function with abc');
        });
    });

    it('calculates complexity', () => {
        const someInfo = {
            length: 5,
            extraInfo: {
                field1: 'someInfo',
                field2: 'Some other info',
            },
        };
        const actual = calculateComplexity(someInfo as any);
        expect(actual).toBe(10);
    });
});
