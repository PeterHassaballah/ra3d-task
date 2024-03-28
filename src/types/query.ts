
type SortOrder = 'asc' | 'desc' | 1 | -1;

interface QueryOptions {
    sortBy?: string; // Field to sort by
    sortOrder?: SortOrder;
    skip?: number; // Number of documents to skip for pagination
    limit?: number; // Maximum number of documents to return
}
export default QueryOptions;