const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryIncomeController extends Controller {
    LenderOneUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Lender.find({user_id:req.params.id}).sort({lender_name: -1 }).exec((err, Lender) => {
            if (err) throw err;
            if (Lender) {
                return res.json({
                    data: Lender,
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
        req.checkBody('lender_name', ' نام طرف حساب نمیتواند خالی بماند').notEmpty();
        req.checkBody('user_id', ' ایدی کاربر نمیتواند خالی بماند').notEmpty();
        req.checkBody('acount_num', ' شماره حساب نمیتواند خالی بماند').notEmpty();
        req.checkBody('card_num', ' شماره کارت نمیتواند خالی بماند').notEmpty();

        this.escapeAndTrim(req, 'lender_name user_id acount_num card_num');
        if (this.showValidationErrors(req, res))
            return;
        this.model.Lender.findOne({
            lender_name: req.body.lender_name,
            user_id: req.body.user_id,
            acount_num: req.body.acount_num,
            card_num: req.body.card_num,
        }, (err, Lender) => {
            if (err) throw err;
            if (Lender) {
                return res.json({
                    data: 'طرف حساب نمی تواند تکراری باشد این نوع قبلا ثبت شده است',
                    success: false
                });
            } else {
        let newLender = new this.model.Lender({
            lender_name: req.body.lender_name,
            user_id: req.body.user_id,
            acount_num: req.body.acount_num,
            card_num: req.body.card_num,
        })
        newLender.save(err => {
            if (err) throw err;
            return res.json({
                data: 'طرف حساب جدید با موفقیت ثبت شد',
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
        this.model.Lender.findByIdAndUpdate(req.params.id, {
            lender_name: req.body.lender_name,
            user_id: req.body.user_id,
            acount_num: req.body.acount_num,
            card_num: req.body.card_num,
        }, (err, Lender) => {
            if (err) throw err;
            if (Lender) {
                return res.json({
                    data: ' طرف حساب با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین طرف حسابی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Lender.findByIdAndRemove(req.params.id, (err, Lender) => {
            if (err) throw err;
            if (Lender) {
                return res.json({
                    data: 'طرف حساب با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین طرف حسابی وجود ندارد',
                success: false
            });
        });
    }

}
