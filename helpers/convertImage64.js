export default function convertImage(imageArrayFromDatabase) {
    if(!imageArrayFromDatabase) return
    const base64ImageFromDatabase = imageArrayFromDatabase.data.map(byte => String.fromCharCode(byte)).join("");
    return `${base64ImageFromDatabase}`
  }