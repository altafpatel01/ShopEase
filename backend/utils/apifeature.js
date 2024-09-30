class ApiFeature {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString; // Using a more descriptive variable name
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: new RegExp(this.queryString.keyword, 'i') // Using RegExp for more control
            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryStringCopy = { ...this.queryString };
        const deleteFields = ["keyword", "page", "limit"];
        deleteFields.forEach(key => delete queryStringCopy[key]);

        // Convert query string to JSON and modify for MongoDB queries
        let queryStr = JSON.stringify(queryStringCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (ch) => `$${ch}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = this.queryString.page||1; // Ensure currentPage is a number
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this; // Return the updated query handler instance
    }
}

module.exports = ApiFeature;
