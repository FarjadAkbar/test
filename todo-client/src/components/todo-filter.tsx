"use client"
import React, { useEffect, useMemo, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TodoPriority, TodoStatus } from "@/constants";
import { debounce } from 'lodash';
import { FilterState } from '@/types/todo';
import { Filter } from 'lucide-react';


interface TodoFilterProps {
    onFilterChange: (filters: FilterState) => void;
}
const TodoFilter: React.FC<TodoFilterProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // Debounce the search term to reduce API calls
  const debouncedSearch = useMemo(() => debounce(onFilterChange, 500), []);

  useEffect(() => {
    debouncedSearch({ searchTerm, statusFilter, priorityFilter });
  }, [searchTerm, statusFilter, priorityFilter]);

  return (
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
  );
}

export default TodoFilter;