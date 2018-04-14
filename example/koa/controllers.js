export const index = ({ test }) => ({
  getIndex(ctx) {
    ctx.body = test.index++;
  }
});

export const user = ({ test }) => ({
  getUser(ctx) {
    test.user = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);
    ctx.body = test.user;
  }
});
