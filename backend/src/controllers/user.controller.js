'use-strict';

const User = require('../models/user.model');

exports.create = function (req, res) {
    console.log("User:",req.body);
    const new_user = new User(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        User.create(new_user, function (err, user) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "User added successfully!",
                data: user
            });
        });
    }
};


exports.login = async (req,res) => {
    User.login(req,function(err,user){
        if(err){
            res.send(err)
        }else {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
              }
          
              const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
              );
          
              if (!passwordIsValid) {
                return res.status(401).send({
                  message: "Invalid Password!",
                });
              }
          
              const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
              });
          
            //   let authorities = [];
            //   const roles = await user.getRoles();
            //   for (let i = 0; i < roles.length; i++) {
            //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
            //   }
          
              req.session.token = token;
          
              return res.status(200).send({
                id: user.id,
                username: user.username,
                // email: user.email,
                // roles: authorities,
              });
        }
    });
}