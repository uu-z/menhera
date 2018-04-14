export const index = ({ controllers: { index } }) => ({
  "get /": index.getIndex
});

export const user = ({ controllers: { user } }) => ({
  "get /user": user.getUser
});
