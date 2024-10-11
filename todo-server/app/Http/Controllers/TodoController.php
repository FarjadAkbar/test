<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Services\TodoService;
use App\Http\Resources\TodoResource;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    protected $todoService;

    public function __construct(TodoService $todoService)
    {
        $this->todoService = $todoService;
    }

    public function index()
    {
        return TodoResource::collection($this->todoService->getAllTodos());
    }

    public function store(Request $request)
    {
        $todo = $this->todoService->createTodo($request->all());
        return new TodoResource($todo);
    }

    public function update(Request $request, Todo $todo)
    {
        $todo = $this->todoService->updateTodo($todo, $request->all());
        return new TodoResource($todo);
    }

    public function destroy(Todo $todo)
    {
        $this->todoService->deleteTodo($todo);
        return response()->json([
            'message' => 'Todo deleted successfully.'
        ], 200);
    }
}
