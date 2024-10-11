"use client"
import TodoForm from "@/components/todo-form";
import Image from "next/image";
import { useContext, useTransition } from "react";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import TodoContext from "@/context/TodoContext";
import { Todo } from "@/types/todo";
import { TodoTable } from "@/components/todo-list";

export default function Home() {
  const context = useContext(TodoContext);
  const { toast } = useToast()

  if (!context) {
    throw new Error("useContext must be used within a TodoProvider");
  }

  const { state, addTodo, updateTodo, deleteTodo } = context;
  const [isPending, startTransition] = useTransition(); 


  const handleAsyncAction = async (action: () => Promise<void>, successMessage: string, errorMessage: string) => {
    startTransition(async () => {
      try {
        await action();
        toast({ title: "Success", description: successMessage });
      } catch (error) {
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

  const handleDeleteTodo = (id: number) => {
    handleAsyncAction(
      () => deleteTodo(id),
      "Your todo was deleted successfully.",
      "There was an error deleting your todo."
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoForm mode="add" onSubmit={handleAddTodo} />
      {
        isPending && <p className="text-gray-500">Loading...</p>
      }
      <TodoTable
        todos={state.todos}
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
      <Toaster />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
