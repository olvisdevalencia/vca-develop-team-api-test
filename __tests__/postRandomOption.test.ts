const { postRandomOption, MAX_OPTIONS } = require("../src/controllers/options");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

describe('postRandomOption', () => {
    test('returns a valid option', () => {
        const req = {
            body: [
                { name: 'Option A', percentage: 50 },
                { name: 'Option B', percentage: 30 },
                { name: 'Option C', percentage: 10 },
            ]
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        postRandomOption(req, res);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ name: expect.any(String), percentage: expect.any(Number) });
    });

    test("should return an error if request body is not an array", () => {
        const req = { body: "not an array" };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        postRandomOption(req, res);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.json).toHaveBeenCalledWith({
            error: `${ReasonPhrases.INTERNAL_SERVER_ERROR} Request body must be an array`,
        });
    });

    test("should return an error if request body has too many options", () => {
        const req = { body: Array.from({ length: 101 }, () => ({ name: "option", percentage: 1 })) };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        postRandomOption(req, res);

        console.log(MAX_OPTIONS);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.json).toHaveBeenCalledWith({
            error: `${ReasonPhrases.INTERNAL_SERVER_ERROR} Too many options (maximum is ${MAX_OPTIONS})`,
        });
    });

    test("should return an error if an option name is not a string", () => {
        const req = { body: [{ name: 123, percentage: 50 }] };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        postRandomOption(req, res);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.json).toHaveBeenCalledWith({
            error: `${ReasonPhrases.INTERNAL_SERVER_ERROR}, 123 must be a non-empty string`,
        });
    });

    test("should return an error if an option percentage is negative", () => {
        const req = { body: [{ name: "option", percentage: -50 }] };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        postRandomOption(req, res);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.json).toHaveBeenCalledWith({
            error: `${ReasonPhrases.INTERNAL_SERVER_ERROR}, option percentage must be a non-negative number`,
        });
    });
});
