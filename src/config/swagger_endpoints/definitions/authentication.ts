const authentication: object = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "quintanaolvis@gmail.com",
    },
    password: {
      type: "string",
      example: "admin",
    },
  },
};

module.exports = {
  ...authentication,
};
