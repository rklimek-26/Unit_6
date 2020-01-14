const express = require('express');
const router = express.Router();
const data = require('../data.json');
const { projects } = data;

router.get("/projects/:id", (req, res, next) => {
    const projectID = req.params.id;
    const project = projects.find(({ id }) => id === +projectID);

    if (project) {
        res.render("project", { project })
    } else {

        const err = new Error('Page Not Found');
        err.status = 404;
        next(err);
    }

});

module.exports = router;
