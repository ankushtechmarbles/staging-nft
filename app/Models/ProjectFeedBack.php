<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectFeedBack extends Model
{
    use HasFactory;

    protected $fillable = [
        "investment_vote",
        "usable_vote",
        "help_vote",
        "payment_vote",
        "project_id",
        "investment_amount",
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
