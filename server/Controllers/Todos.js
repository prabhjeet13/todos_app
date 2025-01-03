const Todo = require('../Models/TodoSchema');

exports.addTodo = async (req,res) =>  {
    try {
        const {title , description} = req.body;

        if(!title || !description)
            {
                return res.status(404).json({
                    success: false,
                    message : 'give all details',
                })
            }

        
            const todo = await Todo.create({
                title,
                description,
            })

            
        return res.status(200).json({
            success: true,
            message : 'added done',
            todo,
        })


    }catch(e) {
        return res.status(500).json({
            success: false,
            message : 'server down',
        })
    }
}
exports.updateTodo = async (req,res) =>  {
    try {
        const {todoId,status} = req.body;

        if(!todoId || !status)
        {
            return res.status(404).json({
                success: false,
                message : 'give all details',
            })
        }

        const tododetails = await Todo.findByIdAndUpdate(
                                {_id : todoId},
                                {
                                   status : status, 
                                }, 
                                {new : true});


        
        return res.status(200).json({
                success: true,
                message : 'update done',
                tododetails,
        })                                

    }catch(e) {
        return res.status(500).json({
            success: false,
            message : 'server down',
        })
    }
}
exports.deleteTodoById = async (req,res) =>  {
    try {
        const {todoId} = req.body;

        if(!todoId)
        {
            return res.status(404).json({
                success: false,
                message : 'give all details',
            })
        }

        await Todo.findByIdAndDelete(todoId);

        return res.status(200).json({
            success: true,
            message : 'delete done',
        })


    }catch(e) {
        return res.status(500).json({
            success: false,
            message : 'server down',
        })
    }
}

exports.getAllTodos = async (req,res) =>  {
    try {

        const todos = await Todo.find({});

        return res.status(200).json({
            success: true,
            message : 'fetch all todos',
            todos,
        })

    }catch(e) {
        return res.status(500).json({
            success: false,
            message : 'server down',
        })
    }
}
exports.getTodoById = async (req,res) =>  {
    try {

        const {todoId} = req.body;

        if(!todoId)
        {
            return res.status(404).json({
                success: false,
                message : 'give all details',
            })
        }

        const todo = await Todo.findById(todoId);

        return res.status(200).json({
            success: true,
            message : 'fetch todo done',
            todo,
        })

    }catch(e) {
        return res.status(500).json({
            success: false,
            message : 'server down',
        })
    }
}
