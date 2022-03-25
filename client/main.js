// const { create } = require("domain")

const goalsContainer = document.querySelector('#goals-container')
// const form = document.querySelector('form')
// const section = document.querySelector('section')

const baseURL = `http://localhost:4000/api/goals`

const goalsCallBack = ({ data: goals }) => displayGoals(goals)
const errCallBack = err => console.log(err)

const getAllGoals = () => axios.get(baseURL).then(goalsCallBack).catch(errCallBack)
const createGoal = body => axios.post(baseURL, body).then(goalsCallBack).catch(errCallBack)
const deleteGoal = id => axios.delete(`${baseURL}/${id}`).then(goalsCallBack).catch(errCallBack)
const updateGoal = (id, type) => axios.put(`${baseURL}/${id}`, { type }).then(goalsCallBack).catch(errCallBack)

function submitHandler(e) {
    e.preventDefault()

    let goal = document.querySelector('#goal')

    let bodyObj = {
        goal: goal.value
    }

    createGoal(bodyObj)
    goal.value = ''
}

function createGoalCard(goal) {
    const goalCard = document.createElement('div')
    goalCard.classList.add('goal-card')

    goalCard.innerHTML = `<p class="goal">${goal.goal}</p>
    <div class="btns-container">
        <button onclick="updateGoal(${goal.id})">update</button>
        <button onclick="deleteGoal(${goal.id})">delete</button>
    </div>
    `

    goalsContainer.appendChild(goalCard)
    // console.log('goal created')
}

function displayGoals(arr) {
    goalsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGoalCard(arr[i])
    }
}

document.addEventListener('submit', submitHandler)
// document.addEventListener('update', updateGoal)


getAllGoals()