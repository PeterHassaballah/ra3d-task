const allRoles = {
  owner: ["getTask", "assignTask","deleteTasks"],
  user:["createTask","viewTasks"]
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));

// export default {
//   roles,
//   roleRights,
// };
