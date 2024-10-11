<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Todo extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'status', 'priority', 'due_date', 'completed_at'];


    // Mutator to modify the due_date before saving
    public function setDueDateAttribute($value)
    {
        // Ensure the due_date is stored in 'Y-m-d H:i:s' format
        $this->attributes['due_date'] = Carbon::parse($value)->format('Y-m-d H:i:s');
    }

    // Event listener for creating or updating
    protected static function booted()
    {
        static::creating(function ($todo) {
            // Perform any other modifications before creating the record
            if (isset($todo->due_date)) {
                $todo->due_date = Carbon::parse($todo->due_date)->format('Y-m-d H:i:s');
            }
        });

        static::updating(function ($todo) {
            // Modify due_date or other fields before updating the record
            if (isset($todo->due_date)) {
                $todo->due_date = Carbon::parse($todo->due_date)->format('Y-m-d H:i:s');
            }
        });
    }
}
