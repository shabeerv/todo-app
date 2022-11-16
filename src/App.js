import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import TodosList from './components/TodosList';

function App() {

  // const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])
  const [editTodo, setEditTodo] = useState(null)

  return (
    <div className="todo-app">
      <h1>What's the plan for today?</h1>
      <Form
        // input={input}
        // setInput={setInput}
        todos={todos}
        setTodos={setTodos}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
      <div>
        <TodosList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} />
      </div>
    </div>
  );
}

export default App;
