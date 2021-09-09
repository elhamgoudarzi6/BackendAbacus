const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryIncomeController extends Controller {
   IncomeOneUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Income.find({user_id:req.params.id}).exec((err, Income) => {
            if (err) throw err;
            if (Income) {
                return res.json({
                    data: Income,
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
        req.checkBody('day', ' روز پرداختی نمیتواند خالی بماند').notEmpty();
        req.checkBody('month', ' ماه پرداختی نمیتواند خالی بماند').notEmpty();
        req.checkBody('year', ' سال پرداختی نمیتواند خالی بماند').notEmpty();
        req.checkBody('category', ' دسته دریافتی نمیتواند خالی بماند').notEmpty();
        req.checkBody('sub_category', ' زیر دسته دریافتی نمیتواند خالی بماند').notEmpty();
        req.checkBody('amount', ' مبلغ نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'category title sub_category amount user_id');
        if (this.showValidationErrors(req, res))
            return;
        let newIncome = new this.model.Income({
            user_id: req.body.user_id,
            category: req.body.category,
            sub_category:req.body.sub_category,
            day:req.body.day,
            month:req.body.month,
            year:req.body.year,
			date:req.body.date,
            amount:req.body.amount,
            acount:req.body.acount,
            image: req.body.image,
            detail:req.body.detail,
            type:req.body.type
        })
        newIncome.save(err => {
            if (err) throw err;
            return res.json({
                data: 'دریافتی جدید با موفقیت ثبت شد',
                success: true
            });
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Income.findByIdAndUpdate(req.params.id, {
            user_id: req.body.user_id,
            category: req.body.category,
            sub_category:req.body.sub_category,
            day:req.body.day,
            month:req.body.month,
            year:req.body.year,
            amount:req.body.amount,
            acount:req.body.acount,
            image: req.body.image,
            detail:req.body.detail,
            type:req.body.type
        }, (err, Income) => {
            if (err) throw err;
            if (Income) {
                return res.json({
                    data: ' دریافتی با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین دریافتی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Income.findByIdAndRemove(req.params.id, (err, Income) => {
            if (err) throw err;
            if (Income) {
                return res.json({
                    data: 'دریافتی با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین دریافتی وجود ندارد',
                success: false
            });
        });
    }

}
