const Sequelize = require('sequelize');
const dbConfig = require('../configs/database');

const User = require('../models/User');
const Company = require('../models/Company');
const Bank = require('../models/Bank');
const BillType = require('../models/BillType');
const Bill = require('../models/Bill');
const CreditCard = require('../models/CreditCard');
const Category = require('../models/Category');
const AccountType = require('../models/AccountType');
const Account = require('../models/Account');
const UploadOfx = require('../models/UploadOfx');

const connection = new Sequelize(dbConfig);

User.init(connection);
Company.init(connection);
Bank.init(connection);
BillType.init(connection);
Bill.init(connection);
CreditCard.init(connection);
Category.init(connection);
AccountType.init(connection);
Account.init(connection);
UploadOfx.init(connection);

User.associate(connection.models);
Company.associate(connection.models);
Bank.associate(connection.models);
BillType.associate(connection.models);
Bill.associate(connection.models);
CreditCard.associate(connection.models);
Category.associate(connection.models);
AccountType.associate(connection.models);
Account.associate(connection.models);
UploadOfx.associate(connection.models);

module.exports = connection;