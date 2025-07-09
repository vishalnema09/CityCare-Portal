export function generateDepartmentID(departmentName) {
  const specialChars = ["@", "#", "$", "%", "&", "*"];

  const words = departmentName.split(/[\s\/&]+/);
  const abbreviation = words
    .filter((word) => word.length > 2) 
    .map((word) => word[0].toUpperCase())
    .join("")
    .substring(0, 3); // Limit to 3 characters

  const randomNum = Math.floor(10 + Math.random() * 90); 

  const specialChar =
    specialChars[Math.floor(Math.random() * specialChars.length)];

  return `DPT-${abbreviation}-${randomNum}${specialChar}`;
}

