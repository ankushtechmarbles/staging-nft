<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectTrack extends Model
{
    use HasFactory;

    protected $table='project_tracks'; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'project_track_name',
    ]; 
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function projects() {
        return $this->hasMany(Project::class);
    } 
}
