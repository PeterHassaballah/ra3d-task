import User from '../models/user';
export const validateJSON = (jsonArray: any[]): boolean => {
  try {
    for (const json of jsonArray) {
      // Try to create a Mongoose document from each JSON object
      console.log("the json item",json);
      json.lastLogin = json.last_login;
      delete json.last_login;
      const user = new User(json);
      // Check if the document is valid
      user.validateSync();
    }
    return true; // All JSON objects match schema
  } catch (error) {
    console.error('Validation error:', error);
    return false; // At least one JSON object doesn't match schema
  }
};