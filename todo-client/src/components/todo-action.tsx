"use client";
import React, { useContext, useTransition } from "react";
import TodoContext from "@/context/TodoContext";
import { useToast } from "@/hooks/use-toast";
import { Todo } from "@/types/todo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TodoForm from "./todo-form";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

// Define discriminated union for the props
interface AddModeProps {
  mode: "add";
}

interface EditModeProps {
  mode: "edit";
  id: number;
  todo: Todo; // todo is required in edit mode
}

interface DeleteModeProps {
  mode: "delete";
  id: number; // id is required in delete mode
}

// Combine the union types
type TodoActionProps = AddModeProps | EditModeProps | DeleteModeProps;

const TodoAction: React.FC<TodoActionProps> = (props) => {
  const context = useContext(TodoContext);
  const { toast } = useToast();

  if (!context) {
    throw new Error("useContext must be used within a TodoProvider");
  }

  const { addTodo, updateTodo, deleteTodo } = context;
  const [isPending, startTransition] = useTransition();

  const handleAsyncAction = async (
    action: () => Promise<void>,
    successMessage: string,
    errorMessage: string
  ) => {
    startTransition(async () => {
      try {
        await action();
        toast({ title: "Success", description: successMessage });
      } catch (error) {
        console.error(error);
        toast({ title: "Error", description: errorMessage });
      }
    });
  };

  const handleAddTodo = (newTodo: Omit<Todo, "id">) => {
    handleAsyncAction(
      () => addTodo(newTodo),
      "Your todo was added successfully.",
      "There was an error adding your todo."
    );
  };

  const handleEditTodo = (editedTodo: Todo) => {
    handleAsyncAction(
      () => updateTodo(editedTodo),
      "Your todo was updated successfully.",
      "There was an error updating your todo."
    );
  };

  const handleDeleteTodo = (todoId: number) => {
    handleAsyncAction(
      () => deleteTodo(todoId),
      "Your todo was deleted successfully.",
      "There was an error deleting your todo."
    );
  };

  if (props.mode === "add") {
    return <TodoForm mode="add" onSubmit={handleAddTodo} isLoading={isPending} />;
  }

  if (props.mode === "edit") {
    const { id, todo } = props;
    return (
      <TodoForm
        mode="edit"
        initialData={todo}
        onSubmit={(editedTodo) => handleEditTodo({ id, ...editedTodo })}
        isLoading={isPending}
      />
    );
  }

  if (props.mode === "delete") {
    const { id } = props;
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon" disabled={isPending}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the todo item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteTodo(id)} disabled={isPending}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return null;
};

export default TodoAction;
