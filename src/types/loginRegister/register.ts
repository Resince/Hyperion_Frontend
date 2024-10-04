/**
 * Register interface
 * @interface IRegister
 * @param {string} telephone - telephone of the user
 * @param {string} name - name of the user
 * @param {string} password - password of the user
 * @param {string} email - email of the user
 * @param {string} role - role of the user
 */
export interface IRegister {
    telephone: string;
    name: string;
    password: string;
    email: string;
    role: string;
}

/**
 * Register response interface
 * @interface IRegisterRes
 * @param {number} id - id of the user
 * @param {string} tel - telephone of the user
 * @param {string} name - name of the user
 * @param {string} email - email of the user
 * @param {string} state - state of the user
 * @param {string} last_login - last login time of the user
 */
export interface IRegisterRes {
    id: number;
    tel: string;
    name: string;
    email: string;
    states: string;
    last_login: string;
}
