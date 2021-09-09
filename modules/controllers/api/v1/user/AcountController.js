const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryIncomeController extends Controller {
    AcountOneUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Acount.find({user_id:req.params.id}).sort({acount_name: -1 }).exec((err, Acount) => {
            if (err) throw err;
            if (Acount) {
                return res.json({
                    data: Acount,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    store(req, res) {
        req.checkBody('acount_name', ' نام حساب نمیتواند خالی بماند').notEmpty();
        req.checkBody('user_id', ' ایدی کاربر نمیتواند خالی بماند').notEmpty();
        req.checkBody('acount_num', ' شماره حساب نمیتواند خالی بماند').notEmpty();
        req.checkBody('card_num', ' شماره کارت نمیتواند خالی بماند').notEmpty();

        this.escapeAndTrim(req, 'acount_name user_id acount_num card_num');
        if (this.showValidationErrors(req, res))
            return;
        this.model.Acount.findOne({
            acount_name: req.body.acount_name,
            user_id: req.body.user_id,
            acount_num: req.body.acount_num,
            card_num: req.body.card_num,
        }, (err, Acount) => {
            if (err) throw err;
            if (Acount) {
                return res.json({
                    data: 'حساب نمی تواند تکراری باشد این حساب قبلا ثبت شده است',
                    success: false
                });
            } else {
                let newAcount = new this.model.Acount({
                    acount_name: req.body.acount_name,
                    user_id: req.body.user_id,
                    acount_num: req.body.acount_num,
                    card_num: req.body.card_num,
                })
                newAcount.save(err => {
                    if (err) throw err;
                    return res.json({
                        data: 'حساب جدید با موفقیت ثبت شد',
                        success: true
                    });
                })
            }
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Acount.findByIdAndUpdate(req.params.id, {
            acount_name: req.body.acount_name,
            user_id: req.body.user_id,
            acount_num: req.body.acount_num,
            card_num: req.body.card_num,
        }, (err, Acount) => {
            if (err) throw err;
            if (Acount) {
                return res.json({
                    data: ' حساب با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین حسابی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Acount.findByIdAndRemove(req.params.id, (err, Acount) => {
            if (err) throw err;
            if (Acount) {
                return res.json({
                    data: 'حساب با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین حسابی وجود ندارد',
                success: false
            });
        });
    }

}
