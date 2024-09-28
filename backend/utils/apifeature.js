class ApiFeature{
    constructor(qurey , qureystr){
        this.query=qurey
        this.qureystr= qureystr
    }
    search() {
        const keyword = this.qureystr.keyword ? {
            name: {
                $regex: new RegExp(this.qureystr.keyword, 'i')  // Using RegExp for more control
            }
        } : {};
    
        this.query = this.query.find({ ...keyword });
        return this;
    }
    
    filter(){
        const qureystrCopy = {...this.qureystr}
        
        const deleteField = ["keyword","page","limit"]
        deleteField.forEach(key=> delete qureystrCopy[key])
        // console.log(qureystrCopy) =>{ price: { gte: '1000', lte: '2000' } }
        let qureystr = JSON.stringify(qureystrCopy)
        qureystr = qureystr.replace(/\b(gt|gte|lt|lte)\b/g,ch =>`$${ch}`)

        this.query=this.query.find(JSON.parse(qureystr))
        return this
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.qureystr.page) || 1; // Ensure currentPage is a number
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this; // Return the updated query handler instance
    }
    
}
module.exports =ApiFeature