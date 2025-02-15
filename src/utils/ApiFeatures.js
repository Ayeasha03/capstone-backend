class ApiFeatures {
    constructor(mongooseQuery, queryString) {
      this.mongooseQuery = mongooseQuery;
      this.queryString = queryString;
    }
  
    // Pagination features
    pagination() {
      const PAGE_LIMIT = 3;
      let PAGE_NUMBER = this.queryString.page * 1 || 1;
      if (PAGE_NUMBER <= 0) PAGE_NUMBER = 1;
      const PAGE_SKIP = (PAGE_NUMBER - 1) * PAGE_LIMIT;
  
      this.mongooseQuery.skip(PAGE_SKIP).limit(PAGE_LIMIT);
  
      return this;
    }
  
    // Filtering by query parameters
    filteration() {
      let filterObj = { ...this.queryString };
  
      let excludedQuery = ["page", "sort", "fields", "keyword"];
      excludedQuery.forEach(ele => delete filterObj[ele]);
  
      filterObj = JSON.stringify(filterObj);
      filterObj = filterObj.replace(/\b(gt|gte|lt|lte)\b/g, match => `${match}`);
      filterObj = JSON.parse(filterObj);
  
      this.mongooseQuery.find(filterObj);
      return this;
    }
  
    // Method for sorting
    sort() {
      if (this.queryString.sort) {
        let sortedBy = this.queryString.sort.split(',').join(',');
        this.mongooseQuery.sort(sortedBy);
      }
      return this;
    }
  
    // Method to search by human query words
    search() {
      if (this.queryString.keyword) {
        this.mongooseQuery.find({
          $or: [
            { title: { $regex: this.queryString.keyword, $options: "i" } },
            { description: { $regex: this.queryString.keyword, $options: "i" } },
          ],
        });
      }
      return this;
    }
  
    // For query string containing fields
    fields() {
      if (this.queryString.fields) {
        let fields = this.queryString.fields.split(',').join(',');
        this.mongooseQuery.select(fields);
      }
      return this;
    }
  }
  
  module.exports = ApiFeatures;
  