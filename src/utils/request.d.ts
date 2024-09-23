// request.d.ts
declare module '@/utils/request' {
    interface Request {
        get(url: string, config?: any): Promise<any>;
        post(url: string, data?: any, config?: any): Promise<any>;
        // ... 其他方法的类型声明
    }

    const request: Request;
    export default request;
}