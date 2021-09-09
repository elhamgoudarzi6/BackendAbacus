// Model
const AdminUser = require(`${config.path.model}/admin_user`);
const User = require(`${config.path.model}/user`);
const CategoryCost = require(`${config.path.model}/category_cost`);
const SubCategoryCost = require(`${config.path.model}/sub_category_cost`);
const CategoryIncome = require(`${config.path.model}/category_income`);
const SubCategoryIncome = require(`${config.path.model}/sub_category_income`);
const Income = require(`${config.path.model}/income`);
const Cost = require(`${config.path.model}/cost`);
const Budget = require(`${config.path.model}/budget`);
const Acount = require(`${config.path.model}/acount`);
const Type = require(`${config.path.model}/type`);
const Debt = require(`${config.path.model}/debt`);
const Lender = require(`${config.path.model}/lender`);
const Reminder = require(`${config.path.model}/reminder`);
module.exports = class Controller {
    constructor() {
        this.model = { AdminUser,Income,Reminder,Cost,Lender,Budget,Debt,Acount,Type, CategoryCost,User,SubCategoryCost,CategoryIncome,SubCategoryIncome}
    }
    showValidationErrors(req, res, callback) {
        let errors = req.validationErrors();
        if (errors) {
            res.status(422).json({
                message: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        }
        return false
    }

    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }
}
