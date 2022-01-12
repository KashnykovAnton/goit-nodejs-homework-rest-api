import User from "../../model/User";

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const createNewUser = async (body) => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSubs = async (id, subscription) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { subscription },
    { new: "true" }
  );
};

export { findById, findByEmail, createNewUser, updateToken, updateSubs };
