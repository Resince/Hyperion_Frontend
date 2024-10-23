// login ts type
/**
 * Login interface
 * @interface Login
 * @param {string} tel - telephone of the user
 * @param {string} password - password of the user
 * @param {string} role - role of the user
 */
export interface ILogin {
    tel: string;
    pass: string;
    role: string;
}

/**
 * Login response interface
 * @interface ILoginRes
 * @param {string} token - token of the user
 */
export interface ILoginRes {
    token: string;
    role: string;
}
