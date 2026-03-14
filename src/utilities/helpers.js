const randomString = (len = 100)=>{
    const chars = "abcdefghijklmnnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const length = chars.length
    let random = ""

    for(let i =1;i<=len;i++){
        const position = Math.round(Math.random()*(length-1))
        random+=chars[position]
    }
    return random
}

module.exports= {
    randomString
}