
const userService = require('../services/user');
const User = require('../models/user')

/* 
 * Get all users
*/

const getAllUsers = async(req, res, next) => {
  try {
    
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error)
  }
};


/**
 * Post new user
 */

const postUser = async(req, res, next) => {
  const { name, sector, checkbox } = req.body;

  try {
    const user = await userService.createNewUser({ name, sector, checkbox });

    return res.status(201).json(user)
  } catch (error) {
    next(error)
  }
};


const patchUserById = async(req, res, next) => {
  const id = req.params.id;
  const { name, sector, checkbox } = req.body;

  try{
    const user = await userService.findUserByProperty('_id', id);


    if(!user){
      throw error('User not found', 404);
    }

    user.name = name ?? user.name;
    user.sector = sector ?? user.sector;
    user.checkbox = checkbox ?? user.checkbox;
    
    await user.save();

    return res.status(200).json(user);
  }
  catch(e){
    next(e)
  }

};

const deleteUserById = async(req, res, next) => {
  const id = req.params.id;
  try {
    const product = await User.findByIdAndDelete(id)

    if(!product) {
      throw error('User not found', 404);
    }


    return res.status(203).json({message: 'User deleted successfully', product}).send()
  } catch (error) {
    next(error)
  }
};


module.exports = {getAllUsers, postUser, patchUserById, deleteUserById}