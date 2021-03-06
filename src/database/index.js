const Sequelize = require('sequelize');
const dbConfig = require('../configs/database');

const User = require('../models/User');
const Company = require('../models/Company');
const Bank = require('../models/Bank');
const BillType = require('../models/BillType');
const Bill = require('../models/Bill');
const Category = require('../models/Category');
const MovementType = require('../models/MovementType');
const Movement = require('../models/Movement');
const UploadOfx = require('../models/UploadOfx');
const RelationshipCompany = require('../models/RelationshipCompany');
const Message = require('../models/Message');

const connection = new Sequelize(dbConfig);

User.init(connection);
Company.init(connection);
Bank.init(connection);
BillType.init(connection);
Bill.init(connection);
Category.init(connection);
MovementType.init(connection);
Movement.init(connection);
UploadOfx.init(connection);
RelationshipCompany.init(connection);
Message.init(connection);

User.associate(connection.models);
Company.associate(connection.models);
Bank.associate(connection.models);
BillType.associate(connection.models);
Bill.associate(connection.models);
Category.associate(connection.models);
MovementType.associate(connection.models);
Movement.associate(connection.models);
UploadOfx.associate(connection.models);
RelationshipCompany.associate(connection.models);
Message.associate(connection.models);

module.exports = connection;