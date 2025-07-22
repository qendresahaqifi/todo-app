import React, { useEffect, useRef, useState } from 'react';
import TodoItems from './TodoItems';
import AppTheme from '../layout/AppTheme';
import { ClipboardDocumentListIcon  } from '@heroicons/react/24/solid';


const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    const [filter, setFilter] = useState("all");

    const [sortOrder, setSortOrder] = useState("newest");

    const filteredTodos = todoList.filter((todo) => {
        if (filter === "active") return !todo.isComplete;
        if (filter === "completed") return todo.isComplete;
            return true;
    });

    const sortedTodos = [...filteredTodos].sort((a, b) => {
        const aTime = new Date(a.timestamp).getTime();
        const bTime = new Date(b.timestamp).getTime();
        return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
    })

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
        
        if (inputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
            isEditing: false,
            timestamp: new Date().toISOString(),
        }
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    }; 

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
           return prevTodos.filter((todo) => todo.id !== id )
        })
    };

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if(todo.id === id) {
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    };

    const editTodo = (id, newText) => {
        setTodoList((prev) =>
            prev.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

  return (

    <div className='bg-white dark:bg-stone-800 dark:text-stone-200 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

        
       {/* ------ dark mode ------ */}

        <AppTheme />

        
        {/* ------ title ------ */} 

        <div className='flex items-center mt-7 gap-2'>
            <ClipboardDocumentListIcon className='w-8 h-8' />
            <h1 className='text-3xl font-semibold'>To-Do List</h1> 
        </div>


        {/* ------ input box ------ */}

        <div className='flex items-center my-7 bg-stone-200 dark:bg-stone-700 rounded-full dark:rounded-full '>
            <input ref={inputRef} className='bg-transparent dark:bg-stone-700 dark:text-stone-200 border-0 outline-none rounded-full flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600 dark:placeholder:text-stone-200' type="text" placeholder='Add your task' />
            <button onClick={add} className='transition-color duration-300 border-none rounded-full bg-green-700 hover:bg-green-600 dark:bg-green-900 dark:hover:bg-green-800 w-32 h-14 text-stone-200 text-lg font-medium cursor-pointer'>ADD</button>
        </div>


        {/* ------ all, active, completed  buttons */}

        <div className="flex justify-center gap-3 mb-4">
            <button
                onClick={() => setFilter("all")}
                className={`transition-colors duration-300 px-4 py-1 rounded-full border-none cursor-pointer ${
                filter === "all" ? "bg-green-700 hover:bg-green-600 dark:bg-green-900 dark:hover:bg-green-800 text-stone-200" : "bg-stone-200 hover:bg-stone-100 dark:bg-stone-600 dark:hover:bg-stone-500 text-stone-700 dark:text-stone-200"
                }`}
            >
            All
            </button>
            <button
                onClick={() => setFilter("active")}
                className={`transition-colors duration-300 px-4 py-1 rounded-full border-none cursor-pointer ${
                filter === "active" ? "bg-green-700 hover:bg-green-600 dark:bg-green-900 dark:hover:bg-green-800 text-stone-200" : "bg-stone-200 hover:bg-stone-100 dark:bg-stone-600 dark:hover:bg-stone-500 text-stone-700 dark:text-stone-200"
                }`}
            >
            Active
            </button>
            <button
                onClick={() => setFilter("completed")}
                className={`transition-colors duration-300 px-4 py-1 rounded-full border: none cursor-pointer ${
                filter === "completed" ? "bg-green-700 hover:bg-green-600 dark:bg-green-900 dark:hover:bg-green-800 text-stone-200" : "bg-stone-200 hover:bg-stone-100 dark:bg-stone-600 dark:hover:bg-stone-500 text-stone-700 dark:text-stone-200"
                }`}
            >
            Completed
            </button>
        </div>

        {/* ------ sorting ------*/}

        <div className='flex justify-center mb-4'>
            <button
                onClick={() => {
                    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
                }}
                className='transition-colors duration-300 px-4 py-1 rounded-full border-none cursor-pointer bg-green-700 hover:bg-green-600 text-stone-200 dark:bg-green-900 dark:hover:bg-green-800'
            >
                Sort: {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </button>

        </div>


        {/* ------ todo list ------ */}

        <div className=''>
            {sortedTodos.map((item, index) => {
                return (
                    <TodoItems
                        key={index}
                        text={item.text}
                        id={item.id}
                        isComplete={item.isComplete}
                        deleteTodo={deleteTodo}
                        toggle={toggle}
                        editTodo={editTodo}
                        timestamp={item.timestamp}
                    />
                );
            })}

        </div>

    </div>
  )
}

export default Todo