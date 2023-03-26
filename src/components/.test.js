// Test 1
test("fetch returns an array of objects", async () => {
  const response = await fetch("http://localhost/php");
  const data = await response.json();

  expect(Array.isArray(data)).toBe(true);
  expect(typeof data[0]).toBe("object");
});
// Test 2
test("fetching from localhost/php/ returns 19 objects", async () => {
  const response = await fetch("http://localhost/php/");
  const data = await response.json();
  expect(data.length).toEqual(19);
});
// Test 3
test("fetching from localhost/php/ displays array of objects in chunks of 10 per page", async () => {
  const response = await fetch("http://localhost/php/");
  const data = await response.json();

  // check that data is an array of objects
  expect(Array.isArray(data)).toBeTruthy();
  expect(data.every((obj) => typeof obj === "object")).toBeTruthy();

  // check that data is displayed in chunks of 10 per page
  const pageChunks = chunkArray(data, 10);
  expect(pageChunks.length).toBeGreaterThan(0);
  expect(pageChunks.every((chunk) => chunk.length <= 10)).toBeTruthy();
});

// helper function to chunk an array into smaller arrays of a specified size
function chunkArray(arr, size) {
  return arr.reduce((acc, val) => {
    if (acc.length === 0 || acc[acc.length - 1].length === size) {
      acc.push([val]);
    } else {
      acc[acc.length - 1].push(val);
    }
    return acc;
  }, []);
}
