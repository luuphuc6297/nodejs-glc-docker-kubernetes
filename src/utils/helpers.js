exports.transformMongooseDocumentToObject = (doc) => {
    if (!doc) return doc;
    const { _id, __v, ...rest } = doc;
    return { id: _id, ...rest };
};