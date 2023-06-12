import { getStringForApi } from "../../utils/string";

describe('getStringForApi', () => {
  test('converts string to lowercase and replaces spaces with underscores', () => {
    const input = 'Hello World';
    const expected = 'hello_world';

    const result = getStringForApi(input);

    expect(result).toEqual(expected);
  });

  test('does not modify the string if it is already lowercase without spaces', () => {
    const input = 'hello_world';
    const expected = 'hello_world';

    const result = getStringForApi(input);

    expect(result).toEqual(expected);
  });

  test('returns an empty string if input is empty', () => {
    const input = '';
    const expected = '';

    const result = getStringForApi(input);

    expect(result).toEqual(expected);
  });
});
