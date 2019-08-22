import compiler from './compiler.js';

test('Inserts name and outputs JavaScript', async () => {
  const stats = await compiler('entry.js');
  const output = stats.toJson().modules[0].source;

  console.log(output);

  expect(output.indexOf('var toString = Object.prototype.toString;')).toBe(0);
  expect(output.indexOf('===') > 0).toBe(true);
});
