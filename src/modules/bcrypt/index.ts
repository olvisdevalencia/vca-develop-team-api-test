import * as bcryptjs from "bcryptjs";

const generateHashedPassword = (password: string, saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcryptjs.genSalt(saltRounds, (err: any, salt: any) => {
      reject(err);
      bcryptjs.hash(password, salt, (err: any, hash: any) => {
        reject(err);
        resolve(hash);
      });
    });
  });
};

module.exports = {
  generateHashedPassword,
};
