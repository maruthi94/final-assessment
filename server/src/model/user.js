const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName:String,
    lastName: String,
    email: String,
    password: String
})

UserSchema.index({email:1},{unique:true});

UserSchema.pre('save',async function(next) {
    try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;

    } catch (error) {
        throw new Error("Unable to hash the password",{cause:error});
    }
    next();
   
})

const model = mongoose.model('User',UserSchema);
module.exports = model; 