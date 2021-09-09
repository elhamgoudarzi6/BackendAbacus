const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class AuthMaster extends Controller {

    login(req , res) {
        req.checkBody('username' , 'وارد کردن فیلد نام کاربری الزامیست').notEmpty();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if(this.showValidationErrors(req, res))
            return;
                if((req.body.username==='admin') & (req.body.password==='12345' )) {
                    return res.json({
                        success: true,
                        data: 'اطلاعات صحیح می باشد خوش آمدید'
                    })
                }
                return res.json({
                    data : 'اطلاعات صحیح نمی باشد',
                    success : false
                });
            }
}
