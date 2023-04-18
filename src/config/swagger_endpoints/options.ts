const optionsSwagger: object = {
  "/options": {
    "x-swagger-router-controller": "main-controller",
    post: {
      security: [
        {
          Bearer: [],
        },
      ],
      operationId: "createOptionsPost",
      description:
        "Ingreso multiples opciones con un mismo nombre, los porcentajes de las opciones repetidas se deben acumular y tratar como una sola",
      parameters: [
        {
          name: "Informmación requerida de las opciones",
          in: "body",
          required: true,
          type: "object",
          schema: {
            $ref: "#/definitions/Options",
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
  ...optionsSwagger,
};
