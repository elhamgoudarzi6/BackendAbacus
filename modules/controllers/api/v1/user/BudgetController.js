const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryIncomeController extends Controller {
    BudgetOneUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Budget.find({user_id:req.params.id}).sort({category: -1 }).exec((err, Budget) => {
            if (err) throw err;
            if (Budget) {
                return res.json({
                    data: Budget,
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
       req.checkBody('icon', ' آیکن نمیتواند خالی بماند').notEmpty();
        req.checkBody('category', ' دسته پرداختی نمیتواند خالی بماند').notEmpty();
        req.checkBody('sub_category', ' زیر دسته پرداختی نمیتواند خالی بماند').notEmpty();
        req.checkBody('amount', ' مبلغ نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'category sub_category amount user_id');
        if (this.showValidationErrors(req, res))
            return;
        let newBudget = new this.model.Budget({
            user_id: req.body.user_id,
            category: req.body.category,
            sub_category:req.body.sub_category,
            icon:req.body.icon,
            amount:req.body.amount,
        })
        newBudget.save(err => {
            if (err) throw err;
            return res.json({
                data: 'بودجه جدید با موفقیت ثبت شد',
                success: true
            });
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Budget.findByIdAndUpdate(req.params.id, {
            user_id: req.body.user_id,
            category: req.body.category,
            sub_category:req.body.sub_category,
             icon:req.body.icon,
            amount:req.body.amount,
        }, (err, Budget) => {
            if (err) throw err;
            if (Budget) {
                return res.json({
                    data: ' بودجه با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین بودجه ای وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Budget.findByIdAndRemove(req.params.id, (err, Budget) => {
            if (err) throw err;
            if (Budget) {
                return res.json({
                    data: 'بودجه با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین بودجه ای وجود ندارد',
                success: false
            });
        });
    }

}
