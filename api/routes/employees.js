const express = require("express");
const router = express.Router();

const EmployeesController = require('../controllers/employees');

router.get("/", EmployeesController.employees_get_all);

router.post("/", EmployeesController.employees_add_new);

router.get("/", EmployeesController.employees_get_one);

router.patch("/:employeeId", EmployeesController.update_employee);

router.delete("/:employeeId", EmployeesController.delete_employee);

module.exports = router;
