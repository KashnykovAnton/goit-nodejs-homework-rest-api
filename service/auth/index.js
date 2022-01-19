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
    const { email, subscription, avatarURL } = await createNewUser(body);
    return { email, subscription, avatarURL };
  }

  async getUser(email, password) {
    const user = await findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  getToken(id, email) {
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    return token;
  }

  async setToken(id, token) {
    await updateToken(id, token);
  }

  async getCurrentUser(userId) {
    const { email, subscription } = await findById(userId);
    return { email, subscription };
  }

  async updateSubscription(userId, subscriptionValue) {
    const { id, email, subscription } = await updateSubs(
      userId,
      subscriptionValue
    );
    return { id, email, subscription };
  }
}

export default AuthService;
