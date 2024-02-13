<?php

namespace App\Providers;

use App\Services\RpmService;
use Illuminate\Support\ServiceProvider;

class RpmServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // register RpmService
        $this->app->bind('RpmService', function ($app) {
            return new RpmService();
        });
    }
}
