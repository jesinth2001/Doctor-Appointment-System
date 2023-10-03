const mangoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSChema=new mangoose.Schema({

    firstname: 
    {
     type:'string',
     required:[true,"firstname is required"]
    },
    lastname:
    {
        type:'string',
        required:[true,"lastname is required"]
    },
    phonenumber:
    {
        type: 'string',
        required:[true,"Phone Number is required"]
    },
    email:
    {
        type: 'string',
        required:[true,"email is required"],
        unique:true
    },
    password:
    {
        type:'string',
        required:[true,"password is required"],
    }
})
userSChema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSChema.statics.login=async function(email, password) {
    const user = await this.findOne({ email })
    
    if(user)
    { 
        const auth =await  bcrypt.compare(password,user.password)
        if(auth)
        {
            return user;
        }
        throw Error("Incorrect Password")
    }
    throw Error("Incorrect Email")

}


module.exports=mangoose.model("Users",userSChema); 