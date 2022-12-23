import { DataType } from "sequelize";

export interface IUser {
    id: number, 
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    createdAt: string,
    updatedAt: string
}

export interface IUserSequelize { 
    define: (arg0: string, 
      arg1: { 
          firstName: { 
            type: DataType, 
          }, 
          lastName: { 
            type: DataType, 
          }, 
          email: { 
            type: DataType, 
          }, 
          password: { 
            type: DataType, 
          }, 
    }) => any; 
  }