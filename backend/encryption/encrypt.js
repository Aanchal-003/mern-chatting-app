const crypto = require("crypto");

const algo = "aes-256-ctr";
// const key = crypto.randomBytes(32);
const key = "r54rh7g7edd6hhjswhlekfkhj8rw5o2a";
const iv = "dj3guiie54bslopw";

function encrypt(message) {
  var cipher = crypto.createCipheriv(algo, key, iv);
  var crypted = cipher.update(message, "utf-8", "hex");
  crypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encrypted: crypted.toString("hex"),
  };

  // let cipher = crypto.createCipheriv(algo, Buffer.from(key), iv);
  // let encrypted = cipher.update(message);
  // encrypted = Buffer.concat([encrypted, cipher.final("hex")]);
  // // return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
  // return encrypted.toString();
}

function decrypt(encryption) {
  var decipher = crypto.createDecipheriv(algo, key, iv);
  var decrypted = decipher.update(encryption, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted.toString();

  // let iv = Buffer.from(message.iv, "hex");
  // let encryptedText = Buffer.from(message.encryptedData, "hex");
  // let decipher = crypto.createDecipheriv(algo, Buffer.from(key), iv);
  // let decrypted = decipher.update(encryptedText);
  // decrypted = Buffer.concat([decrypted, decipher.final()]);
  // return decrypted.toString();
}

// var x = encrypt("hello");
// console.log(typeof x);
// console.log(typeof decrypt(x));

module.exports = { encrypt, decrypt };
