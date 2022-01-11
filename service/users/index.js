import {
  findByEmail,
  createNewUser,
  updateToken,
  findById,
  updateSubs,
} from "../../repository/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async isUserExist(email) {
    const user = await findByEmail(email);
    return !!user;
  }

  async createUser(body) {
    const { email, subscription } = await createNewUser(body);
    return { email, subscription };
  }

  async getUser(email, password) {
    const user = await findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  async getUserOnLogin(data) {
    const { email, subscription } = data;
    const user = { email, subscription };
    return user;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    return token;
  }

  async setToken(id, token) {
    await updateToken(id, token);
  }

  async getCurrentUser(userId) {
    const data = await findById(userId);
    const { email, subscription } = data;
    return { email, subscription };
  }

  async updateSubscription(userId, subscriptionValue) {
    const { id, email, subscription } = await updateSubs(
      userId,
      subscriptionValue
    );
    const user = { id, email, subscription };
    return user;
  }
}

export default AuthService;
