const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    fullname: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type: String, default: ''},
    gyms: [{
        gym: {type: mongoose.Schema.Types.ObjectId, ref: 'Gym'}
    }],
    imageId: {type: String, default: ''},
    imageVersion: {type: String, default: ''}
});

userSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.checkPassword = function(password){ //uporedjuje userov pass sa onim iz baze
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);