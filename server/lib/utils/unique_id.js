function generateUniqueNumber() {
    // Generate a random number between 100000 and 999999
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return randomNumber;
}

module.exports = generateUniqueNumber