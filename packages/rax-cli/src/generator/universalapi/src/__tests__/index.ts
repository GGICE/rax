import { hello } from '../index';

test('hello', (): void => {
  expect(hello()).toBe('Hello!');
});
