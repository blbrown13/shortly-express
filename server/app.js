const express = require('express');
const path = require('path');
const utils = require('./lib/hashUtils');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const Auth = require('./middleware/auth');
const models = require('./models');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from ../public directory
app.use(express.static(path.join(__dirname, '../public')));

app.use(require('./middleware/cookieParser'));
app.use(Auth.createSession);

app.get('/', Auth.verifySession, (req, res) => {
  res.render('index');
});

app.get('/create', Auth.verifySession, (req, res) => {
  res.render('index');
});

app.get('/links', Auth.verifySession, (req, res, next) => {
  models.Links.getAll()
    .then(links => {
      res.status(200).send(links);
    })
    .error(error => {
      res.status(500).send(error);
    });
});

app.post('/links', Auth.verifySession, (req, res, next) => {
  var url = req.body.url;
  if (!models.Links.isValidUrl(url)) {
    // send back a 404 if link is not valid
    return res.sendStatus(404);
  }

  return models.Links.get({ url })
    .then(link => {
      if (link) {
        throw link;
      }
      return models.Links.getUrlTitle(url);
    })
    .then(title => {
      return models.Links.create({
        url: url,
        title: title,
        baseUrl: req.headers.origin
      });
    })
    .then(results => {
      return models.Links.get({ id: results.insertId });
    })
    .then(link => {
      throw link;
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(link => {
      res.status(200).send(link);
    });
});

/************************************************************/
// Write your authentication routes here
/************************************************************/

// code added after reviewing solution code


app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  return models.Users.get({ username })
    .then(user => {

      if (!user || !models.Users.compare(password, user.password, user.salt)) {
        // user doesn't exist or the password doesn't match
        throw new Error('Username and password do not match');
      }

      return models.Sessions.update({ hash: req.session.hash }, { user_id: user.id });
    })
    .then(() => {
      res.redirect('/');
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(() => {
      res.redirect('/login');
    });
});

app.get('/logout', (req, res, next) => {

  return models.Sessions.delete({ hash: req.cookies.shortlyid })
    .then(() => {
      res.clearCookie('shortlyid');
      res.redirect('/login');
    })
    .error(error => {
      res.status(500).send(error);
    });
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  return models.Users.get({ username })
    .then(user => {
      if (user) {
        // user already exists; throw user to catch and redirect
        throw user;
      }

      return models.Users.create({ username, password });
    })
    .then(results => {
      return models.Sessions.update({ hash: req.session.hash }, { user_id: results.insertId });
    })
    .then(() => {
      res.redirect('/');
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(user => {
      res.redirect('/signup');
    });
});

/************************************************************/
// Handle the code parameter route last - if all other routes fail
// assume the route is a short code and try and handle it here.
// If the short-code doesn't exist, send the user to '/'
/************************************************************/

app.get('/:code', (req, res, next) => {

  return models.Links.get({ code: req.params.code })
    .tap(link => {

      if (!link) {
        throw new Error('Link does not exist');
      }
      return models.Clicks.create({ linkId: link.id });
    })
    .tap(link => {
      return models.Links.update(link, { visits: link.visits + 1 });
    })
    .then(({ url }) => {
      res.redirect(url);
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(() => {
      res.redirect('/');
    });
});

module.exports = app;



/************************************************************/
// Prior to solution code review
/************************************************************/

// app.get('/signup', (req, res, next) => {
//   res.render('signup');
// });
//
// app.post('/signup',
// (req, res, next) => {
//   models.Users.get({ username: req.body.username })
//   .then(user => {
//     if (user) {
//       throw user;
//     }
//   })
//   .then( () => {
//     var hashedPassword = models.Users.hashPassword(req.body.password);
//     models.Users.create({
//       username: req.body.username,
//       password: hashedPassword
//     });
//     res.redirect('/');
//   })
//   .catch(user => {
//     res.redirect('/signup');
//   });
// });
//
// app.get('/login',
// (req, res) => {
//   res.render('login.ejs');
// });
//
// app.post('/login',
// (req, res, next) => {
//   models.Users.get({ username: req.body.username})
//   .then(user => {
//     console.log(user);
//     if (!user) { throw user; }
//   })
//   .then( () => {
//     // var thisHashed = validateUserPassword(req.body.username, req.body.password);
//     // console.log('app post login: ', thisHashed);
//
//     // hash current password
//     // check if hashed pw = existing pw for user
//
//     // if (req.body.password === ) {
//       res.redirect('/');
//     // }
//
//   //   var hashedPassword = models.Users.hashPassword(req.body.password);
//   //   models.Users.create({
//   //     username: req.body.username,
//   //     password: hashedPassword
//   //   });
//   //   res.redirect('/');
//   })
//   // .error(error => {
//   //   res.status(500).send(error);
//   // })
//   .catch(user => {
//     res.redirect('/login');
//   });
// });
