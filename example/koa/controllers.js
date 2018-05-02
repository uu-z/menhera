export const index = ({ models: { User } }) => ({
  async getUser(ctx) {
    let user = await User.find();
    ctx.body = user;
  },
  async genUser(ctx) {
    let user = new User({
      name: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 5)
    });
    await user.save();
    ctx.body = user;
  }
});
