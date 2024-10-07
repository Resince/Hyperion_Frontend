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
    password: string;
    role: string;
}

/**
 * Login response interface
 * @interface ILoginRes
 * @param {number} id - id of the user
 * @param {string} tel - telephone of the user
 * @param {string} token - token of the user
 */
export interface ILoginRes {
    id: number;
    tel: string;
    token: string;
}
