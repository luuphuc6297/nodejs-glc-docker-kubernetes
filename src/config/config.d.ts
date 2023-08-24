type EnvConfig = {
    /**
     * ============================================================
     * App configs
     * ============================================================
     */
    APP_NAME: string;
    APP_VERSION: string;
    APP_ENV: string | 'local' | 'development' | 'production';
    APP_PORT: number;
    APP_HOST: string;

/**
  * ============================================================
  * Sentry configs
  * ============================================================
  */

    SENTRY_DSN: string;
};

export default EnvConfig;
