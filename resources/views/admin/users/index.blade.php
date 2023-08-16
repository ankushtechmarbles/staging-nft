@extends('layouts.admin.master')
@section('title'){!! !$isDeleted ? 'Active' : 'Deleted' !!} {{ __('User List') }}@endsection
@section('content')
@php
    $user_accesses = json_decode(Auth::user()->user_accesses,true);
@endphp
<div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-2 text-gray-800">{!! !$isDeleted ? 'Active' : 'Deleted' !!} {{ __('User List') }}</h1>
        <form action="{!! url()->current() !!}" method="POST" role="search" class="form-inline ml-auto ml-md-3 my-2 my-md-0 mw-100 mr-1 mb-2">
            {{ csrf_field() }}
            <div class="input-group">
              <input type="text" name="q" class="form-control bg-light small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" value="{{$query}}">
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit" title="Search"><i class="fas fa-search fa-sm"></i></button>
                <a class="btn btn-danger" href="{!! route('admin.users') !!}" title="Reset"><i class="fas fa-times fa-sm"></i></a>
              </div>
            </div>
        </form>
        @if(Arr::has($user_accesses,'user.add')) 
            <a href="{{ route('admin.user.add') }}" class="btn btn-sm-block btn-primary mb-2"><i class="fas fa-plus fa-sm"></i> Add New User</a>
        @endif
    </div>

    <div class="row no-gutters d-sm-flex align-items-center justify-content-between mb-4">
        <div class="col-md-6">
            <a  href="{!! route('admin.users') !!}" class="btn btn-block rounded-0 mb-2 {!! !$isDeleted ? 'btn-primary' : 'btn-secondary'
                !!}"><i class="fas fa-users"></i> Users</a>
        </div>
        <div class="col-md-6">
            <a  href="{!! route('admin.users.deleted') !!}" class="btn  btn-block rounded-0 mb-2 {!! !$isDeleted ? 'btn-secondary' : 'btn-primary'
                !!}"><i class="fas fa-users"></i> Deleted Users</a>
        </div>
    </div>

    <!-- Content Row -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-lg-8 col-md-6 col-sm-6 mb-2">
                            <h5 class="m-0 font-weight-bold text-primary">{!! !$isDeleted ? 'Active' :
                    'Deleted' !!} {{ __('User List') }}</h5>
                        </div>
                    </div>
                </div>
                <!-- Body -->
                <div class="card-body">
                    <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class=" text-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>Created at</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($result as $index => $row)
                                    <tr>
                                        <td>{!! $index + 1 !!}</td>
                                        <td>{{ $row->name }}</td>
                                        <td>{{ $row->email }}</td>
                                        <td>{{ $row->phone }}</td>
                                        <td>{{ ucfirst($row->role) }}</td>
                                        <td>{{ Carbon\Carbon::parse($row->created_at)->format('d/m/Y') }}</td>
                                        <td width="200">
                                            <div class="btn-group" role="group">
                                                @if(Arr::has($user_accesses,'user.edit')) 
                                                <a class="btn btn-warning rounded mr-2" href="{!! route('admin.user.edit',['user' => $row->id]) !!}" title="Edit">
                                                    <i class="fas fa-pencil-alt fa-sm"></i></a>
                                                @endif
                                                @if(Arr::has($user_accesses,'user.delete')) 
                                                    @if(!$isDeleted)
                                                    <a class="btn btn-danger rounded mr-2" data-toggle="modal" href="#user_delete_{!! $row->id !!}" title="Delete">
                                                        <i class="fas fa-trash fa-sm"></i></a>
                                                    @else
                                                    <a class="btn btn-success rounded mr-2" data-toggle="modal" href="#user_restore_{!! $row->id !!}" title="Restore User">
                                                        <i class="fas fa-undo fa-sm"></i></a>                                                         
                                                    @endif
                                                @endif
                                                <a class="btn btn-primary rounded mr-2" href="{!! route('admin.user.useraccess',['user' => $row->id]) !!}" title="User Access">
                                                    <i class="fas fa-lock fa-sm"></i></a>
                                                <a class="btn btn-secondary rounded" data-toggle="modal" href="#user_password_{!! $row->id !!}" title="Reset Password">
                                                    <i class="fas fa-key fa-sm"></i></a>
                                            </div>
                                        </td>
                                    </tr>
                                    @if(!$isDeleted) 
                                    <!-- Modal Delete -->
                                    <div class="modal fade" id="user_delete_{!! $row->id !!}" tabindex="-1" role="dialog"
                                         aria-labelledby="user_delete_{!! $row->id !!}" aria-hidden="true">
                                        <div class="modal-dialog modal-md" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="user_delete_{!! $row->id !!}">Delete User?</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <h4><strong>{{ $row->name }}</strong></h4> 
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                    <a href="{!! route('admin.user.delete',['user' => $row->id]) !!}"
                                                       class="btn btn-danger">Yes, Delete it
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    @else
                                    <!-- Modal Restore -->
                                    <div class="modal fade" id="user_restore_{!! $row->id !!}" tabindex="-1" role="dialog"
                                         aria-labelledby="user_restore_{!! $row->id !!}" aria-hidden="true">
                                        <div class="modal-dialog modal-md" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="user_restore_{!! $row->id !!}">Restore User?</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <h4><strong>{{ $row->name }}</strong></h4> 
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                    <a href="{!! route('admin.user.delete',['user' => $row->id, 'restore' => 1]) !!}"
                                                       class="btn btn-danger">Yes, Restore it
                                                    </a>
                                                     <a href="{!! route('admin.user.delete',['user' => $row->id, 'restore' => 2]) !!}"
                                                       class="btn btn-danger">Delete it
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    @endif
                                    <!-- Modal Change Password -->
                                    <div class="modal fade" id="user_password_{!! $row->id !!}" tabindex="-1" role="dialog"
                                         aria-labelledby="user_password_{!! $row->id !!}" aria-hidden="true" method="POST">
                                        <div class="modal-dialog modal-md" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="user_password_{!! $row->id !!}">Reset Password?</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <form action="{!! route('admin.user.resetpassword',['user' => $row->id]) !!}" method="POST">
                                                    @csrf
                                                    <div class="modal-body">
                                                        <div class="form-group">
                                                            <label>New Password</label>
                                                            <div class="input-group">
                                                                <input name="password" type="text" class="form-control " rel="gp" data-size="9" id="nc" data-character-set="a-z,A-Z,0-9,#" tabindex="1" required maxlength="20">
                                                                <div class="input-group-append">
                                                                    <button type="button" class="btn btn-primary getNewPass"><span class="fas fa-sync fa-sm"></span></button>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                        <button type="submit" class="btn btn-danger">Update</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    @empty
                                    <tr><td colspan="5">No {!! !$isDeleted ? 'Active' : 'Deleted' !!} Users Found</td></tr>
                                    @endforelse
                                </tbody>
                            </table>
                            {{ $result->links() }}
                        </div>
                    </div>
                </div>
                </div>  
            </div>
        </div>
    </div>
</div>
@endsection


@push('scripts')
<script type="text/javascript">
// Generate a password string
function randString( id ) {
    var dataSet = $( id ).attr('data-character-set').split( ',' );
    var possible = '';
    if ( $.inArray( 'a-z', dataSet ) >= 0 ) {
        possible += 'abcdefghijklmnopqrstuvwxyz';
    }
    if ( $.inArray( 'A-Z', dataSet ) >= 0 ) {
        possible += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if ( $.inArray( '0-9', dataSet ) >= 0 ) {
        possible += '0123456789';
    }
    if ( $.inArray( '#', dataSet ) >= 0 ) {
        possible += '![]{}()%&*$#^<>~@|';
    }
    var text = '';
    for ( var i = 0; i < $( id ).attr( 'data-size' ); i++ ) {
        text += possible.charAt( Math.floor( Math.random() * possible.length ) );
    }
    return text;
}

// Create a new password
$( ".getNewPass" ).click( function () {
    var field = $( this ).closest( '.input-group' ).find( 'input[rel="gp"]' );
    field.val( randString( field ) );
} );

$('.modal').on('shown.bs.modal', function (e) {
    var field = $('.modal.show').find('.getNewPass').closest( '.input-group' ).find( 'input[rel="gp"]' );
    field.val( randString( field ) );
})
</script>
@endpush
