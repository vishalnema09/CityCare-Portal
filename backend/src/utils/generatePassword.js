export function generatePassword() {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialChars = ["@", "#", "$", "%", "&", "*"];

  // Pick 3 random letters
  let letterPart = "";
  for (let i = 0; i < 3; i++) {
    letterPart += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Pick 2 random digits
  let digitPart = "";
  for (let i = 0; i < 2; i++) {
    digitPart += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  // Pick 1 special character
  const specialChar =
    specialChars[Math.floor(Math.random() * specialChars.length)];

  // Combine all parts together
  const password = letterPart + digitPart + specialChar;

  return password;
}

console.log(generatePassword()); // Example output: "aB3$"