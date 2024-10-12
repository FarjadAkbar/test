<?php

namespace App\Services;
use App\Models\Todo;

class TodoService
{
    public function getAllTodos($search = null, $status = null, $priority = null)
    {
        $query = Todo::query();

        if ($search) {
            $query->where('title', 'LIKE', "%$search%");
        }

        if ($status) {
            $query->where('status', $status);
        }

        if ($priority) {
            $query->where('priority', $priority);
        }

        return $query->orderBy('id', 'desc')->paginate(10); // Example for pagination
    }


    public function createTodo(array $data)
    {
        return Todo::create($data);
    }

    public function updateTodo(Todo $todo, array $data)
    {
        $todo->update($data);
        return $todo;
    }

    public function deleteTodo(Todo $todo)
    {
        return $todo->delete();
    }
}
