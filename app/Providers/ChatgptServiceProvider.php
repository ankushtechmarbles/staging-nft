<?php

namespace App\Providers;

use App\Services\ChatgptService;
use Illuminate\Support\ServiceProvider;

class ChatgptServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
       // register ChatgptService
        $this->app->bind('ChatgptService', function ($app) {
            return new ChatgptService();
        });
    }
}
