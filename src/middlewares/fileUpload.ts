import multer from 'multer';

// Configure multer to store files in memory
const storage = multer.memoryStorage();

// Create multer upload instance
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB max file size
  },
});

// Export middleware to handle a single file upload from the "file" field
export default upload;


