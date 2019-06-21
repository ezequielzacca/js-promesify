
export function Promisefy<T>(f: Function, ...params: Array<any>): Promise<T>;
export function Promisefy<T, P1, P2>(f: Function, param1: P1, param2: P2): Promise<T>;
export function Promisefy<T, P1, P2, P3>(f: Function, param1: P1, param2: P2, param3: P3): Promise<T>;
export function Promisefy<T>(f: Function, ...params: Array<any>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        f(...params, (err: any, res: any) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        })
    })
}


