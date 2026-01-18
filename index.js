const express = require('express');
const app = express();

const sequelize = require('./config/database');
const User = require('./models/User');
const { Op } = require('sequelize');


(async () => {
  try {
await sequelize.sync({ force: true });
    console.log('Tables already recreated');

//1. insert tabel or model which i create a model in models/user.js

      await User.create({
      name: 'Vivek k',
      email: 'v@gmail.com',
      email2: 'v1@gmail.com',
      password: '1232'
    });
      if(User.create)
      {
        console.log("Second inserted ");
      }
      else
      {
        console.log("false");
      }

//  //3 now i make a small mistak in name and i want to update name at that time write below code 
// //  await User.update(
// //     { name: 'Updated Name' },
// //     { where: { id: 1 } }
// //   );



// //4 now i want to delete data from model that time i used destroy using specfic id or any condition

// // await User.destroy({
// //   where: { id: 2 }
// // });

// console.log('User deleted successfully');


// //2. inserted data i want to see that time we used below code i write.

//     const users = await User.findAll();
//     console.log('All users:');
//     users.forEach(user => {
//       console.log(user.id, user.name, user.email, user.email2);
//     });
   
// //2.1. if you want to see a specfic data at that time we used findOne()     

// const user = await User.findOne();

// if (user) {
//   console.log('User found:');
//   console.log(user.id, user.name);
// } else {
//   console.log('No user found');
// }

// //2.3 when you find data using primary key at that time you need a findbypk
// const user1 = await User.findByPk(2);

// if (user1) {
//   console.log('User found:');
//   console.log(user.id, user.name, user.email, user.email2);
// } else {
//   console.log('User not found');
// }

//A. where-> fileter datat
const usersByEmail = await User.findAll({
  where: { email: 'K@gmail.com' }
});

console.log('Filtered:', usersByEmail.map(u => u.name));

//B attribute
const usersWithLimitedFields = await User.findAll({
  attributes: ['name', 'email']
});

console.log(usersWithLimitedFields.map(u => u.toJSON()));

//C order
const sortedUsers = await User.findAll({
  order: [['id', 'DESC']]
});

console.log('order:'+sortedUsers.map(u => u.id));
//D. limit & offset
const paginatedUsers = await User.findAll({
  limit: 2,
  offset: 0
});

console.log(paginatedUsers.map(u => u.id));

//E Op
const usersLike = await User.findAll({
  where: {
    name: { [Op.like]: '%Kevin%' }
  }
});

console.log(usersLike.map(u => u.name));
//F OP LIKE
const usersLike1 = await User.findAll({
  where: {
    name: { [Op.like]: '%Vivek%' }
  }
});

console.log(usersLike1.map(u => u.name));

// G Op.iLike
const usersInsensitive = await User.findAll({
  where: {
    email: { [Op.iLike]: '%vivek1@gmail.com%' }
  }
});

console.log(usersInsensitive.map(u => u.email));
//H Op.or

const usersOr = await User.findAll({
  where: {
    [Op.or]: [
      { name: 'Vivek Ghori' },
      { id: 1 }
    ]
  }
});

console.log(usersOr.map(u => u.name));


  }

   catch (error) {
    console.error(error);
  }
  // finally{
  //   console.log("i simple check try or catch run so finally also run finally and run it ");
  // }
})();

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
