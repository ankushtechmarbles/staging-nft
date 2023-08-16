<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectType extends Model
{
    use HasFactory;

    protected $table='project_types'; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'project_type_name'
    ]; 
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function projects() {
        return $this->hasMany(Project::class);
    } 
}