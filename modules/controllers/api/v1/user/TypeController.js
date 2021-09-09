const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryIncomeController extends Controller {
    TypeOneUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Type.find({user_id:req.params.id}).sort({type_name: -1 }).exec((err, Type) => {
            if (err) throw err;
            if (Type) {
                return res.json({
                    data: Type,
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
        req.checkBody('type_name', ' نام دسته نمیتواند خالی بماند').notEmpty();
        req.checkBody('user_id', ' ایدی کاربر نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'type_name user_id');
        if (this.showValidationErrors(req, res))
            return;
        this.model.Type.findOne({
            type_name: req.body.type_name,
            user_id: req.body.user_id,
        }, (err, Type) => {
            if (err) throw err;
            if (Type) {
                return res.json({
                    data: 'نوع نمی تواند تکراری باشد این نوع قبلا ثبت شده است',
                    success: false
                });
            } else {
                let newType = new this.model.Type({
                    type_name: req.body.type_name,
                    user_id: req.body.user_id,
                })
                newType.save(err => {
                    if (err) throw err;
                    return res.json({
                        data: 'نوع جدید با موفقیت ثبت شد',
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
        this.model.Type.findByIdAndUpdate(req.params.id, {
            type_name: req.body.type_name,
            user_id: req.body.user_id,
        }, (err, Type) => {
            if (err) throw err;
            if (Type) {
                return res.json({
                    data: ' نوع با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین نوعی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Type.findByIdAndRemove(req.params.id, (err, Type) => {
            if (err) throw err;
            if (Type) {
                return res.json({
                    data: 'نوع با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین نوعی وجود ندارد',
                success: false
            });
        });
    }

}
