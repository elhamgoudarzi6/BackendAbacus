const Controller = require(`${config.path.controller}/Controller`);
const bcrypt = require('bcrypt');

module.exports = new class UserController extends Controller {
    login(req , res) {
        req.checkBody('username' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();

        if(this.showValidationErrors(req, res))
            return;

        this.model.AdminUser.findOne({ username : req.body.username } , (err , user) => {
            if(err) throw err;

            if(user == null)
                return res.status(422).json({
                    data : 'اطلاعات وارد شده صحیح نیست',
                    success : false
                });

            bcrypt.compare(req.body.password , user.password , (err , status) => {

                if(! status)
                    return res.status(422).json({
                        success : false,
                        data : 'پسورد وارد شده صحیح نمی باشد'
                    })


                return res.json({
                    data :user,
                    success : true
                });
            })
        })

    }
}
