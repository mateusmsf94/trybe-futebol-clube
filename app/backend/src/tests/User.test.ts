import { expect } from 'chai';
import * as sinon from 'sinon';
import { Sequelize, INTEGER, STRING } from 'sequelize';
import User from '../database/models/UsersModels';
import * as config from '../database/config/database';


describe('User Model', () => {
  let sequelizeInstance: Sequelize;
  let userCreateStub: sinon.SinonStub;
  
  beforeEach(() => {
    sequelizeInstance = new Sequelize(config);
    userCreateStub = sinon.stub(User, 'init');
  });

  afterEach(() => {
    userCreateStub.restore();
  });

  it('should have the correct properties', () => {
    User.init(
      {
        id: {
          type: INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: STRING,
          allowNull: false,
          unique: true,
        },
        role: {
          type: STRING,
          allowNull: false,
        },
        email: {
          type: STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: STRING,
          allowNull: false,
        },
      }, { sequelize: sequelizeInstance },
    );
    
  
    //check user properties
    expect(userCreateStub.calledOnce).to.be.true;
    // check model properties
    const args = userCreateStub.firstCall.args;
    expect(args[0]).to.deep.equal({
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
    });
  

});

});