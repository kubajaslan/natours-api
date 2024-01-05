const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'succes',
    results: tours.length,
    data: {
      tours: tours, //es6 = no need to specify same names of keys and values
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  const tour = tours.find((el) => {
    return el.id === id;
  });

  res.status(200).json({
    status: 'succes',
    data: {
      tour: tour, //es6 = no need to specify same names of keys and values
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

const port = 3000;
app.listen(port, () => {
  console.log('app running on port ' + port);
});

