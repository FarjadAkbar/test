<?php

namespace App\Services;
use App\Models\Todo;

class TodoService
{
    public function getAllTodos()
    {
        return Todo::paginate(10);
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
