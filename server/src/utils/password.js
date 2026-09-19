import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const salt = async () => bcrypt.genSalt(10);
  return bcrypt.hash(password, await salt());
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const validatePasswordPolicy = (password) => {
  // Min 10 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
  return regex.test(password);
};
