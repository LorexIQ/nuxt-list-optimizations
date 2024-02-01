import plug, {type TableDataElement} from "~/server/data/plug";

export interface DataType<T> {
    count: number;
    start: number;
    end: number;
    limit: number;
    data: T[];
}

export default defineEventHandler(event => {
    const query = getQuery(event);

    let offset = +(query.offset ?? 0);
    let limit = +(query.limit ?? 0);

    const start = offset;
    const end = offset + (limit <= 0 ? plug.length : limit);

    return {
        count: plug.length,
        start,
        end,
        limit,
        data: plug.slice(start, end)
    } as DataType<TableDataElement>;
});
