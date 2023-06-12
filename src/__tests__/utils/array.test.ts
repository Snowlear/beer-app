// Import the necessary functions to test
import { concatUniquely, compareObjects } from '../../utils/array';

// Test the compareObjects function
describe('compareObjects', () => {
  test('returns true for equal objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };

    expect(compareObjects(obj1, obj2)).toBe(true);
  });

  test('returns false for different objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };

    expect(compareObjects(obj1, obj2)).toBe(false);
  });
});

// Test the concatUniquely function
describe('concatUniquely', () => {
  test('concatenates arrays of objects uniquely', () => {
    const array1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    const array2 = [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
    const expected = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];

    expect(concatUniquely(array1, array2)).toEqual(expected);
  });
});