export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    emailAndPassword: {
        enabled: true;
    };
    session: {
        expiresIn: number;
        updateAge: number;
    };
    trustedOrigins: string[];
    advanced: {
        cookiePrefix: string;
        useSecureCookies: true;
        cookies: {
            sessionToken: {
                name: string;
                options: {
                    httpOnly: boolean;
                    sameSite: string;
                    secure: boolean;
                    path: string;
                };
            };
        };
    };
}>;
