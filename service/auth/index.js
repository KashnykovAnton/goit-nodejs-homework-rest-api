import Users from "../../repository/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async isUserExist(email) {
    const user = await Users.findByEmail(email);
    return !!user;
  }

  async createUser(body) {
    // const { id, email, subscription } = await Users.create(body);
    // return { id, email, subscription };
    const { email, subscription } = await Users.create(body);
    return { email, subscription };
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  async getUserOnLogin(data) {
    // console.log(data);
    const { email, subscription } = data;
    const user = { email, subscription };
    // console.log(user);
    return user;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    return token;
  }

  async setToken(id, token) {
    await Users.updateToken(id, token);
  }

  async updateSubscription(userId, subscriptionValue) {
    const { id, email, subscription } = await Users.findById(userId);
    const user = { id, email, subscription };
    user.subscription = subscriptionValue;
    return user;
  }
}

export default AuthService;
