const optionsDef: object = {
  type: "array",
  required: true,
  example: [
    {
      "name": "Option 1",
      "percentage": 30
    },
    {
      "name": "Option 2",
      "percentage": 50
    },
    {
      "name": "Option 3",
      "percentage": 20
    }
  ],
};

module.exports = {
  ...optionsDef,
};
