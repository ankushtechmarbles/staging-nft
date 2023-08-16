<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

// Used for Paper integration
class AuthController extends Controller
{
    /**
     * Create User
     * @param Request $request
     * @return User
     */
    public function register(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required',
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = null;

            // if ($request['paper_token']) {
            //     $response = Http::withHeaders(["Authorization" => "Bearer 8d0eb4e6-5629-45cb-9370-7fab67f0f911", "Content-Type" => "application/json"])
            //         ->post('https://paper.xyz/api/v1/oauth/token', ['code' => $request['paper_token'], 'clientId' => 'b33ddc7e-5f90-4861-b119-ba9dd02b44b3']);

            //     $user = User::create([
            //         'name' => $request->name,
            //         'email' => $request->email,
            //         'password' => Hash::make($request->password),
            //         'paper_token' => $response['userToken'],
            //         'paper_wallet_address' => $request['wallet_address'],
            //         'role' => 'member',
            //     ]);
            // } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'credits' => 10,
                'role' => 'member',
            ]);
            // }


            $userInfo = ['name' => $user['name'], 'email' => $user['email'], 'white_listed' => $user['white_listed'], 'role' => $user['role'], 'total_buy_models' => $user['total_buy_models'], 'paper_wallet_address' => $user['paper_wallet_address'], 'credits' => $user['credits']];

            return response()->json([
                'message' => 'User Created Successfully',
                'token' => $user->createToken("API_TOKEN")->plainTextToken,
                'user' => $userInfo,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }


    /**
     * Login User by Paper Token
     * @param Request $request
     * @return User
     */
    public function loginWithPaper(Request $request)
    {

        try {
            //Validated
            $validateUser = Validator::make(
                $request->all(),
                [
                    "code" => 'string|required',
                ]
            );


            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $response = Http::withHeaders(["Authorization" => "Bearer 8d0eb4e6-5629-45cb-9370-7fab67f0f911", "Content-Type" => "application/json"])
                ->post('https://paper.xyz/api/v1/oauth/token', ['code' => $request['code'], 'clientId' => 'b33ddc7e-5f90-4861-b119-ba9dd02b44b3']);


            // Get user with correct paper token tied to account
            $user = User::where('paper_token', $response['userToken'])->first();

            // Check for user
            if (!$user) {
                return response([
                    'message' => 'Bad credentials',
                    'user' => $user
                ], 401);
            }

            // create accessToken
            auth()->login($user);

            $userInfo = ['name' => $user['name'], 'email' => $user['email'], 'white_listed' => $user['white_listed'], 'role' => $user['role'], 'total_buy_models' => $user['total_buy_models'], 'paper_wallet_address' => $user['paper_wallet_address']];


            return response()->json([
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken('API_TOKEN')->plainTextToken,
                'user' => $userInfo,
            ], 200);

            return response($response, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login User by Paper Token
     * @param Request $request
     * @return User
     */
    public function connectPaperWallet(Request $request)
    {

        try {
            //Validated
            $validateUser = Validator::make(
                $request->all(),
                [
                    "code" => 'string|required',
                ]
            );


            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $userID = auth()->user()->id;

            $response = Http::withHeaders(["Authorization" => "Bearer 8d0eb4e6-5629-45cb-9370-7fab67f0f911", "Content-Type" => "application/json"])
                ->post('https://paper.xyz/api/v1/oauth/token', ['code' => $request['code'], 'clientId' => 'b33ddc7e-5f90-4861-b119-ba9dd02b44b3']);

            $userDetails = Http::withHeaders(["Authorization" => "Bearer 8d0eb4e6-5629-45cb-9370-7fab67f0f911", "Content-Type" => "application/json"])
                ->post('https://paper.xyz/api/v1/oauth/user-details', ['userToken' => $response['userToken'], 'clientId' => 'b33ddc7e-5f90-4861-b119-ba9dd02b44b3']);

            // Get user with correct paper token tied to account
            $user = User::where('id', $userID)->first();
            $result = $user->update(["paper_wallet_address" => $userDetails['walletAddress'], 'paper_token' => $response['userToken']]);
            $updatedUser = $user->refresh();

            // Check for user
            if (!$user) {
                return response([
                    'message' => 'Bad credentials',
                    'user' => $user
                ], 401);
            }

            $userInfo = ['name' => $updatedUser['name'], 'email' => $updatedUser['email'], 'white_listed' => $updatedUser['white_listed'], 'role' => $updatedUser['role'], 'total_buy_models' => $updatedUser['total_buy_models'], 'paper_wallet_address' => $updatedUser['paper_wallet_address']];

            return response()->json([
                'message' => 'Wallet Connected',
                'user' => $userInfo,
            ], 200);

            return response($response, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Logout user with email/password
     * @param Request $request
     * @return User
     */
    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation failed, check email and password',
                ], 401);
            }

            $user = Auth::user();

            $userInfo = ['name' => $user['name'], 'email' => $user['email'], 'white_listed' => $user['white_listed'], 'role' => $user['role'], 'total_buy_models' => $user['total_buy_models'], 'paper_wallet_address' => $user['paper_wallet_address'], 'credits' => $user['credits']];


            return response()->json([
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken('API_TOKEN')->plainTextToken,
                'user' => $userInfo
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    /**
     * Logout user
     * @param Request $request
     * @return json
     */
    public function logout(Request $request)
    {
        try {
            auth()->user()->tokens()->delete();

            return response()->json([
                'message' => "Successfully Logged Out"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
