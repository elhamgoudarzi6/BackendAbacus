const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryIncomeController extends Controller {
    ReportDayIncome(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Income.aggregate(
            [
                {
                    $match: {user_id: req.params.id, year: req.body.year, month: req.body.month, day: req.body.day}
                },
                {
                    $group: {
                        _id: "$category",
                        sum: {$sum: "$amount"}
                    }
                }
            ]
        ).exec((err, Income) => {
            //  this.model.Income.find({user_id:req.params.id,month:req.body.month,year:req.body.year ,category:req.body.category}).sort({category: -1 }).exec((err, Income) => {
            if (err) throw err;

            if (Income.length > 0) {
                let sum = 0;
                let count = Income.length;
                for (let i = 0; i < count; i++) {
                    sum += parseInt(Income[i].amount);
                }
                return res.json({
                    data: Income,
                    sumOfMonth: sum,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    ReportDayCost(req, res) {

        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();


        this.model.Cost.aggregate(
            [
                {
                    $match: {user_id: req.params.id, year: req.body.year, month: req.body.month, day: req.body.day}
                },
                {
                    $group: {
                        _id: "$category",
                        sum: {$sum: "$amount"}
                    }
                }
            ]
        ).exec((err, Cost) => {
            //  this.model.Income.find({user_id:req.params.id,month:req.body.month,year:req.body.year ,category:req.body.category}).sort({category: -1 }).exec((err, Income) => {
            if (err) throw err;

            if (Cost.length > 0) {
                let sum = 0;
                let count = Cost.length;
                for (let i = 0; i < count; i++) {
                    sum += parseInt(Cost[i].amount);
                }
                return res.json({
                    data: Cost,
                    sumOfMonth: sum,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    ReportMonthIncome(req, res) {

        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();


        this.model.Income.aggregate(
            [
                {
                    $match: {user_id: req.params.id, year: req.body.year, month: req.body.month}
                },
                {
                    $group: {
                        _id: "$category",
                        sum: {$sum: "$amount"}
                    }
                }
            ]
        ).exec((err, Income) => {
            //  this.model.Income.find({user_id:req.params.id,month:req.body.month,year:req.body.year ,category:req.body.category}).sort({category: -1 }).exec((err, Income) => {
            if (err) throw err;

            if (Income.length > 0) {
                let sum = 0;
                let count = Income.length;
                for (let i = 0; i < count; i++) {
                    sum += parseInt(Income[i].amount);
                }
                return res.json({
                    data: Income,
                    sumOfMonth: sum,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    ReportMonthCost(req, res) {

        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();


        this.model.Cost.aggregate(
            [
                {
                    $match: {user_id: req.params.id, year: req.body.year, month: req.body.month}
                },
                {
                    $group: {
                        _id: "$category",
                        sum: {$sum: "$amount"}
                    }
                }
            ]
        ).exec((err, Cost) => {
            //  this.model.Income.find({user_id:req.params.id,month:req.body.month,year:req.body.year ,category:req.body.category}).sort({category: -1 }).exec((err, Income) => {
            if (err) throw err;

            if (Cost.length > 0) {
                let sum = 0;
                let count = Cost.length;
                for (let i = 0; i < count; i++) {
                    sum += parseInt(Cost[i].amount);
                }
                return res.json({
                    data: Cost,
                    sumOfMonth: sum,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    ReportYearIncome(req, res) {

        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();


        this.model.Income.aggregate(
            [
                {
                    $match: {user_id: req.params.id, year: req.body.year}
                },
                {
                    $group: {
                        _id: "$category",
                        sum: {$sum: "$amount"}
                    }
                }
            ]
        ).exec((err, Income) => {
            //  this.model.Income.find({user_id:req.params.id,month:req.body.month,year:req.body.year ,category:req.body.category}).sort({category: -1 }).exec((err, Income) => {
            if (err) throw err;

            if (Income.length > 0) {
                let sum = 0;
                let count = Income.length;
                for (let i = 0; i < count; i++) {
                    sum += parseInt(Income[i].amount);
                }
                return res.json({
                    data: Income,
                    sumOfMonth: sum,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    ReportYearCost(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Cost.aggregate(
            [
                {
                    $match: {user_id: req.params.id, year: req.body.year}
                },
                {
                    $group: {
                        _id: "$category",
                        sum: {$sum: "$amount"}
                    }
                }
            ]
        ).exec((err, Cost) => {
            //  this.model.Income.find({user_id:req.params.id,month:req.body.month,year:req.body.year ,category:req.body.category}).sort({category: -1 }).exec((err, Income) => {
            if (err) throw err;

            if (Cost.length > 0) {
                let sum = 0;
                let count = Cost.length;
                for (let i = 0; i < count; i++) {
                    sum += parseInt(Cost[i].amount);
                }
                return res.json({
                    data: Cost,
                    sumOfMonth: sum,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    ReportYearCategoryIncome(req, res) {

        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Income.aggregate(
            [

                {
                    $match: {user_id: req.params.id, year: req.body.year}
                },
                {
                    $group: {
                        _id: "$category", incomes: {$push: "$$ROOT"},

                        sum: {$sum: "$amount"}
                    }
                }

            ]
        ).sort({category: -1}).exec((err, Income) => {
            if (err) throw err;
            if (Income) {

                return res.json({
                    data: Income,

                    success: true
                });
            } else {
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            }
        });
    }

    ReportMonthCategoryIncome(req, res) {
        console.log(req.body);
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Income.aggregate(
            [

                {
                    $match: {user_id: req.params.id, month: req.body.month, year: req.body.year}
                },
                {
                    $group: {
                        _id: "$category", incomes: {$push: "$$ROOT"},

                        sum: {$sum: "$amount"}
                    }
                }

            ]
        ).sort({category: -1}).exec((err, Income) => {
            if (err) throw err;
            if (Income) {

                return res.json({
                    data: Income,

                    success: true
                });
            } else {
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            }
        });
    }

    ReportSummaryIncome(req, res) {
        let query = {};
        if (req.body.user_id) {
            query.user_id = req.body.user_id;
        }
        if (req.body.month) {
            query.month = req.body.month;
        }
        if (req.body.year) {
            query.year = req.body.year;
        }
        if (req.body.day) {
            query.day = req.body.day;
        }

        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        var data = {};
        this.model.Income.aggregate(
            [

                {
                    $match: query
                },
                {
                    $group: {
                        _id: "income",
                        totalIncome: {$sum: "$amount"}
                    }
                }

            ]
        ).exec((err, Income) => {

            if (err) throw err;
            if (Income.length > 0) {

                return res.json({
                    data: Income,
                    success: true
                });
            } else {
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            }
        });
    }

    ReportSummaryCost(req, res) {
        let query = {};
        if (req.body.user_id) {
            query.user_id = req.body.user_id;
        }
        if (req.body.month) {
            query.month = req.body.month;
        }
        if (req.body.year) {
            query.year = req.body.year;
        }
        if (req.body.day) {
            query.day = req.body.day;
        }
        console.log(query);
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        this.model.Cost.aggregate(
            [

                {
                    $match: query
                },
                {
                    $group: {
                        _id: "Cost",
                        totalCost: {$sum: "$amount"}
                    }
                }

            ]
        ).exec((err, Cost) => {

            if (err) throw err;
            if (Cost.length > 0) {

                return res.json({
                    data: Cost,
                    success: true
                });
            } else {
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            }
        });
    }

    ReportASearchIncome(req, res) {
        let query = {};
        if (req.body.user_id) {
            query.user_id = req.body.user_id;
        }
        if (req.body.toAmount && req.body.fromAmount) {
            query.amount = {'$gte': req.body.fromAmount, '$lte': req.body.toAmount};
        }
        if (req.body.todate && req.body.fromdate) {
            query.date = {'$gte': req.body.fromdate, '$lte': req.body.todate};
        }

        if (req.body.acount) {
            query.acount = req.body.acount;
        }
        if (req.body.category) {
            query.category = req.body.category;
        }
        if (req.body.sub_category) {
            query.sub_category = req.body.sub_category;
        }

        this.model.Income.find(query).exec((err, Income) => {
            if (err) throw err;
            if (Income) {

                return res.json({
                    data: Income,

                    success: true
                });
            } else {
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            }
        });

    }

    ReportASearchCost(req, res) {
        let query = {};
        if (req.body.user_id) {
            query.user_id = req.body.user_id;
        }
        if (req.body.toAmount && req.body.fromAmount) {
            query.amount = {'$gte': req.body.fromAmount, '$lte': req.body.toAmount};
        }
        if (req.body.todate && req.body.fromdate) {
            query.date = {'$gte': req.body.fromdate, '$lte': req.body.todate};
        }

        if (req.body.acount) {
            query.acount = req.body.acount;
        }
        if (req.body.category) {
            query.category = req.body.category;
        }

        if (req.body.sub_category) {
            query.sub_category = req.body.sub_category;
        }

        this.model.Cost.find(query).exec((err, Cost) => {
            if (err) throw err;
            if (Cost) {

                return res.json({
                    data: Cost,

                    success: true
                });
            } else {
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            }
        });

    }
} 
