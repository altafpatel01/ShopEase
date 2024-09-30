class ApiFeature {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString; // Using a more descriptive variable name
    }

    search() {
        const keyword = this.queryString.keyword
          ? {
              name: {
                $regex: this.queryString.keyword,
                $options: "i", // case-insensitive
              },
            }
          : {};
    
        this.query = this.query.find({ ...keyword });
        return this;
      }
    

    // filter() {
    //     const queryStringCopy = { ...this.queryString };
    //     const deleteFields = ["keyword", "page", "limit"];
    //     deleteFields.forEach(key => delete queryStringCopy[key]);

    //     // Convert query string to JSON and modify for MongoDB queries
    //     let queryStr = JSON.stringify(queryStringCopy);
    //     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (ch) => `$${ch}`);

    //     this.query = this.query.find(JSON.parse(queryStr));
    //     return this;
    // }

    // filter() {
    //     const queryStringCopy = { ...this.queryString };
    //     const deleteFields = ["keyword", "page", "limit"];
    //     deleteFields.forEach(key => delete queryStringCopy[key]);
      
    //     if (this.queryString.categories) {
    //       queryStringCopy.category = {
    //         $in: this.queryString.categories.split(",")
    //       };
    //     }
      
    //     let queryStr = JSON.stringify(queryStringCopy);
    //     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (ch) => `$${ch}`);
      
    //     this.query = this.query.find(JSON.parse(queryStr));
    //     return this;
    //   }
      
    filter() {
        const queryStringCopy = { ...this.queryString };
      
        // Remove fields that aren't part of filtering
        const deleteFields = ["keyword", "page", "limit"];
        deleteFields.forEach((key) => delete queryStringCopy[key]);
      
        // Handle category filter
        if (this.queryString.categories) {
          
          // Create category filter and store it separately
          const categoriesArray = this.queryString.categories.split(",").map(cat => cat.trim());
          queryStringCopy.category = {
            $in: categoriesArray,
          };
          // Optionally, delete categories from queryStringCopy
          delete queryStringCopy.categories;
        }
      
        // Convert range filters like price
        let queryStr = JSON.stringify(queryStringCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
      
        
      
        // Apply the filters
        const newquery = JSON.parse(queryStr);
       
      
        // Use the final query for MongoDB
        this.query = this.query.find(newquery); // Pass newquery directly without wrapping in an object
      
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
