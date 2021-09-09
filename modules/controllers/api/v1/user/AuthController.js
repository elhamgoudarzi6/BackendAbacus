const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');
const randomstring  = require('randomstring');
module.exports = new class AuthController extends Controller {
    singleUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findById(req.params.id, (err, User) => {
            if (User) {
                return res.json({
                    data: User,
                    success: true
                })
            }
            res.json({
                data: 'کاربر یافت نشد',
                success: false
            })
        })
    }

    ChangePassword(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        let hash = bcrypt.hashSync(req.body.password, 10);
        this.model.User.findByIdAndUpdate(req.params.id, {
            password: hash,
        }, (err, User) => {
            if (err) throw err;
            if (User) {
                this.sendsmsResetPass(req.body.password,User._doc.mobile);
                return res.json({
                    data: 'ارمز عبور با موفقیت تغییر یافت',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کاربری وجود ندارد',
                success: false
            });
        });
    }

    UpdateMobile(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findOne({mobile: req.body.mobile}, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'با این شماره قبلا ثبت نام شده است',
                    success: false
                });
            } else {
                this.model.User.findByIdAndUpdate(req.params.id, {
                    mobile: req.body.mobile,
                }, (err, User) => {
                    if (err) throw err;
                    if (User) {
                        // let num=req.body.mobile;
                        // let code=randomstring.generate({charset:'123456789',length:5});
                        // this.sendsmsupdatemobile(code,num);
                        return res.json({
                            data: 'شماره موبایل کاربر با موفقیت بروز رسانی شد',
                            success: true
                        });
                    }

                    res.status(404).json({
                        data: 'چنین کاربری وجود ندارد',
                        success: false
                    });

                });
            }
        });
    }

    UpdateUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
                this.model.User.findByIdAndUpdate(req.params.id, {
                    name: req.body.name,
                    city: req.body.city,
                    age: req.body.age,
                    major: req.body.major,
                    gender: req.body.gender,
                    image: req.body.image,
                }, (err, User) => {
                    if (err) throw err;
                    if (User) {
                        return res.json({
                            data: 'اطلاعات کاربر با موفقیت بروز رسانی شد',
                            success: true
                        });
                    }

                    res.status(404).json({
                        data: 'چنین کاربری وجود ندارد',
                        success: false
                    });

                });
    }

    FindMobile(req, res) {
       req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
       if (this.showValidationErrors(req, res))
           return;
       this.model.User.findOne({mobile: req.body.mobile}, (err, User) => {
           if (err) throw err;
           if (User) {
               return res.json({
                   data: 'با این شماره قبلا ثبت نام شده است',
                   success: true
               });
           } else {
               return res.json({
                   data: 'این شماره موجود نیست',
                   success: false
               });
           }
       });
   }

    register(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findOne({mobile: req.body.mobile}, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'با این شماره قبلا ثبت نام شده است',
                    success: false
                });
            } else {
                this.model.User({
                    mobile: req.body.mobile,
                    password: req.body.password,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'کاربر با موفقیت ثبت  شد',
                        success: true
                    });
                })
            }
        })
    }

    login(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findOne({mobile: req.body.mobile}, (err, User) => {
            if (err) throw err;
            if (User == null)
                return res.status(422).json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });
            bcrypt.compare(req.body.password, User.password, (err, status) => {
                if (!status)
                    return res.status(422).json({
                        success: false,
                        data: 'پسورد وارد شده صحیح نمی باشد'
                    })
                return res.json({
                    data: new UserTransform().transform(User,true),
                    success: true
                });
            })
        })
    }

    sendsms(req,res){
        let mobile=req.body.mobile;
        var qs = require("querystring");
        var http = require("http");
        var options = {
            "method": "POST",
            "hostname": "rest.payamak-panel.com",
            "port": null,
            "path": "/api/SendSMS/SendSMS",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "7ce78606-0d0b-107d-286c-bbd4b4142760",
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });
        let code=randomstring.generate({charset:'123456789',length:5});
        req.write(qs.stringify({
            username: '09211480573',
            password: 'cgbd4h',
            to: mobile,
            from: '5000400010602',
            text: ` کد تایید ثبت نام شما در اپلیکیشن چرتکه: ${code} می باشد `,
            isflash: 'false' }));
        req.end();
        return res.json({
            success: true,
            data: code
        })
    }

    ResetPassword(req, res) {
        let newpassword=randomstring.generate({charset:'123456789',length:8});
        let hash = bcrypt.hashSync(newpassword, 10);
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findOneAndUpdate({mobile: req.body.mobile},{password:hash}, (err, User) => {
            if (err) throw err;
            if (User) {
              this.sendsmsResetPass(newpassword,req.body.mobile);
                return res.json({
                    data: 'اطلاعات با موفقیت آپدیت شد',
                    newpass:newpassword,
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    sendsmsResetPass= (code,mobile,text)=>{
        var qs = require("querystring");
        var http = require("http");
        var options = {
            "method": "POST",
            "hostname": "rest.payamak-panel.com",
            "port": null,
            "path": "/api/SendSMS/SendSMS",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "7ce78606-0d0b-107d-286c-bbd4b4142760",
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });
        req.write(qs.stringify({
            username: '09211480573',
            password: 'cgbd4h',
            to: mobile,
            from: '5000400010602',
            text: ` رمز عبور جدید شما در اپلیکیشن چرتکه: ${code} می باشد `,
            isflash: 'false' }));
        req.end();
        return  code;
    }

    sendsmsupdatemobile= (code,mobile)=>{
        var qs = require("querystring");
        var http = require("http");
        var options = {
            "method": "POST",
            "hostname": "rest.payamak-panel.com",
            "port": null,
            "path": "/api/SendSMS/SendSMS",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "7ce78606-0d0b-107d-286c-bbd4b4142760",
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });
        req.write(qs.stringify({
            username: '09211480573',
            password: 'cgbd4h',
            to: mobile,
            from: '5000400010602',
            text: ` کد تایید تغییر شماره همراه شما در اپلیکیشن چرتکه: ${code} می باشد `,
            isflash: 'false' }));
        req.end();
        return  code;
    }

}
