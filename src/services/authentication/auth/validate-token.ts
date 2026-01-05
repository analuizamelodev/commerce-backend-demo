import jwt from "jsonwebtoken";

const SECRET = "my_super_secret_key";

export const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: "Invalid or expired token" };
  }
};
