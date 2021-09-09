const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryIncomeController extends Controller {
    CategoryIncomeOneUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.CategoryIncome.find({user_id:req.params.id}).populate('SubCategoryIncome').sort({category_name: -1 }).exec((err, CategoryIncome) => {
            if (err) throw err;
            if (CategoryIncome) {
                return res.json({
                    data: CategoryIncome,
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
        this.model.CategoryIncome.findOne({
            category_name: req.body.category_name,
            user_id: req.body.user_id
        }, (err, CategoryIncome) => {
            if (err) throw err;
            if (CategoryIncome) {
                this.model.SubCategoryIncome.findOne({
                    sub_category: req.body.sub_category,
                    user_id: req.body.user_id,
                    category_id:CategoryIncome.id
                }, (err, SubCategoryIncome) => {
                    if (err) throw err;
                    if (SubCategoryIncome) {
                        return res.json({
                            data: 'زیر دسته نمی تواند تکراری باشد این زیر دسته قبلا ثبت شده است',
                            success: false
                        });
                    } else {
                        let newSubCategoryIncome = new this.model.SubCategoryIncome({
                            category_id: CategoryIncome.id,
                            sub_category: req.body.sub_category,
                            user_id: req.body.user_id,
                        })
                        newSubCategoryIncome.save(err => {
                            if (err) throw err;
                        })
                        return res.json({
                            data: 'دسته و زیر دسته جدید با موفقیت ثبت شد',
                            success: true
                        });
                    }
                })
            } else {
                let newCategoryIncome = new this.model.CategoryIncome({
                    category_name: req.body.category_name,
                    user_id: req.body.user_id,

                })
                newCategoryIncome.save(err => {
                    if (err) throw err;
                    this.model.SubCategoryIncome.findOne({
                        sub_category: req.body.sub_category,
                        user_id: req.body.user_id,
                        category_id:newCategoryIncome.id

                    }, (err, SubCategoryIncome) => {
                        if (err) throw err;
                        if (SubCategoryIncome) {
                            return res.json({
                                data: 'زیر دسته نمی تواند تکراری باشد این زیر دسته قبلا ثبت شده است',
                                success: false
                            });
                        } else {
                            let newSubCategoryIncome = new this.model.SubCategoryIncome({
                                category_id: newCategoryIncome.id,
                                sub_category: req.body.sub_category,
                                user_id: req.body.user_id,
                            })
                            newSubCategoryIncome.save(err => {
                                if (err) throw err;
                            })
                            return res.json({
                                data: 'دسته و زیر دسته جدید با موفقیت ثبت شد',
                                success: true
                            });
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
        this.model.CategoryIncome.findByIdAndUpdate(req.params.id, {
            category_name: req.body.category_name,
            user_id: req.body.user_id,
        }, (err, CategoryIncome) => {
            if (err) throw err;
            if (CategoryIncome) {
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
        this.model.CategoryIncome.findByIdAndRemove(req.params.id, (err, CategoryIncome) => {
            if (err) throw err;
            if (CategoryIncome) {
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
