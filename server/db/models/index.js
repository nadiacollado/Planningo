const db = require("../db");
const User = require("./user");
const Task = require("./task");
const Group = require("./group");
const Shopping = require("./shopping");
const Category = require("./category");

const Sequelize = require("sequelize");

//ASSOCIATIONS
//**********USER AND GROUP --- USER_GROUP THROUGH TABLE ***********
const User_Group = db.define("User_Group", {
  role: {
    type: Sequelize.ENUM("admin", "member"),
    defaultValue: "member",
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});
User.belongsToMany(Group, { through: "User_Group" });
Group.belongsToMany(User, { through: "User_Group" });
//***************************************************************** */

//Task and Group --- one-to-many with through table

const Task_Group = db.define("Task_Group", {
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

Task.belongsToMany(Group, { through: "Task_Group" });
Group.belongsToMany(Task, { through: "Task_Group" });

const User_Task = db.define("User_Task", {});

User.belongsToMany(Task, { through: "User_Task" });
Task.belongsToMany(User, { through: "User_Task" });

//Categories
Category.hasMany(Task)
Task.belongsTo(Category)

//Shopping_Task through Table between Shopping and Task
const Shopping_Task = db.define("Shopping_Task", {});
Task.belongsToMany(Shopping, { through: "Shopping_Task" });
Shopping.belongsToMany(Task, { through: "Shopping_Task" });

//export modules
module.exports = {
  db,
  User,
  Task,
  Group,
  Shopping,
  User_Group,
  User_Task,
  Task_Group,
  Category,
  Shopping_Task
};
