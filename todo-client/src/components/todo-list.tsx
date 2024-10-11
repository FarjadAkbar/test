import React, { useState, useMemo, useContext } from "react";
import { format } from "date-fns";
import { Search, Filter, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { TodoTableProps } from "@/types/todo";
import TodoForm from "./todo-form";
import { TodoPriority, TodoStatus } from "@/constants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import TodoContext from "@/context/TodoContext";



export function TodoTable({
  todos,
  handleEditTodo,
  handleDeleteTodo,
}: TodoTableProps) {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useContext must be used within a TodoProvider");
  }

  const { state, paginate } = context; 
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filteredTodos = useMemo(() => {
    if (searchTerm === "" && statusFilter === "All" && priorityFilter === "All") {
      return todos;
    }
    
    return todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "All" || todo.status === statusFilter) &&
        (priorityFilter === "All" || todo.priority === priorityFilter)
    );
  }, [todos, searchTerm, statusFilter, priorityFilter]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status <Filter className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.values(TodoStatus).map((status) => (
              <DropdownMenuItem
                key={status}
                onSelect={() => setStatusFilter(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Priority <Filter className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.values(TodoPriority).map((priority) => (
              <DropdownMenuItem
                key={priority}
                onSelect={() => setPriorityFilter(priority)}
              >
                {priority}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableCaption>A list of your todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTodos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className="font-medium">{todo.title}</TableCell>
              <TableCell>{format(todo.due_date, "PPP")}</TableCell>
              <TableCell>{todo.status}</TableCell>
              <TableCell>{todo.priority}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <TodoForm
                    mode="edit"
                    initialData={todo}
                    onSubmit={(editedTodo) =>
                      handleEditTodo({ id: todo.id, ...editedTodo })
                    }
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the todo item.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {state.currentPage > 1 && state.currentPage < state.totalPages && (
        <Pagination>
          <PaginationContent>
            {
              state.currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => paginate(state.currentPage - 1)} />
                </PaginationItem>
              )
            }
            {[...Array(state.totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => paginate(i + 1)}
                  isActive={state.currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {
              state.currentPage < state.totalPages - 1 && (
                <PaginationItem>
                  <PaginationNext onClick={() => paginate(state.currentPage + 1)} />
                </PaginationItem>
              )
            }
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
