export type PaginatedResponse<T> = {
    count: number,
    page: number,
    final_page: boolean,
    page_count: number,
    results: T[]
};

export type ApiResponse<T> = T | ApiError;

export type ApiError = {
    error_msg: string
    user_msg: string
    status: number
}