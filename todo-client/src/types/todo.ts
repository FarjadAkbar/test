import { TodoPriority, TodoStatus } from "@/constants";
import { Dispatch, ReactNode } from "react";

// Define the structure of a Todo item
export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  due_date: Date;
  completed_at?: Date | null;
}

// Define the structure of the state
export interface TodoState {
  todos: Todo[];
  currentPage: number;
  totalPages: number;
}

// Define the types of actions that can be dispatched
export type TodoAction =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_CURRENT_PAGE'; payload: number };

// Define the shape of the context
export interface TodoContextType {
  state: TodoState;
  addTodo: (newTodo: Omit<Todo, 'id'>) => Promise<void>;
  updateTodo: (updatedTodo: Todo) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  paginate: (page: number) => Promise<void>;
}

export interface TodoProviderProps {
  children: ReactNode;
}