class Crypto {
    getRandomPassword () {
        const randomNumber = Math.floor(Math.random() * 10000) + 1000
        const pass = "newPass" + randomNumber.toString()
        return pass
    }
}
module.exports = new Crypto()