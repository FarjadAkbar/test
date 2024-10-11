"use client";
import React, { createContext, useReducer, useEffect } from 'react';
import { TodoAction, TodoContextType, TodoProviderProps, TodoState, Todo } from '@/types/todo';
import { createTodoMutate, deleteTodoMutate, getTodosQuery, updateTodoMutate } from "@/service/todo";

// Initialize the default state
const initialState: TodoState = {
  todos: [],
  currentPage: 1,   // Default to page 1
  totalPages: 0,
};

// Create the reducer function with strong typing
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload, totalPages: action.totalPages, currentPage: action.currentPage };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== Number(action.payload)),
      };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

// Create the context with the correct type
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Create the provider component
export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Fetch todos from API on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodosQuery();
      console.log(data, "/.////")
      dispatch({ type: 'SET_TODOS', payload: data.data, totalPages: data.meta.total, currentPage: data.meta.current_page });
    };
    
    fetchTodos();
  }, []);

  // Function to add a new todo
  const addTodo = async (newTodo: Omit<Todo, 'id'>) => {
    const addedTodo = await createTodoMutate(newTodo);
    dispatch({ type: 'ADD_TODO', payload: addedTodo });
  };

  // Function to update a todo
  const updateTodo = async (updatedTodo: Todo) => {
    const newTodo = await updateTodoMutate(updatedTodo.id, updatedTodo);
    dispatch({ type: 'UPDATE_TODO', payload: newTodo });
  };

  // Function to delete a todo
  const deleteTodo = async (id: number) => {
    await deleteTodoMutate(id);
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const paginate = async (page: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    const data = await getTodosQuery(page); // Fetch new page data
    dispatch({ type: 'SET_TODOS', payload: data.data, totalPages: data.meta.total, currentPage: data.meta.current_page });
  };

  return (
    <TodoContext.Provider value={{ state, addTodo, updateTodo, deleteTodo, paginate }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
