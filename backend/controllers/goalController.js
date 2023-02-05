const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc        GET Goals
// @route       GET /api/goals
// @access      Private
const getGoals = asyncHandler(async(req,res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

// @desc        SET Goal
// @route       POSt /api/goals
// @access      Private
const setGoal = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

// @desc        UPDATE Goal
// @route       PUT /api/goal
// @access      Private
const updateGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not Authorized')
    }


    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
})

// @desc        DELETE Goal
// @route       DELETE /api/goal
// @access      Private
const deleteGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    } 


        // Check for user
        if(!req.user) {
            res.status(401)
            throw new Error('User not found')
        }
    
        // Make sure the logged in user matches the goal user
        if(goal.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not Authorized')
        }

     await goal.remove()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}