<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode as Middleware;
use Illuminate\Contracts\Foundation\Application;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Auth;

class CheckForMaintenanceMode extends Middleware
{
    public function handle($request, Closure $next)
    {
    	//dd(!!! auth()->check());
		if ($this->app->isDownForMaintenance() && !$this->isBackendRequest($request) ) {
        	try {
                throw new HttpException(503);
            } catch (HttpException $e) {
                if($e->getStatusCode() === 503)
                {
                   	return response(view('errors.under-construction'), 503);
                }
            }
        }

        return $next($request);
    }

    private function isBackendRequest($request)
    {
    	return $request->is('login') || $request->is('register')  || $request->is('early-bird-test') || $request->is('logout') || $request->is('member/*') || $request->is('admin/*') || $request->is('public/*') || $request->is('assets/*') ||  $request->is('early-bird/a')  || $request->is('early-bird/b') || $request->is('early-bird') || $request->is('email/*') || $request->is('password/*') || $request->is('beta') || $request->is('privacy-policy') || $request->is('terms-and-conditions') || $request->is('demo_staging/*') || $request->is('cela-mall') || $request->is('home-page') || $request->is('get/*') || $request->is('uploads/*') || $request->is('/dashboard-mockup/*') || $request->is('new/*') || $request->is('plans-pricing') || $request->is('cela-mall/*') ;


        /* ||  $request->is('cart') ||  $request->is('checkout') ||  $request->is('enterprise');*/

        
    }
}