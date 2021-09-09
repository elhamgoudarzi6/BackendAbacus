const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryIncomeController extends Controller {
   CostOneUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Cost.find({user_id:req.params.id}).sort({category: -1 }).exec((err, Cost) => {
            if (err) throw err;
            if (Cost) {
                return res.json({
                    data: Cost,
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
        req.checkBody('category', ' دسته پرداختی نمیتواند خالی بماند').notEmpty();
        req.checkBody('sub_category', ' زیر دسته پرداختی نمیتواند خالی بماند').notEmpty();
        req.checkBody('amount', ' مبلغ نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'category sub_category amount user_id');
        if (this.showValidationErrors(req, res))
            return;
        let newCost = new this.model.Cost({
            user_id: req.body.user_id,
            category: req.body.category,
            sub_category:req.body.sub_category,
            day:req.body.day,
            month:req.body.month,
            year:req.body.year,
            time: req.body.time,
				date:req.body.date,
            amount:req.body.amount,
            acount:req.body.acount,
            image: req.body.image,
            detail:req.body.detail,
            of_income: req.body.of_income,
            type:req.body.type
        })
        newCost.save(err => {
            if (err) throw err;
            return res.json({
                data: 'هزینه جدید با موفقیت ثبت شد',
                success: true
            });
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Cost.findByIdAndUpdate(req.params.id, {
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
            of_income: req.body.of_income,
            type:req.body.type
        }, (err, Cost) => {
            if (err) throw err;
            if (Cost) {
                return res.json({
                    data: ' هزینه با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین هزینه ای وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Cost.findByIdAndRemove(req.params.id, (err, Cost) => {
            if (err) throw err;
            if (Cost) {
                return res.json({
                    data: 'هزینه با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین هزینه ای وجود ندارد',
                success: false
            });
        });
    }

}
