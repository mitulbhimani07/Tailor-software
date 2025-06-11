const express = require('express');
const route = express.Router();
const TailorController = require('../controllers/TailorController');

// Routes
route.get('/', TailorController.home); // Shows list of tailor data
route.get('/TailorForm', TailorController.TailorForm); // Shows form
route.post('/addCustomers', TailorController.addCustomers); // Handles form submission
route.get('/edit/:id', TailorController.editCustomerForm); // Shows form to edit customer
route.post('/edit/:id', TailorController.updateCustomer); // Handles update of customer
route.post('/delete/:id', TailorController.deleteCustomer); // Handles deletion of customer
route.get('/view/:id', TailorController.singleView); // Single customer view

module.exports = route;
