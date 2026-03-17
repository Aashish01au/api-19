class AccessDenied extends Error {
    constructor({data=null, message="Access Denied",code=403}){
        super()
        this.data = data
        this.message =  message
        this.code = code
    }
}

module.exports = AccessDenied