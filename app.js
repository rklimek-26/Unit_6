//add variables to require dependencies
const express = require('express');
const app = express();
const data = require('./data.json');
const {projects} = data;

//set view engine to pug
app.set('view engine', 'pug');

//serve the static files located in the public folder
app.use('/static/', express.static('public'));
app.use('/static/', express.static('img'));

//set routes
const indexRouter = require('./routes');
const aboutRouter = require('./routes/about');
const projectRouter = require('./routes/project');

app.use(indexRouter);
app.use(aboutRouter);
app.use(projectRouter);


//error handeling
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err
    res.status(err.status);
    console.log(err.message, err.status, err.stack);
    res.render('error')
});

//set up server for http://localhost:3000/
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
