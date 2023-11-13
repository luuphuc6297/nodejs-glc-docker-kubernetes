module.exports = {
    objectIdPattern: /^[0-9a-fA-F]{24}$/,
    STATUS: {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        PENDING_DELETE: 'pending_delete',
    },
    OAUTH2: {
        GOOGLE: 'google',
        GITHUB: 'github',
        LINKEDIN: 'linked_in',
    },
    USER_PROFILE: {
        URL_GOOGLE: 'https://oauth2.googleapis.com/tokeninfo?id_token=',
        URL_BASIC_INFO_LINKED_IN:
            'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))',
        URL_EMAIL_LINK_IN: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        GITHUB_USER_EMAIL: 'https://api.github.com/user/emails',
        GITHUB_USER_PROFILE: 'https://api.github.com/user',

        /**
         * STATE_LOGIN_AUTH
         */
        STATE_LOGIN_AUTH: 'security_token%3D138r5719ru3e1%26url%3Dhttps%3A%2F%2Foauth2.example.com%2Ftoken',

        // GOOGLE
        GOOGLE_AUTHORIZATION_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
        GOOGLE_TOKEN_URL: 'https://oauth2.googleapis.com/token',

        // LINKED IN
        LINKED_IN_AUTHORIZATION_URL: 'https://www.linkedin.com/oauth/v2/authorization',
        LINKED_IN_TOKEN_URL: 'https://www.linkedin.com/oauth/v2/accessToken',

        // GITHUB
        GITHUB_AUTHORIZATION_URL: 'https://github.com/login/oauth/authorize',
        GITHUB_TOKEN_URL: 'https://github.com/login/oauth/access_token',
    },
    // CLIENT
    CLIENT_STATUS: {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
    },
    // INVITE_STATUS
    INVITE_STATUS: {
        SENT: 'sent',
        ACCEPTED: 'accepted',
        CANCELLED: 'cancelled',
    },

    // USER
    USER_TYPES: {
        ADMIN: 'admin',
        USER: 'user',
    },

    USER_STATUS: {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
    },
    USER_IDENTITIES: {
        GOOGLE: 'google',
        LINKEDIN: 'linkedin',
        GITHUB: 'github',
    },

    INVITE_TOKEN_STATUS: {
        DELETED: 'deleted',
    },

    // PAGINATION
    PAGINATION: {
        PAGE: 1,
        PER_PAGE: 10,
        SORT_BY: 'created_at',
        ORDER_BY: 1,
    },

    AGENDA_JOB: {
        UPDATE_SUBSCRIPTION: 'update_subscription',
        CANCEL_SUBSCRIPTION: 'cancel_subscription',
    },
    SUBSCRIPTION_STATUS: {
        FUTURE: 'future',
        ACTIVE: 'active',
        IN_TRIAL: 'in_trial',
        NON_RENEWING: 'non_renewing',
        PAUSED: 'paused',
        CANCELED: 'cancelled',
    },
    SUBSCRIPTION_BILLING_CYCLE: {
        WEEKLY: 'Weekly',
        MONTHLY: 'Monthly',
        YEARLY: 'Yearly',
    },
    CONCURRENCY: {
        VND: 'vnd',
        USD: 'usd',
        EUR: 'eur',
    },
    INVITE_TOKEN_EXP: '5 minutes',
    EXPIRE_SYNC_SUBSCRIPTION: '1 day',
    SYNC_SUBSCRIPTION_DATA: '',

    ORGANIZATION_STATUS: {
        ACTIVE: 'active',
        TRIAL: 'trial',
        ARCHIVE: 'archive',
    },
    WEEK_START_ON: {
        MONDAY: 'monday',
        TUESDAY: 'tuesday',
        WEDNESDAY: 'wednesday',
        THURSDAY: 'thursday',
        FRIDAY: 'friday',
        SATURDAY: 'saturday',
        SUNDAY: 'sunday',
    },
    INDUSTRY: {
        ACCOUNTING: 'accounting',
        AGENCY: 'agency',
        DIGITAL_MARKETING: 'digital_marketing',
        IT_SERVICES: 'it_services',
        FREELANCING: 'freelancing',
        ENTERTAINMENT: 'entertainment',
        SOFTWARE: 'software',
        E_COMMERCE: 'eCommerce',
    },
};
