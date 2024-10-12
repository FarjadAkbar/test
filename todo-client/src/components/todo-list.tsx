"use client"
import React, { useContext } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import TodoContext from "@/context/TodoContext";
import TodoAction from "./todo-action";
import TodoFilter from "./todo-filter";
import { FilterState } from "@/types/todo";


export function TodoTable() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useContext must be used within a TodoProvider");
  }
  const { state, paginate } = context; 
  

  const handleFilterChange = ({ searchTerm, statusFilter, priorityFilter }: FilterState) => {
    // Fetch the todos based on filters
    paginate(1, searchTerm, statusFilter, priorityFilter);
  };
  
  return (
    <div className="space-y-4">
      <TodoFilter onFilterChange={handleFilterChange} />
      
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
          {state.loading ? <TableRow><TableCell colSpan={5} className="text-center">Fetching...</TableCell></TableRow>
          : state.todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className="font-medium">{todo.title}</TableCell>
              <TableCell>{format(todo.due_date, "PPP")}</TableCell>
              <TableCell>{todo.status}</TableCell>
              <TableCell>{todo.priority}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <TodoAction mode="edit" id={todo.id} todo={todo} />
                  <TodoAction mode="delete" id={todo.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      {state.currentPage > 0 && (
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
              state.currentPage < state.totalPages && (
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
