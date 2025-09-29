import { storage } from '../config/firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadBufferToStorage = async (buffer, { contentType = 'application/octet-stream', pathPrefix = 'uploads' } = {}) => {
  const bucket = storage.bucket();
  const id = uuidv4();
  const filePath = `${pathPrefix}/${id}`;
  const file = bucket.file(filePath);
  await file.save(buffer, { contentType, public: true, resumable: false, metadata: { cacheControl: 'public, max-age=31536000' } });
  const [url] = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });
  return { url, path: filePath, id };
};
