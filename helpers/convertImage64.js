export default function convertImage(imageArrayFromDatabase) {
    const base64ImageFromDatabase = imageArrayFromDatabase.data.map(byte => String.fromCharCode(byte)).join("");
    return `${base64ImageFromDatabase}`
  }