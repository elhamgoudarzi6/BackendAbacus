const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryIncomeController extends Controller {
    ReminderOneUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Reminder.find({user_id:req.params.id}).sort({title: -1 }).exec((err, Reminder) => {
            if (err) throw err;
            if (Reminder) {
                return res.json({
                    data: Reminder,
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
        req.checkBody('date', ' تاریخ نمیتواند خالی بماند').notEmpty();
        req.checkBody('description', ' متن یادداشت نمیتواند خالی بماند').notEmpty();
        req.checkBody('title', ' عنوان نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'title description date user_id');
        if (this.showValidationErrors(req, res))
            return;
        let newReminder = new this.model.Reminder({
            user_id: req.body.user_id,
            date:req.body.date,
            title:req.body.title,
            repeat:req.body.repeat,
            description: req.body.description,
            image:req.body.image,
            type:req.body.type
        })
        newReminder.save(err => {
            if (err) throw err;
            return res.json({
                data: 'یادداشت جدید با موفقیت ثبت شد',
                success: true
            });
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Reminder.findByIdAndUpdate(req.params.id, {
            user_id: req.body.user_id,
            date:req.body.date,
            title:req.body.title,
            repeat:req.body.repeat,
            description: req.body.description,
            image:req.body.image,
            type:req.body.type
        }, (err, Reminder) => {
            if (err) throw err;
            if (Reminder) {
                return res.json({
                    data: ' یادداشت با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین یادداشتی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Reminder.findByIdAndRemove(req.params.id, (err, Reminder) => {
            if (err) throw err;
            if (Reminder) {
                return res.json({
                    data: 'یادداشت با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین یادداشتی وجود ندارد',
                success: false
            });
        });
    }
}
