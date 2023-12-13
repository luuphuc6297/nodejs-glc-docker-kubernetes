exports.transformMongooseDocumentToObject = (doc) => {
    if (!doc) return doc;
    const { _id, __v, ...rest } = doc;
    return { id: _id, ...rest };
};

/**
 * Lookup collection
 * @param {*} from
 * @param {*} refFrom
 * @param {*} refTo
 * @param {*} select
 * @param {*} reName
 */
exports.$lookup = (from, refFrom, refTo, select, reName, condition) => ({
    $lookup: {
        from,
        let: {
            [refTo]: `$${refTo}`,
        },
        pipeline: [
            {
                $match: {
                    $expr: {
                        $eq: [`$${refFrom}`, `$$${refTo}`],
                    },
                    ...condition,
                },
            },
            {
                $project: {
                    _id: 0,
                    id: '$_id',
                    ...select.split(/[,\s]/).reduce((r, rs) => {
                        r[rs] = 1;
                        return r;
                    }, {}),
                },
            },
        ],
        as: reName,
    },
});

/**
 * Regrex search
 * @param {*} q
 * @param {*} fields
 */
exports.regrexSearch = (q, fields) =>
    q &&
    fields.split(/[,\s]/).reduce((r, rs) => {
        r[rs] = new RegExp(q, 'gi');
        return r;
    }, {});

/**
 * Pagination
 * @param {*} $match
 * @param {*} pipeline
 */
exports.pagination = ($match, pipeline, lookups, condition, more) => {
    // Convert _id to ObjectId
    Object.keys($match).map((key) => {
        $match[key] = /_id/.test(key) && !$match[key].$in ? mongoose.Types.ObjectId($match[key]) : $match[key];
    });

    let query = [
        {
            $match,
        },
    ];
    if (lookups) lookups.map((lookup) => query.push(lookup));
    if (condition) query.push(condition);
    if (more) query = query.concat(more);
    query.push({
        $facet: {
            total_count: [
                {
                    $count: 'total_count',
                },
            ],
            items: pipeline,
        },
    });
    query.push({ $project: { result: { $concatArrays: ['$total_count', '$items'] } } });
    query.push({ $unwind: '$result' });
    query.push({ $replaceRoot: { newRoot: '$result' } });
    return query;
};

/**
 * Default query
 * @param {*} $match
 * @param {*} pipeline
 */
exports.query = ($match, pipeline) => {
    // eslint-disable-next-line array-callback-return
    Object.keys($match).map((key) => {
        $match[key] =
            /_id/.test(key) && $match[key] && $match[key].length === 24
                ? mongoose.Types.ObjectId($match[key])
                : $match[key];
    });
    return [
        {
            $match,
        },
        ...pipeline,
    ];
};
