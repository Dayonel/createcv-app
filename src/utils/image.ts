import imageCompression from 'browser-image-compression';

type Options = Parameters<typeof imageCompression>[1];

const ALLOWED = ['.jpg', '.jpeg', '.png'];
const MAX_UPLOAD = 5000000; // 5MB

export const PROFILE: Options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const GALLERY: Options = {
  ...PROFILE,
  maxSizeMB: 0.15,
  maxWidthOrHeight: 1000,
  fileType: 'image/jpeg',
};

export const validate = (file: File) => {
  const ext = `.${file.name.toLowerCase().split('.').pop()}`;
  if (!ALLOWED.includes(ext)) return 'File extension is not supported.';
  if (file.size > MAX_UPLOAD) return 'File size exceeds 5MB limit.';
  return null;
};

export const compress = async (file: File, options = PROFILE) =>
  imageCompression.getDataUrlFromFile(await imageCompression(file, options));
