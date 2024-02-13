<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\RpmService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create User
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RpmService $rpmService, Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            //Validated
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required',
                    'password_confirmation' => 'required|same:password',
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $rpmData = $rpmService->createAnonUser();

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'credits' => 10,
                'role' => 'member',
                'rpm_user_id' => $rpmData['id'],
                'rpm_user_token' => $rpmData['token'],
                'rpm_avatar_id' => $rpmData['avatarId'],
                'rpm_image_url' => $rpmData['imageUrl'],
                'rpm_assets' => json_encode($rpmData['assets']),
                'rpm_body_type' => $rpmData['bodyType'],
                'rpm_glb_file' => $rpmData['glbFile'],
            ]);

            $userInfo = [
                'name' => $user['name'],
                'email' => $user['email'],
                'rpm_user_id' => $user['rpm_user_id'],
                'rpm_user_token' => $user['rpm_user_token'],
                'rpm_avatar_id' => $user['rpm_avatar_id'],
                'rpm_image_url' => $user['rpm_image_url'],
                'rpm_assets' => $user['rpm_assets'],
                'rpm_body_type' => $user['rpm_body_type'],
                'rpm_glb_file' => $user['rpm_glb_file'],
            ];

            Auth::login($user);

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
     * Logout user with email/password
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
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

            // log user into sanctum
            Auth::login($user);

            $userInfo = [
                'name' => $user['name'],
                'email' => $user['email'],
                'rpm_user_id' => $user['rpm_user_id'],
                'rpm_user_token' => $user['rpm_user_token'],
                'rpm_avatar_id' => $user['rpm_avatar_id'],
                'rpm_image_url' => $user['rpm_image_url'],
                'rpm_assets' => $user['rpm_assets'],
                'rpm_body_type' => $user['rpm_body_type'],
                'rpm_glb_file' => $user['rpm_glb_file'],
            ];

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
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout(Request $request)
    {
        try {
            // logout user
            auth()->user()->tokens()->delete();

            return response()->json([
                'message' => "User Logged Out"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
