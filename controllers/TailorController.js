const TailorModel = require('../model/TailorModel');
module.exports.TailorForm = async (req, res) => {
    try {
        res.render('TailorForm'); // Render the Home view
    } catch (error) {
        console.error("Error rendering TailorForm:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports.addCustomers = async (req, res) => {
    try {
        const existing = await TailorModel.findOne({ mobile_no: req.body.mobile_no });
        if (existing) {
            return res.send("Customer with this mobile number already exists.");
        }

        console.log("Form Data:", req.body); // Add this line to check form data
        const TailorData = await TailorModel.create(req.body);
        console.log("Saved Data:", TailorData); // Add this line to check saved data
        res.redirect('/');
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).send("Error adding customer");
    }
}

module.exports.home = async (req, res) => {
    try {
        const TailorData = await TailorModel.find();
        console.log("TailorData:", TailorData);
        res.render('Home', { TailorData }); // Render the Home view with TailorData
    } catch (error) {
        console.error("Error fetching TailorData:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.editCustomerForm = async (req, res) => {
    try {
        const tailor = await TailorModel.findById(req.params.id);
        res.render('editeData', { tailor }); // Pass tailor data to form for editing
    } catch (error) {
        res.status(500).send("Error loading edit form");
    }
};

module.exports.updateCustomer = async (req, res) => {
    try {
        await TailorModel.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Error updating customer");
    }
};

module.exports.deleteCustomer = async (req, res) => {
    try {
        await TailorModel.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Error deleting customer");
    }
};

module.exports.singleView = async (req, res) => {
    try {
        const tailor = await TailorModel.findById(req.params.id);
        if (!tailor) {
            return res.status(404).send("Customer not found");
        }
        res.render('singleView', { tailor });
    } catch (error) {
        console.error("Error loading single view:", error);
        res.status(500).send("Internal Server Error");
    }
};