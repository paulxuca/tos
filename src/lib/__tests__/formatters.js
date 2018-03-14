const {numerical} = require('../formatters');

it('numerical format', () => {
    const tests = [
        [123, '123'],
        [1, '1'],
        [1234, '1,234'],
        [0, '0'],
        [123456, '123,456']
    ];

    tests.forEach(([input, expected]) => expect(numerical(input)).toEqual(expected));
});
