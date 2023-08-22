<?php

use App\Http\Controllers\AiGenerationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UnityController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\MintedNftsController;
use App\Http\Controllers\ProjectScoreController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth routes
// Route::post("/paper/login", [AuthController::class, 'loginWithPaper']);
Route::post("/login", [AuthController::class, 'loginUser']);
Route::post("/register", [AuthController::class, 'register']);

// Mint painter
Route::post("/mintNft", [MintedNftsController::class, 'signature']);

// Text to Image Routes
Route::post('/nfts/textToImage', [MintedNftsController::class, 'generateTextToImage']);
Route::post('/nfts/share/discord', [MintedNftsController::class, 'discordShare']);

Route::post('/project/create', [ProjectController::class, 'create']);
// Unity routes
Route::get('/unity', [UnityController::class, 'index']);
Route::post('/unity', [UnityController::class, 'store']);
Route::post('/unity/auth', [UnityController::class, 'login']);

// AI Generation Routes
Route::post('/ai/create/tshirt', [AiGenerationController::class, 'generateTshirtTexture']);

Route::middleware('auth:sanctum')->group(function () {
    // Minted nfts routes
    Route::post('/nfts', [MintedNftsController::class, 'storeNFT']);
    Route::post('/nfts/draft', [MintedNftsController::class, 'saveDraft']);

    // get NFTS and Drafts for profile
    Route::get('/nfts', [MintedNftsController::class, 'showNftsAndDrafts']);

    // Post VOTE for project
    Route::post('/project/vote/{id}', [ProjectScoreController::class, 'vote']);

    // Auth routes
    Route::post("/paper/connect", [AuthController::class, 'connectPaperWallet']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
