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

    TEMPLATE_NAME: {
        INVITE_TO_ORGANIZATION: 'invite-to-organization',
        RESET_PASSWORD: 'reset-password',
        VERIFY_ACCOUNT: 'verify-email',
        CONFIRM_PASSWORD_CHANGED: 'confirm-password-changed',
    },

    TEMPLATE_PARAMS: {
        INVITE_TO_ORGANIZATION: {
            INVITER: 'inviter',
            INVITED_ORGANIZATION: 'invited-organization',
            INVITE_URL: 'invite-url',
        },
        RESET_PASSWORD: {
            USER_FULLNAME: 'user-fullname',
            RESET_PASSWORD_URL: 'reset-password-url',
            RESET_PASSWORD_CODE: 'reset-password-code',
        },
        VERIFY_ACCOUNT: {
            USER_FULLNAME: 'user-fullname',
            VERIFY_URL: 'verify-url',
        },
        CONFIRM_PASSWORD_CHANGED: {
            USER_FULLNAME: 'user-fullname',
        },
        // SEND_REPORT_EMAIL: {
        //     SENDER_NAME: 'sender-name',
        //     REPORT_NAME: 'report-name',
        //     ADDED_MESSAGE: 'added-message',
        // },
        // DELETE_ORGANIZATION_TO_MANAGER: {
        //     USER_FULLNAME: 'user-fullname',
        //     ORGANIZATION_NAME: 'organization-name',
        //     ORGANIZATION_SHORT_NAME: 'organization-short-name',
        // },
        // DELETE_ORGANIZATION_TO_MEMBER: {
        //     USER_FULLNAME: 'user-fullname',
        //     ORGANIZATION_NAME: 'organization-name',
        //     ORGANIZATION_SHORT_NAME: 'organization-short-name',
        // },
        // DELETE_PROJECT_TO_MANAGER: {
        //     USER_FULLNAME: 'user-fullname',
        //     PROJECT_NAME: 'project-name',
        // },
        // DELETE_PROJECT_TO_MEMBER: {
        //     USER_FULLNAME: 'user-fullname',
        //     PROJECT_NAME: 'project-name',
        // },
        // REMOVE_ORGANIZATION_MEMBER: {
        //     USER_FULLNAME: 'user-fullname',
        //     ORGANIZATION_NAME: 'organization-name',
        // },
        // REMOVE_PROJECT_MEMBER: {
        //     USER_FULLNAME: 'user-fullname',
        //     PROJECT_NAME: 'project-name',
        // },
    },

    // SUBJECT EMAIL
    SUBJECT: {
        INVITE_MEMBER: 'Invite member',
        FORGOT_PASSWORD: 'MTGSLabs account recovery instructions',
        VERIFY_ACCOUNT: 'Verify account',
        CONFIRM_PASSWORD_CHANGED: 'Your MTGSLabs account password has been changed',
        NOTIFICATION: 'Notification',
    },
    CODE: {
        VERIFY_ACCOUNT: 'verify_account',
        FORGOT_PASSWORD: 'forgot_password',
    },

    VERIFY_ACCOUNT_TOKEN: '1 day',
};
