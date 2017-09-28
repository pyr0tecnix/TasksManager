let task = {'id': 0, 'name': 'Hello world', 'status': 2, 'due_date': Date.now()};

var apiRouter = (api) => {
  api.get('/tasks', (req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).send(JSON.stringify(task));
  });
}

module.exports = apiRouter;
