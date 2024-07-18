const db = require('../config/db');

const addToDo = async (req, res) => {
    const {task}  = req.body; // Destructuring task from req.body

    try {
        const [data] = await db.query(`INSERT INTO TODO (task) VALUES(?)`, [task]);
        res.status(200).json({ id: data.insertId, task }) // Send back the new todo with id
        
        console.log(data);
    } catch (error) {
        res.status(500).json({
            message: "Error adding todo",
            err: error
        });
        
    }
};

const fetchToDo = async (req, res) => {
    try {
        const [data] = await db.query(`SELECT * FROM todo`);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json("Failed to fetch");
    }
};

const deleteToDo = async (req, res) => {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM todo WHERE id = ?', [id]);
      res.status(200).json({
        message: "Successfully deleted from DB!"
      });
    } catch (error) {
      res.status(500).json({
        message: `Error in db${error}`
      });
    }
  }

  const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
  
    if (!task) {
      return res.status(400).json({
        code: "error",
        message: "Task field is missing",
      });
    }
  
    try {
      const [data] = await db.query('UPDATE todo SET task = ? WHERE id = ?', [task, id]);
  
      if (data.affectedRows === 0) {
        return res.status(404).json({
          message: 'No data found',
        });
      }
  
      res.status(200).json({
        message: "Todo updated successfully",
        id,
        task
      });
    } catch (error) {
      res.status(500).json({ message: `Error updating todo: ${error.message}` });
    }
  };
  
  
module.exports = {  
    addToDo,
    fetchToDo,
    deleteToDo,
    updateTodo
};
