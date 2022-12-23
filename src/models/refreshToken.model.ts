const config = require("../config/auth.config");
import { DataType} from 'sequelize'
const { v4: uuidv4 } = require("uuid");

interface ISequelize { 
  define: (arg0: string, 
    arg1: { 
      token: { 
        type: DataType, 
        }, 
        userId: { 
          type: DataType, 
        }, 
        expiryDate: { 
          type: DataType, 
        }, 
  }) => any; 
}

module.exports = (sequelize: ISequelize, Sequelize: { STRING: any, BIGINT: any, DATE: any }) => {
  const RefreshToken = sequelize.define("refreshToken", {
    token: {
      type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.BIGINT,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  });

  RefreshToken.createToken = async function (user: { id: any; }) {
    const expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    const _token = uuidv4();
    const refreshToken = await this.sync({force: true}).then(() => {
            return this.create({
            token: _token,
            userId: user.id,
            expiryDate: expiredAt.getTime(),
        });
    });
    
    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = (token: { expiryDate: { getTime: () => number; }; }) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  return RefreshToken;
};
