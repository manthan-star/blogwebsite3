export function pagenation(searchParams: URLSearchParams) {
    const page = parseInt(searchParams.get("page") || "1") || 1;
    const limit = parseInt(searchParams.get("limit") || "10") || 10;
    const sortField = searchParams.get("sort") || "craetedAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    return { page, skip: (page - 1) * limit, limit, sort: { [sortField]: (sortOrder === "desc" ? -1 : 1) as 1 | -1, }, }
}