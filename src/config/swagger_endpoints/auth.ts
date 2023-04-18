const authSwagger: object = {
  "/auth/login": {
    "x-swagger-router-controller": "main-controller",
    post: {
      operationId: "loginPost",
      description: "Login to get JWT token and use it on Authorize",
      parameters: [
        {
          name: "authentication",
          in: "body",
          required: true,
          schema: {
            $ref: "#/definitions/Authentication",
          },
        },
      ],
      responses: {
        "200": {
          description: "Success",
          schema: {
            $ref: "#/definitions/Resource",
          },
        },
        "403": {
          description: "Access Denied",
          schema: {
            $ref: "#/definitions/Errors",
          },
        },
        "501": {
          description: "Access Denied",
          schema: {
            $ref: "#/definitions/Errors",
          },
        },
      },
    },
  },
};

module.exports = {
  ...authSwagger,
};
