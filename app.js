const express = require('express');
const path = require('path');
const ContactModel = require('./models/ContactModel');
const { ConnectionStates } = require('mongoose');

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// ================================== main page ==================================  
app.get('/', (req, res) => {
    res.render('index');
})

// ======================= Create =======================
// (1) form is submitted, a POST request is made to /create with form data in req.body 
app.post('/create', async (req, res) => {
    let {name, contact, email, address} = req.body;

    let newContact =  await ContactModel.create({
        name: name,
        phoneNumber: contact,
        email: email,
        address: address
    })

    // (2) res.render(view, data)
    // ⚠️ Currently the 'index.ejs' template doesn't use newContact, so this has no visible effect.
    res.render('index', {newContact});
    // res.redirect('/contact')
})

// ======================= Read =======================

// (1) browser makes a new GET request to /contacts
app.get('/contacts', async (req, res) => {
    const contacts = await ContactModel.find();
    console.log("Contacts found:", contacts);
    
    
    // (2) res.render(view, data)
    res.render('contacts', {contacts})
})

// ======================= Update =======================

app.get('/edit/:id', async (req, res) => {
    const contact = await ContactModel.findById({_id: req.params.id});
    res.render('update', {contact});
})

app.post('/update/:id', async (req, res) => {
    let {name, contact, email, address} = req.body;

    await ContactModel.findByIdAndUpdate(
        req.params.id,
        
        { 
            name: name,
            phoneNumber: contact,
            email: email,
            address: address
        },

        { new: true }
    );

    res.redirect("/contacts");
});


// ======================= Delete =======================
app.get('/delete/:id', async (req, res) => {
    const deletedContact = await ContactModel.findOneAndDelete({_id:req.params.id});
    res.redirect('/contacts');
})

app.listen(3000);