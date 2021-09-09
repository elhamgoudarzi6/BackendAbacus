const express = require('express');
const router = express.Router();
const adminRouter = express.Router();

// middlewares
const apiAuthAdminUser = require('./middleware/apiAuthAdmin');
const apiAuth = require('./middleware/apiAuth');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
const HomeController = require(`${ControllerApi}/v1/HomeController`);
const AuthController = require(`${ControllerApi}/v1/user/AuthController`);
const UploadController = require(`${ControllerApi}/v1/user/UploadController`);
const CategoryCostController = require(`${ControllerApi}/v1/user/CategoryCostController`);
const SubCategoryCostController = require(`${ControllerApi}/v1/user/SubCategoryCostController`);
const SubCategoryIncomeController = require(`${ControllerApi}/v1/user/SubCategoryIncomeController`);
const CategoryIncomeController = require(`${ControllerApi}/v1/user/CategoryIncomeController`);
const IncomeController = require(`${ControllerApi}/v1/user/IncomeController`);
const CostController = require(`${ControllerApi}/v1/user/CostController`);
const BudgetController = require(`${ControllerApi}/v1/user/BudgetController`);
const TypeController = require(`${ControllerApi}/v1/user/TypeController`);
const AcountController = require(`${ControllerApi}/v1/user/AcountController`);
const DebtController = require(`${ControllerApi}/v1/user/DebtController`);
const LenderController = require(`${ControllerApi}/v1/user/LenderController`);
const ReportController = require(`${ControllerApi}/v1/user/ReportController`);
const ReminderController = require(`${ControllerApi}/v1/user/ReminderController`);

//admin controller
const AdminAuthMaster = require(`${ControllerApi}/v1/admin/AuthMaster`);
const AdminAuthController = require(`${ControllerApi}/v1/admin/AuthController`);
const AdminUserController = require(`${ControllerApi}/v1/admin/UserController`);
const AdminUploadController = require(`${ControllerApi}/v1/admin/UploadController`);

//admin router*********************************************
adminRouter.post('/master', AdminAuthMaster.login.bind(AdminAuthMaster));
//upload image
adminRouter.post('/image', uploadImage.single('image'), AdminUploadController.uploadImage.bind(AdminUploadController));
//list users
adminRouter.get('/users', AdminUserController.index.bind(AdminUserController));
// login office admin
adminRouter.post('/login', AdminAuthController.login.bind(AdminAuthController));
//router.get('/' , HomeController.index);
router.get('/version', HomeController.version);

//user router***********************************************
//upload image
router.post('/image', uploadImage.single('image'), UploadController.uploadImage.bind(UploadController));

// auth user
router.post('/register', AuthController.register.bind(AuthController));
router.post('/login', AuthController.login.bind(AuthController));
router.patch('/updateuser/:id', AuthController.UpdateUser.bind(AuthController));
router.get('/showuser/:id', AuthController.singleUser.bind(AuthController));
router.patch('/updatemobile/:id', AuthController.UpdateMobile.bind(AuthController));
router.patch('/changepassword/:id', AuthController.ChangePassword.bind(AuthController));
router.post('/resetpassword', AuthController.ResetPassword.bind(AuthController));
router.post('/findmobile', AuthController.FindMobile.bind(AuthController));

//send sms
router.post('/sendsms', AuthController.sendsms.bind(AuthController));

//reminder
router.get('/reminder/:id', ReminderController.ReminderOneUser.bind(ReminderController));
router.post('/reminder', ReminderController.store.bind(ReminderController));
router.put('/reminder/:id', ReminderController.update.bind(ReminderController));
router.delete('/reminder/:id', ReminderController.destroy.bind(ReminderController));

//acount
router.get('/acount/:id', AcountController.AcountOneUser.bind(AcountController));
router.post('/acount', AcountController.store.bind(AcountController));
router.put('/acount/:id', AcountController.update.bind(AcountController));
router.delete('/acount/:id', AcountController.destroy.bind(AcountController));

// type
router.get('/type/:id', TypeController.TypeOneUser.bind(TypeController));
router.post('/type', TypeController.store.bind(TypeController));
router.put('/type/:id', TypeController.update.bind(TypeController));
router.delete('/type/:id', TypeController.destroy.bind(TypeController));

// cost
router.get('/cost/:id', CostController.CostOneUser.bind(CostController));
router.post('/cost', CostController.store.bind(CostController));
router.put('/cost/:id', CostController.update.bind(CostController));
router.delete('/cost/:id', CostController.destroy.bind(CostController));

//income
router.get('/income/:id', IncomeController.IncomeOneUser.bind(IncomeController));
router.post('/income', IncomeController.store.bind(IncomeController));
router.put('/income/:id', IncomeController.update.bind(IncomeController));
router.delete('/income/:id', IncomeController.destroy.bind(IncomeController));

//debt
router.get('/debt/:id', DebtController.DebtOneUser.bind(DebtController));
router.post('/debt', DebtController.store.bind(DebtController));
router.put('/debt/:id', DebtController.update.bind(DebtController));
router.delete('/debt/:id', DebtController.destroy.bind(DebtController));

//lender
router.get('/lender/:id', LenderController.LenderOneUser.bind(LenderController));
router.post('/lender', LenderController.store.bind(LenderController));
router.put('/lender/:id', LenderController.update.bind(LenderController));
router.delete('/lender/:id', LenderController.destroy.bind(LenderController));

//budget
router.get('/budget/:id', BudgetController.BudgetOneUser.bind(BudgetController));
router.post('/budget', BudgetController.store.bind(BudgetController));
router.put('/budget/:id', BudgetController.update.bind(BudgetController));
router.delete('/budget/:id', BudgetController.destroy.bind(BudgetController));

//category cost
router.get('/categorycost/:id', CategoryCostController.CategoryCostOneUser.bind(CategoryCostController));
router.post('/categoryandsub_cost', CategoryCostController.store.bind(CategoryCostController));
router.put('/categorycost/:id', CategoryCostController.update.bind(CategoryCostController));
router.delete('/categorycost/:id', CategoryCostController.destroy.bind(CategoryCostController));

//sub category cost
router.get('/subcategorycost/:id', SubCategoryCostController.SubCategoryCostOneUser.bind(SubCategoryCostController));
router.post('/subcategorycost', SubCategoryCostController.store.bind(SubCategoryCostController));
router.put('/subcategorycost/:id', SubCategoryCostController.update.bind(SubCategoryCostController));
router.delete('/subcategorycost/:id', SubCategoryCostController.destroy.bind(SubCategoryCostController));

// category income
router.get('/categoryincome/:id', CategoryIncomeController.CategoryIncomeOneUser.bind(CategoryIncomeController));
router.post('/categoryandsub_income', CategoryIncomeController.store.bind(CategoryIncomeController));
router.put('/categoryincome/:id', CategoryIncomeController.update.bind(CategoryIncomeController));
router.delete('/categoryincome/:id', CategoryIncomeController.destroy.bind(CategoryIncomeController));

//sub category income
router.get('/subcategoryincome/:id', SubCategoryIncomeController.SubCategoryIncomeOneUser.bind(SubCategoryIncomeController));
router.post('/subcategoryincome', SubCategoryIncomeController.store.bind(SubCategoryIncomeController));
router.put('/subcategoryincome/:id', SubCategoryIncomeController.update.bind(SubCategoryIncomeController));
router.delete('/subcategoryincome/:id', SubCategoryIncomeController.destroy.bind(SubCategoryIncomeController));

//report
router.post('/reportDayIncome/:id', ReportController.ReportDayIncome.bind(ReportController));
router.post('/reportDayCost/:id', ReportController.ReportDayCost.bind(ReportController));

router.post('/reportYearIncome/:id', ReportController.ReportYearIncome.bind(ReportController));
router.post('/reportYearCost/:id', ReportController.ReportYearCost.bind(ReportController));

router.post('/reportmonthIncome/:id', ReportController.ReportMonthIncome.bind(ReportController));
router.post('/reportmonthCost/:id', ReportController.ReportMonthCost.bind(ReportController));

router.post('/reportyearCategory/:id', ReportController.ReportYearCategoryIncome.bind(ReportController));
router.post('/reportSummaryIncome', ReportController.ReportSummaryIncome.bind(ReportController));
router.post('/reportSummaryCost', ReportController.ReportSummaryCost.bind(ReportController));
router.post('/reportASearchIncome', ReportController.ReportASearchIncome.bind(ReportController));
router.post('/reportASearchCost', ReportController.ReportASearchCost.bind(ReportController));

// router.post('/subcategoryincome', SubCategoryIncomeController.store.bind(SubCategoryIncomeController));
// router.put('/subcategoryincome/:id', SubCategoryIncomeController.update.bind(SubCategoryIncomeController));
// router.delete('/subcategoryincome/:id', SubCategoryIncomeController.destroy.bind(SubCategoryIncomeController));

//setting routes***********************************
// router.use('/user', [customerRouter, apiAuthcustomer])
// router.use('/admin', [adminRouter , apiAuthAdminUser]);

router.use('/admin', adminRouter);
router.use('/', router);

module.exports = router;
