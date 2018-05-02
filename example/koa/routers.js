export const index = ({ controllers: { index } }) => ({
  "get /genUser": index.genUser,
  "get /getUser": index.getUser
});
