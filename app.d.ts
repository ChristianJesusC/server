declare namespace HTTP {
    type ExpressRequest = import('express').Request;
    interface MetaRequest<T extends Object = any> extends ExpressRequest {
        meta: {
            user: {
                id?: number;
                email?: string;
            }
        } & Record<string, T>;
    }

    interface HTTPController<Req extends ExpressRequest = ExpressRequest> {
        run(req: Req, res: import('express').Response): Promise<void>;
    }

    interface HTTPMiddleware<Req extends ExpressRequest = ExpressRequest> {
        run(req: Req, res: import('express').Response, next: import('express').NextFunction): Promise<void>;
    }
}

declare namespace Services {
    namespace Token {
        type UserInfo = { id: number, email: string };
        interface TokenService<T extends UserInfo = UserInfo> {
            generateToken(payload: T): Promise<string>;
            verifyToken(token: string): Promise<{ valid: boolean, payload: UserInfo | null }>;
        }
    }
}