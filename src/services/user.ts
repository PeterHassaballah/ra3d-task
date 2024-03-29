import User from "../models/user";
import { FilterQuery } from "mongoose";
import { IUser } from "../types/user.interface";
import ApiError from "../utils/ApiError";
import QueryOptions from "../types/query";
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
export const createUser = async (userBody:IUser) => {
  const id=Math.floor((Math.random() * 1000) + 1);
  return User.create({...userBody,id});
};
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 export const queryUsers = async (
    filter: FilterQuery<IUser>,
    options: QueryOptions
  ) => {
    const { sortBy, sortOrder, skip, limit } = options;
    
    let query = User.find(filter);
  
    if (sortBy && sortOrder) {
      const sortCriteria: any = {};
      sortCriteria[sortBy] = (sortOrder === 'asc'||1) ? 1 : -1;
      query = query.sort(sortCriteria);
    }
  
    if (skip) {
      query = query.skip(skip);
    }
  
    if (limit) {
      query = query.limit(limit);
    }
  
    return query.exec();
  };
  
  
  /**
   * Get user by id
   * @param {ObjectId} id
   * @returns {Promise<User>}
   */
  export const getUserById = async (id: string) => {
    return User.findById(id);
  };
  export const updateUserById = async (userId:string, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
      return new Promise(function (resolve, reject) {
        reject(new ApiError(404, "User not found", false));
      });
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  };
  
export const createMany = async(payload:any[]):Promise<IUser[]>=>{
  const newUsers = payload.map(json => new User(json));
    const savedUsers = await User.insertMany(newUsers);
    console.log('Users saved:', savedUsers);
    return savedUsers;

}
export const getUserByEmail = async (email) => {
  return User.findOne({ email });
};