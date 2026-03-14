class UnAuthorization extends Error{
    constructor({data=null, message="UnAuthorization Error",code=401}){
        super()
        this.data = data
        this.message= message
        this.code=code
    }
}

module.exports = UnAuthorization