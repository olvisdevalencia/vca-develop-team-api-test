const errorDef: object = {
    type: "object",
    properties: {
        message: {
            type: "string"
        }
    },
};

module.exports = {
    ...errorDef,
};
