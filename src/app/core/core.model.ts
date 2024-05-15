export interface Response<T> {
    isError: boolean;
    message: string;
    result: T;
}