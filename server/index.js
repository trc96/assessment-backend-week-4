const express = require("express");
const cors = require("cors");

const app = express();

let goals = [];
let globalID = 1

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get('/api/fortune', (req, res) => {
  const fortunes = ['You will pass this assessment!',
           'A recent financial venture will render great results!',
           'ERR: 777, you are luckier than you think!'
];

  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);

});

app.get('/api/goals', (req, res) => {
  const goals = [];

  res.status(200).send(goals)
})

app.delete('/api/goals/:id', (req, res) => {
  let index = goals.findIndex(goal => goal.id === +req.params.id)
  goals.splice(index, 1)
  res.status(200).send(goals)
});

app.post('/api/goals', (req, res) => {
  let { goal } = req.body
  let newGoal = {
    id: globalID,
    goal
  }

  goals.push(newGoal)
  res.status(200).send(goals)
  globalID ++
});

app.put('/api/goals/:id', (req, res) => {
  let { id } = req.params;
  let { type } = req.body;

  let index = goals.findIndex(goal => goal.id === +id)

  if (goals[index] === 0 && type === 'udpate') {
    goal[index].goal += "Completed!"
  } else if (type === 'update') {
    goals[index].goal += "Completed!"
  } else {
    res.status(400)
  }
})


app.listen(4000, () => console.log("Server running on 4000"));
