import { Todo } from "@/types/todo";

const API_URL = `${process.env.NEXT_PUBLIC_API}/api/todos`;

// Fetch all todos
export const getTodosQuery = async (page: number = 1, search?: string, status?: string, priority?: string) => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append('search', search);
    if (status) queryParams.append('status', status);
    if (priority) queryParams.append('priority', priority);
  
    const response = await fetch(`${API_URL}?page=${page}&${queryParams.toString()}`);
    const data = await response.json();
    return data; // Ensure this returns both `todos` and pagination metadata
};
  
// Create a new todo
export const createTodoMutate = async (todo: Omit<Todo, 'id'>) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    const data = await response.json();
    return data.data;
};

// Update an existing todo
export const updateTodoMutate = async (id: number, updatedTodo: Partial<Todo>) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
    });
    const data = await response.json();
    return data.data;
};

// Delete a todo
export const deleteTodoMutate = async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data.data;
};