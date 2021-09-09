const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryCostController extends Controller {
    DebtOneUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Debt.find({user_id:req.params.id}).sort({lender: -1 }).exec((err, Debt) => {
            if (err) throw err;
            if (Debt) {
                return res.json({
                    data: Debt,
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
        req.checkBody('user_id', ' آیدی کاربر نمیتواند خالی بماند').notEmpty();
        req.checkBody('date_debt', ' تاریخ قرض گرفتن نمیتواند خالی بماند').notEmpty();
        req.checkBody('date_giveback', ' تاریخ پس دادن نمیتواند خالی بماند').notEmpty();
        req.checkBody('amount', ' مبلغ بدهی نمیتواند خالی بماند').notEmpty();
        req.checkBody('lender', ' طرف حساب (نام قرض دهنده) نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'category date_debt lender amount user_id date_giveback');
        if (this.showValidationErrors(req, res))
            return;
        let newDebt = new this.model.Debt({
            user_id: req.body.user_id,
            date_debt:req.body.date_debt,
            date_giveback:req.body.date_giveback,
            amount:req.body.amount,
            acount:req.body.acount,
            image: req.body.image,
            detail:req.body.detail,
            lender:req.body.lender
        })
        newDebt.save(err => {
            if (err) throw err;
            return res.json({
                data: 'بدهی جدید با موفقیت ثبت شد',
                success: true
            });
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Debt.findByIdAndUpdate(req.params.id, {
            user_id: req.body.user_id,
            date_debt:req.body.date_debt,
            date_giveback:req.body.date_giveback,
            amount:req.body.amount,
            acount:req.body.acount,
            image: req.body.image,
            detail:req.body.detail,
            lender:req.body.lender
        }, (err, Debt) => {
            if (err) throw err;
            if (Debt) {
                return res.json({
                    data: ' بدهی با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین بدهی ای وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Debt.findByIdAndRemove(req.params.id, (err, Debt) => {
            if (err) throw err;
            if (Debt) {
                return res.json({
                    data: 'بدهی با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین بدهی ای وجود ندارد',
                success: false
            });
        });
    }

}
