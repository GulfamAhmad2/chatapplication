import sodium from 'libsodium-wrappers'

export const encryptMessage = async (message, senderPrivateKey, receiverPublicKey) => {
    await sodium.ready

    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES)
    const cipher = sodium.crypto_box_easy(
        sodium.from_string(message),
        nonce,
        sodium.from_base64(receiverPublicKey),
        sodium.from_base64(senderPrivateKey)
    )
    return {
        cipher: sodium.to_base64(cipher),
        nonce: sodium.to_base64(nonce)
    }
}


export const decryptMessage = async (cipher, nonce, senderPublicKey, receiverPrivateKey) => {
    await sodium.ready
    const plain = sodium.crypto_box_open_easy(
        sodium.from_base64(cipher),
        sodium.from_base64(nonce),
        sodium.from_base64(senderPublicKey),
        sodium.from_base64(receiverPrivateKey)
    )
    return sodium.to_string(plain)
}

