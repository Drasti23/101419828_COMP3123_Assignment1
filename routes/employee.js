

const express = require("express");
const Employee = require("../models/employee"); // Ensure you have this model defined

const routes = express.Router();

// GET /api/v1/emp/employees - to Get all employees
routes.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find(); // Fetching all employees from the database
        if (employees.length === 0) {
            res.status(404).json({ message: "No employees found" });
        } else {
            res.status(200).json(employees); // Returning the list of employees
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// POST /api/v1/emp/employees - to dd a new employee
routes.post("/employees", async (req, res) => {
    try {
        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
        });
        await newEmployee.save(); // Saving new employee to the database
        res.status(201).json({ message: "Employee created successfully", employee_id: newEmployee._id });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// GET /api/v1/emp/employees/:eid - Getting employee by ID
routes.get("/employees/:eid", async (req, res) => {
    try {
        // Fetching employee by ID
        const employee = await Employee.findById(req.params.eid); 
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee); 
        // Returning the employee details
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// PUT /api/v1/emp/employees/:eid - Update existing employee by ID
routes.put("/employees/:eid", async (req, res) => {
    try {
        // Updating employee by ID
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true }); 
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// DELETE /api/v1/emp/employees/:eid - Delete employee by ID
routes.delete("/employees/:eid", async (req, res) => {
    try {
        // Deleting employee by ID
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.eid); 
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = routes;

