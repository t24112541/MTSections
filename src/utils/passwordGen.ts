export const genPassword = (length:number) => {
    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const number = "0123456789"
    const spacialChar = "!@#$%^&*_-=+"

    let strPass = alpha + number + spacialChar
    let password =  ""

    for(let i = 0; i < length; i++){
        password += strPass.charAt(Math.floor(Math.random() * strPass.length))
    }

    return password
}
