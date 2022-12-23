import { IUserSequelize } from "../ts/interfaces/user_interface";

module.exports = (sequelize: IUserSequelize , Sequelize: { STRING: any; }) => {
    const User = sequelize.define("users", {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
    return User;
};