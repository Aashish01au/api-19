class AppError extends Error{
    constructor({data=null, message=null,code=null}){
        super()
        this.data = data
        this.message= message
        this.code=code
    }
}

module.exports = AppError