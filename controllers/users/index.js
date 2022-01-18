import { HttpCode } from "../../config/constants";
import {
  UploadFileService,
  // LocalFileStorage,
  CloudFileStorage,
} from "../../service/file-storage";

const uploadAvatar = async (req, res, _next) => {
  const uploadService = new UploadFileService(
    // LocalFileStorage,
    CloudFileStorage,
    req.file,
    req.user
  );

  const avatarUrl = await uploadService.updateAvatar();

  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { avatarUrl } });
};

export { uploadAvatar };
