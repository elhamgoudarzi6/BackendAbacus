const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class UserController extends Controller {
    index(req, res) {
        this.model.User.find({}).sort({name: -1}).exec((err, user) => {
            if (err) throw err;
            if (user) {
                return res.json({
                    data: user,
                    success: true
                });
            }
            res.json({
                data: 'هیچ کاربری وجود ندارد',
                success: false
            })
        });
    }


}
