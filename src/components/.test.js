describe("Capsules", () => {
  test("fetching capsules data from API", async () => {
    const response = await fetch("https://api.spacexdata.com/v3/capsules");
    expect(response.status).toBe(200);
  });
});
