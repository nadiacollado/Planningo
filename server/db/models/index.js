const db = require("../db");
const User = require("./user");
const Task = require("./task");
const User_Task = require("./task");
const Group = require("./group");
const Grocery = require("./grocery");
//ASSOCIATIONS

//User and Group --- many-to-many association w/ through table
const User_Group = db.define("User_Group", {})
User.belongsToMany(Group, { through: "User_Group" });
Group.belongsToMany(User, { through: "User_Group" });
//Task and Group --- one-to-many with through table

const Task_Group = db.define("Task_Group", {})
Task.belongsToMany(Group, {through: "Task_Group"});
Group.belongsToMany(Task, {through: "Task_Group"})

//user and task. We might need through table once we put groups in? not sure
User.belongsToMany(Task, {through: "User_Task"});
Task.belongsToMany(User, {through: "User_Task"});

//Single user's grocery list
User.hasMany(Grocery);
Grocery.belongsTo(User);

//export modules
module.exports = {
  db,
  User,
  Task,
  Group,
  Grocery,
  User_Group,
  User_Task,
  Task_Group
};
