import bcrypt from "bcrypt"

function atbash(word) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const reversed = "zyxwvutsrqponmlkjihgfedcba"
    return word
        .toLowerCase()
        .split("")
        .map(char => {
            const index = alphabet.indexOf(char)
            return index === -1 ? char : reversed[index]
        })
        .join("")
}

export async function atbashHash(word) {
    const atbashWord = atbash(word)
    const hash = await bcrypt.hash(atbashWord, 10)
    return hash
}