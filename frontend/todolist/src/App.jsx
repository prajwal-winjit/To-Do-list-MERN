import axios from "axios";
import { useState, useEffect } from 'react';
import 'remixicon/fonts/remixicon.css'

const App = () => {
  const [todos, setTodos] = useState([]); // To store the array of todo items fetched from the backend.
  const [newTodo, setNewTodo] = useState(''); // To store the value of the input field where the user types a new todo.
  const [editingId, setEditingId] = useState(null); // To track which todo item is being edited.


  useEffect(() => {
    fetchToDo();
  }, []);

  // Function to add new todo
  const addTodo = async () => {
    if (newTodo.length === 0) {
      alert("Type something");
      return
    }
    try {
      if (editingId) {
        //update the existing todo
        const response = await axios.put(`http://localhost:3000/todo/${editingId}`, {task : newTodo});
        //again update the set todo
        const newTodo = todos.map(todo => (todo.id === editingId ? response.data : todo))
        setTodos(newTodo);
        setEditingId(null); // Reset editing mode
      }
      else {
        const response = await axios.post('http://localhost:3000/todo', { task: newTodo }); // Send task as an object
        setTodos([
          ...todos,
          response.data
        ]);


      }
      setNewTodo('');
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch todos
  const fetchToDo = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todo');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  //delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //edit todos
  const editTodo = async (id) => {
    // for setting the task in inout again on clicking edit button
    const updatedTask = todos.find((i) => i.id === id);
    setNewTodo(updatedTask.task);
    setEditingId(id)

  };

  const handleInput = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <div className="bg-[#352F5B] min-h-screen">
      <h1 className="text-center text-rose-500 font-bold text-3xl pt-10">TODO List</h1>
      <div className="pt-20 flex gap-3 justify-center">

        <input
          onChange={handleInput}
          value={newTodo} // Bind value to newTodo state
          className="w-5/12 rounded p-3"
          type="text"
          placeholder="Type something"
          name='name'
        />

        <button onClick={addTodo} className="bg-rose-600 text-white w-20 rounded-md hover:bg-rose-300">Add</button>
      </div>
      <div >

        {
          todos.length === 0
            ?
            <h1 className="text-gray-100 text-2xl font-semibold text-center mt-10">No data</h1>
            :
            <ul className=" mt-4 p-10 flex gap-2 flex-col text-white p-2">
              {
                todos.map((item, index) => (
                  <div key={index} className="flex w-4/12 bg-[#423A6F] mx-auto rounded-xl p-2">
                    <li className="flex-1 ml-2 mt-2 overflow-wrap">{item.task}</li>

                    <div>
                    
                      <button
                        onClick={() => deleteTodo(item.id)}
                        className=" text-white p-2 ml-2"
                      >
                        <div className="space-x-4">
                          <i className="ri-delete-bin-6-line text-xl  hover:text-rose-400 hover:rounded-full"></i>
                        </div>
                      </button>

                      <button
                        onClick={() => editTodo(item.id)}
                        className=" text-white p-2 ml-2"
                      >
                        <div className="space-x-4">
                          <i className="ri-pencil-line text-xl  hover:text-orange-400 hover:rounded-full"></i>
                        </div>
                      </button>
                    </div>

                  </div>
                ))
              }
            </ul>
        }


      </div>
    </div>
  );
};

export default App;
