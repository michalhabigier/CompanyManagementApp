const express = require("express");
const router = express.Router();

const DepartmentsController = require('../controllers/departments');

router.get("/", DepartmentsController.departments_get_all);

router.post("/", DepartmentsController.departments_add_new);

router.get("/", DepartmentsController.departments_get_one);

router.patch("/:employeeId", DepartmentsController.update_department);

router.delete("/:employeeId", DepartmentsController.delete_department);

module.exports = router;
