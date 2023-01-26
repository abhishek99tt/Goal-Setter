const asyncHandler = require('express-async-handler')

// @desc        GET Goals
// @route       GET /api/goals
// @access      Private
const getGoals = asyncHandler(async(req,res) => {
    res.status(200).json({ message: 'Get Goals'})
})

// @desc        SET Goal
// @route       POSt /api/goal
// @access      Private
const setGoal = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text')
    }
    res.status(200).json({ message: 'Set Goal'})
})

// @desc        UPDATE Goal
// @route       PUT /api/goal
// @access      Private
const updateGoal = asyncHandler(async(req,res) => {
    res.status(200).json({ message: `Update Goal ${req.params.id}`})
})

// @desc        DELETE Goal
// @route       DELETE /api/goal
// @access      Private
const deleteGoal = asyncHandler(async(req,res) => {
    res.status(200).json({ message: `Delete Goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}