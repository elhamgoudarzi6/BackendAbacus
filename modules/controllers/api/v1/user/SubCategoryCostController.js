const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryCostController extends Controller {

    SubCategoryCostOneUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.SubCategoryCost.find({user_id:req.params.id}).sort({sub_category: -1 }).exec((err, SubCategoryCost) => {
            if (err) throw err;
            if (SubCategoryCost) {
                return res.json({
                    data: SubCategoryCost,
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
        req.checkBody('sub_category', ' نام زیر دسته نمیتواند خالی بماند').notEmpty();
        req.checkBody('user_id', ' ایدی کاربر نمیتواند خالی بماند').notEmpty();
        req.checkBody('category_id', ' ایدی دسته نمیتواند خالی بماند').notEmpty();

        this.escapeAndTrim(req, 'sub_category user_id category_id');
        if (this.showValidationErrors(req, res))
            return;
        let newSubCategoryCost = new this.model.SubCategoryCost({
            category_id:req.body.category_id,
            sub_category: req.body.sub_category,
            user_id:req.body.user_id,
        })
        newSubCategoryCost.save(err => {
            if (err) throw err;
            return res.json({
                data: 'زیر دسته جدید با موفقیت ثبت شد',
                success: true
            });
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategoryCost.findByIdAndUpdate(req.params.id, {
            category_id:req.body.category_id,
            sub_category: req.body.sub_category,
            user_id:req.body.user_id,
        }, (err, SubCategoryCost) => {
            if (err) throw err;
            if (SubCategoryCost) {
                return res.json({
                    data: ' زیر دسته با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین زیر دسته وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategoryCost.findByIdAndRemove(req.params.id, (err, SubCategoryCost) => {
            if (err) throw err;
            if (SubCategoryCost) {
                return res.json({
                    data: 'زیر دسته با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین زیر دسته ای وجود ندارد',
                success: false
            });
        });
    }

}
