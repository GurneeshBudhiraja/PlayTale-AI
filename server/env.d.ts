namespace NodeJS {
  interface ProcessEnv {
    ORIGINS: string | string[];
    PORT: string;
    CLIENT_SECRET: string;
    FRONTEND_URL: string;
    DB_URI: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  }
}