const config = {
  server: {
    PORT: process.env.PORT || 3000,
    LOGGER: "dev",
    SWAGGER: `localhost:${process.env.PORT || 3000}`,
    SWAGGER_FULL: `http://localhost:${process.env.PORT || 3000}`,
    SWAGGER_SCHEME: ["http"],
  },
};

export = config;
