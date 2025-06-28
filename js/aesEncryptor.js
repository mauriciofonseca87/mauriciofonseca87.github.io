// aesEncryptor.js

const AesEncryptor = (function () {
    // Verifica que CryptoJS esté disponible
    if (typeof CryptoJS === 'undefined') {
        throw new Error('CryptoJS no está cargado. Asegúrate de incluir CryptoJS antes de usar aesEncryptor.js');
    }

    function encryptAES(plainText, key, iv) {
        const encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(plainText),
            CryptoJS.enc.Utf8.parse(key),
            {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );
        return encrypted.toString(); // Base64
    }

    function decryptAES(cipherTextBase64, key, iv) {
        const decrypted = CryptoJS.AES.decrypt(
            cipherTextBase64,
            CryptoJS.enc.Utf8.parse(key),
            {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    return {
        encrypt: encryptAES,
        decrypt: decryptAES
    };
})();
