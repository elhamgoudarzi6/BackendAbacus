const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryCostController extends Controller {
    CategoryCostOneUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.CategoryCost.find({user_id:req.params.id}).populate('SubCategoryCost').sort({category_name: -1 }).exec((err, CategoryCost) => {
            if (err) throw err;
            if (CategoryCost) {
                return res.json({
                    data: CategoryCost,
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
        req.checkBody('category_name', ' نام دسته نمیتواند خالی بماند').notEmpty();
        req.checkBody('user_id', ' ایدی کاربر نمیتواند خالی بماند').notEmpty();
        req.checkBody('sub_category', ' نام زیر دسته نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'category_name user_id sub_category');
        if (this.showValidationErrors(req, res))
            return;
        this.model.CategoryCost.findOne({
            category_name: req.body.category_name,
            user_id: req.body.user_id
        }, (err, CategoryCost) => {
            if (err) throw err;
            if (CategoryCost) {
                this.model.SubCategoryCost.findOne({
                    sub_category: req.body.sub_category,
                    user_id: req.body.user_id,
                    category_id:CategoryCost.id
                }, (err, SubCategoryCost) => {
                    if (err) throw err;
                    if (SubCategoryCost) {
                        return res.json({
                            data: 'زیر دسته نمی تواند تکراری باشد این زیر دسته قبلا ثبت شده است',
                            success: false
                        });
                    } else {
                        let newSubCategoryCost = new this.model.SubCategoryCost({
                            category_id: CategoryCost.id,
                            sub_category: req.body.sub_category,
                            user_id: req.body.user_id,
                        })
                        newSubCategoryCost.save(err => {
                            if (err) throw err;
                        })
                        return res.json({
                            data: 'دسته و زیر دسته جدید با موفقیت ثبت شد',
                            success: true
                        });
                    }
                })
            } else {
                let newCategoryCost = new this.model.CategoryCost({
                    category_name: req.body.category_name,
                    user_id: req.body.user_id,

                })
                newCategoryCost.save(err => {
                    if (err) throw err;
                    this.model.SubCategoryCost.findOne({
                        sub_category: req.body.sub_category,
                        user_id: req.body.user_id,
                        category_id:newCategoryCost.id

                    }, (err, SubCategoryCost) => {
                        if (err) throw err;
                        if (SubCategoryCost) {
                            return res.json({
                                data: 'زیر دسته نمی تواند تکراری باشد این زیر دسته قبلا ثبت شده است',
                                success: false
                            });
                        } else {
                            let newSubCategoryCost = new this.model.SubCategoryCost({
                                category_id: newCategoryCost.id,
                                sub_category: req.body.sub_category,
                                user_id: req.body.user_id,
                            })
                            newSubCategoryCost.save(err => {
                                if (err) throw err;
                            })
                            res.json('دسته و زیر دسته جدید با موفقیت ثبت شد');
                        }
                    })
                })
            }

        })


    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CategoryCost.findByIdAndUpdate(req.params.id, {
            category_name: req.body.category_name,
            user_id: req.body.user_id,
        }, (err, CategoryCost) => {
            if (err) throw err;
            if (CategoryCost) {
                return res.json({
                    data: ' دسته با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین دسته ای وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CategoryCost.findByIdAndRemove(req.params.id, (err, CategoryCost) => {
            if (err) throw err;
            if (CategoryCost) {
                return res.json({
                    data: 'دسته با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین دسته ای وجود ندارد',
                success: false
            });
        });
    }

}
