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

const findByVerifyToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const updateVerify = async (id, status) => {
  return await User.updateOne(
    { _id: id },
    { verify: status, verificationToken: null }
  );
};

const updateSubs = async (id, subscription) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { subscription },
    { new: "true" }
  );
};

const updateAvatar = async (id, avatarURL, idAvatarCloud = null) => {
  return await User.updateOne({ _id: id }, { avatarURL, idAvatarCloud });
};

export {
  findById,
  findByEmail,
  createNewUser,
  updateToken,
  updateSubs,
  updateAvatar,
  findByVerifyToken,
  updateVerify,
};
