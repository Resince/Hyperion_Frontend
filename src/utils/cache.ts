export const setToken = (token: string): any => {
    localStorage.setItem("token", token);
};
export const getToken = (): any => {
    return localStorage.getItem("token");
};
export const removeToken = (): any => {
    localStorage.removeItem("token");
};
export const setCache = (key: string, value: any): any => {
    localStorage.setItem(key, JSON.stringify(value));
};
export const getCache = (key: string): any => {
    return JSON.parse(localStorage.getItem(key) as string);
};
export const removeCache = (key: string): any => {
    localStorage.removeItem(key);
};
export const clearCache = (): any => {
    localStorage.clear();
};
