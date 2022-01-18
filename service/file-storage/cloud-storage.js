import { v2 as cloudinary } from "cloudinary";
import { promisify } from "util";
import { unlink } from "fs/promises";
import { CLOUD_FOLDER_AVATARS } from "../../config/constants";
import { updateAvatar } from "../../repository/users";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class CloudStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filePath = file.path;
    this.idAvatarCloud = user.idAvatarCloud;
    this.folderAvatars = CLOUD_FOLDER_AVATARS;
    this.uploadCloud = promisify(cloudinary.uploader.upload);
  }

  async save() {
    const { public_id: returnedIdAvatarCloud, secure_url: avatarUrl } =
      await this.uploadCloud(this.filePath, {
        public_id: this.idAvatarCloud,
        folder: this.folderAvatars,
      });
    const newIDAvatarCloud = returnedIdAvatarCloud.replace(
      `${this.folderAvatars}/`,
      ""
    );
    await updateAvatar(this.userId, avatarUrl, newIDAvatarCloud);
    await this.removeUploadFiles(this.filePath);
    return avatarUrl;
  }

  async removeUploadFiles(filePath) {
    try {
      await unlink(filePath);
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default CloudStorage;
