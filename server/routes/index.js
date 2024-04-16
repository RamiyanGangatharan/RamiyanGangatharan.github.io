import express from 'express';
import Contact from '../models/contact';
import passport from "passport";
import User from '../models/user';
import { AuthGuard, UserDisplayName } from "../utility";
const router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', displayName: UserDisplayName(req) });
});
router.get('/products', function (req, res, next) {
    res.render('index', { title: 'Products', page: 'products', displayName: UserDisplayName(req) });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Service', page: 'services', displayName: UserDisplayName(req) });
});
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('index', {
            title: 'Login',
            page: 'login',
            messages: req.flash('loginMessage'),
            displayName: UserDisplayName(req)
        });
    }
    else {
        return res.redirect('/contact-list');
    }
});
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('index', {
            title: 'Register',
            page: 'register',
            messages: req.flash('registerMessage'),
            displayName: UserDisplayName(req)
        });
    }
    else {
        return res.redirect('contact-list');
    }
});
router.post('/register', function (req, res, next) {
    let newUser = new User({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastname
    });
    User.register(newUser, req.body.password, function (err) {
        if (err) {
            if (err.name == "UserExistsError") {
                console.error("Error: User already exists!");
                req.flash("registerMessage", "Registration Error");
            }
            else {
                req.flash("registerMessage", "Server Error");
                res.redirect('/register');
            }
            return passport.authenticate('local')(req, res, function () {
                return res.redirect('/contact-list');
            });
        }
    });
});
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            res.end();
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('login');
        }
        req.logIn(user, function (err) {
            if (err) {
                console.error(err);
                res.end();
            }
            res.redirect('/contact-list');
        });
    })(res, req, next);
});
router.get('/logout', function (req, res, next) {
    req.logOut(function (err) {
        if (err) {
            console.error(err);
            res.end();
        }
        else {
            res.redirect('/login');
        }
    });
});
router.get('/edit/:id', AuthGuard, function (req, res, next) {
    let id = req.params.id;
    Contact.findById(id).then(function (contactToEdit) {
        res.render('index', {
            title: 'Edit Contact', page: 'edit',
            contact: contactToEdit, displayName: UserDisplayName(req)
        });
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
router.get('/delete/:id', AuthGuard, function (req, res, next) {
    let id = req.params.id;
    Contact.deleteOne({ _id: id }).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: UserDisplayName(req) });
});
router.get('/add', function (req, res, next) {
    res.render('index', { title: 'Add Contact', page: 'edit', contact: '', displayName: UserDisplayName(req) });
});
router.get('/contact-list', function (req, res, next) {
    Contact.find().then(function (data) {
        res.render('index', {
            title: 'Contact List', page: 'contact-list',
            contacts: data, displayName: UserDisplayName(req)
        });
    }).catch(function (err) {
        console.error("Encountered an Error reading from the database " + err);
        res.end();
    });
});
router.post('/edit/:id', AuthGuard, function (req, res, next) {
    let id = req.params.id;
    let updatedContact = new Contact({
        "_id": id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    Contact.updateOne({ _id: id }, updatedContact).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
router.post('/add/', AuthGuard, function (req, res, next) {
    let newContact = new Contact({
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    Contact.create(newContact).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
export default router;
//# sourceMappingURL=index.js.map