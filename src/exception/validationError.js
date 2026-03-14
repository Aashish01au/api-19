class ValidationError extends Error{
    constructor({data=null, message="Validaion Failure",code=400}){
        super()
        this.data = data
        this.message= message
        this.code=code
    }
}

module.exports = ValidationError