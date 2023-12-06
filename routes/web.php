<?php

use App\Http\Controllers\AiGenerationController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeanCanvasController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
//use App\Http\Livewire\CourseStudyController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseStudyController;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('cc', function () {
    \Artisan::call('config:cache');
    \Artisan::call('cache:clear');
    \Artisan::call('config:clear');
    \Artisan::call('view:clear');
    dd("All cache cleared successfully.");
});

Route::get('/helix/', function() {
   return view ('helix.index');
});

Route::get('/helix/configurator', function() {
   return view ('helix.index');
});

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/painter', function() {
   return view ('reactPainterDemo');
});

 Route::get('/f', function () {
     return view('front-page');
 });

// Misc. Routes
Route::get('/about', function () {
    return view('about');
})->name('about');

Route::get('/privacy-policy', function () {
    return view('privacy-policy');
})->name('privacy-policy');

Route::get('/terms', function () {
    return view('terms');
})->name('terms');

// Project routes
Route::get('project/{project:slug}', [ProjectController::class, 'show']);

// Marketplace Routes
Route::get('marketplace', [MarketplaceController::class, 'index'])->name('marketplace');
Route::get('marketplace/{project:slug}', [MarketplaceController::class, 'show']);

// Showcase routes
Route::get('/showcase', function () {
    return view('showcase');
})->name('showcase');

// Leaderboard routes
Route::get('/leaderboard', function () {
    return view('leaderboard');
})->name('leaderboard');

Route::get('/contact', function () {
    return view('contact');
})->name('contact');

// Courses Routes
Route::get('/courses/', [CourseController::class, 'index'])->name('course.index');
Route::get('/courses/{course}', [CourseController::class, 'show'])->name('course.show');

Route::get('/course-multichoice', function () {
    return view('course.course-multichoice');
});
Route::get('/course-multichoice-2', function () {
    return view('course.course-multichoice-2');
});

/* Login & Registrasion Route */
Auth::routes(['register' => false, 'verify' => true]);

Route::get('/auth/login', function () {
//    return view('reactApp');
    return view('/auth/login-v2');
})->name('auth');

Route::post('/auth/login', [LoginController::class, 'login'])->name('login');
Route::post('/auth/logout', [AuthController::class, 'logout'])->name('logout');
Route::post('/auth/register', [RegisterController::class, 'register'])->name('register');

Route::get('/auth/register', function () {
    return view('/auth/register-v2');
//    return view('reactApp');
})->name('register');


// Socialite
Route::get('login/{provider}', [SocialController::class, 'redirect']);
Route::get('login/{provider}/callback',[SocialController::class, 'callback']);


// user
Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');

/*admin side*/
Route::get('/admin/login', [LoginController::class, 'showLoginForm'])->name('admin-login');

Route::get('/admin', function () {
    if (auth()->check()) {
        return redirect('/admin/dashboard');
    } else {
        return view('admin.login');
    }
});

// Old / React End points
Route::get('/marketplace', function () {
    return view('marketplace.index');
//    return view('reactApp');
});

Route::get('/play', function () {
    return view('reactApp');
});

Route::get('/user', function () {
    return view('reactApp');
});

Route::get('/idea', function () {
    return view('reactApp');
});

Route::get('/create', function () {
    return view('reactApp');
});

Route::get('/humanity', function () {
    return view('reactApp');
});

Route::get('/profile', function () {
    return view('reactApp');
});


Route::get('/canvas', [LeanCanvasController::class, 'index']);

// React onboarding
Route::view('/react/{path?}', 'app')->where('path', '.*');
