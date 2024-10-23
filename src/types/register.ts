/**
 * Register interface
 * @interface IRegister
 * @param {string} tel - telephone of the user
 * @param {string} name - name of the user
 * @param {string} pass - password of the user
 * @param {string} email - email of the user
 * @param {string} role - role of the user
 */
export interface IRegister {
    tel: string;
    name: string;
    pass: string;
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
 * @param {string} lastLogin - last login time of the user
 */
export interface IRegisterRes {
    id: number;
    tel: string;
    name: string;
    email: string;
    states: string;
    lastLogin: string;
}
