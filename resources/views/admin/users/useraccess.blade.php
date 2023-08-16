@extends('layouts.admin.master')
@section('title', 'User Module Accesses')
@section('content')
<div class="container-fluid">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-lg-8 col-md-6 col-sm-6 mb-2">
                            <h5 class="m-0 font-weight-bold text-primary">{{ __('User Module Accesses') }}</h5>
                        </div>
                    </div>
                </div>
                <form action="{!! url()->current() !!}" method="POST" enctype="multipart/form-data" autocomplete="off" novalidate="">
                @csrf
                <!-- Body -->
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-lg-12 col-md-12 col-sm-12">
                            <div class="table-scrollable table-responsive">
                                <table class="table table-bordered table-advance table-hover table-access">
                                    <thead>
                                        <tr class="">
                                            <th width="20%">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" id="module_select_all">
                                                    <label class="custom-control-label" for="module_select_all">Modules</label>
                                                </div>
                                            </th>
                                            <th width="20%">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" id="view_all">
                                                    <label class="custom-control-label" for="view_all">View</label>
                                                </div>
                                            </th>
                                            <th width="20%">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" id="create_all">
                                                    <label class="custom-control-label" for="create_all">Add</label>
                                                </div>
                                            </th>
                                            <th width="20%">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" id="edit_all">
                                                    <label class="custom-control-label" for="edit_all">Edit</label>
                                                </div>
                                            </th>
                                            <th width="20%">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" id="delete_all">
                                                    <label class="custom-control-label" for="delete_all">Delete</label>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($model_list as $key => $value)
                                        <tr>
                                            <td> 
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" name="{{$value}}" module_id="{{$value}}" class="custom-control-input module_checkb" id="module_{{$key}}" value="1"
                                                    @if(Arr::exists($user->user_accesses, $value)) checked @endif
                                                    >
                                                    <label class="custom-control-label" for="module_{{$key}}">{{ucfirst($value)}}</label>
                                                </div>
                                            </td>

                                            <td>
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" name="{{$value}}[view]" module_id="{{$value}}" class="custom-control-input view_checkb" id="module_view_{{$value}}" value="1"
                                                    @if(Arr::has($user->user_accesses, $value.'.view')) checked @endif  > 
                                                    <label class="custom-control-label" for="module_view_{{$value}}">View</label>
                                                </div>
                                            </td>
                                            
                                            <td>
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" name="{{$value}}[add]" module_id="{{$value}}" class="custom-control-input create_checkb" id="module_create_{{$value}}" value="1" 
                                                    @if(Arr::has($user->user_accesses, $value.'.add')) checked @endif  > 
                                                    <label class="custom-control-label" for="module_create_{{$value}}">Add</label>
                                                </div>
                                            </td>
                                            
                                            <td>
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" name="{{$value}}[edit]" module_id="{{$value}}" class="custom-control-input edit_checkb" id="module_edit_{{$value}}" value="1" 
                                                    @if(Arr::has($user->user_accesses, $value.'.edit')) checked @endif  > 
                                                    <label class="custom-control-label" for="module_edit_{{$value}}">Edit</label>
                                                </div>
                                            </td>
                                            
                                            <td>
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" name="{{$value}}[delete]" module_id="{{$value}}" class="custom-control-input delete_checkb" id="module_delete_{{$value}}" value="1" 
                                                    @if(Arr::has($user->user_accesses, $value.'.delete')) checked @endif  > 
                                                    <label class="custom-control-label" for="module_delete_{{$value}}">Delete</label>
                                                </div>
                                            </td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="form-group row">
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>
                            <a href="{!! route('admin.users') !!}" class="btn btn-danger" >{{ __('Cancel') }}</a>
                        </div>
                    </div>
                </div>  
              </form>    
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
<script type="text/javascript">
    /*user access*/
$(function () {
    
    $("#module_select_all").on("change", function() {
        $(".module_checkb").prop('checked', this.checked);
        $(".view_checkb").prop('checked', this.checked);
        $(".edit_checkb").prop('checked', this.checked)
        $(".create_checkb").prop('checked', this.checked);
        $(".delete_checkb").prop('checked', this.checked);
        $("#module_select_all").prop('checked', this.checked);
        $("#view_all").prop('checked', this.checked);
        $("#create_all").prop('checked', this.checked);
        $("#edit_all").prop('checked', this.checked);
        $("#delete_all").prop('checked', this.checked);     
    });

    

    $(".module_checkb").on("change", function() {
        var val = $(this).attr( "module_id" );
        $("#module_"+val).prop('checked', this.checked)
        $("#module_view_"+val).prop('checked', this.checked);
        $("#module_create_"+val).prop('checked', this.checked)
        $("#module_edit_"+val).prop('checked', this.checked);
        $("#module_delete_"+val).prop('checked', this.checked);
    });

    $(".create_checkb,  .edit_checkb, .delete_checkb").on("change", function() {
        var val = $(this).attr( "module_id" );
        console.log(val)
        $(this).prop('checked', this.checked);
        if(!$("#module_"+val).is(':checked')){

            $("#module_"+val).prop('checked', this.checked);
            
            $("#module_"+val).prop('checked', this.checked);
        }
        if(!$("#module_view_"+val).is(':checked')){
            $("#module_view_"+val).prop('checked', this.checked);
        }       
    });

    $("#view_all").on("change", function() {
        $(".module_checkb").prop('checked', this.checked);
        $(".view_checkb").prop('checked', this.checked);
        $("#module_select_all").prop('checked', this.checked);
        $("#view_all").prop('checked', this.checked);     
    });

    $("#create_all").on("change", function() {
        $(".create_checkb").prop('checked', this.checked);
        if($('#create_all').is(':checked')){
            $(".module_checkb").prop('checked', this.checked);
            $(".view_checkb").prop('checked', this.checked);
            $("#module_select_all").prop('checked', this.checked);
            $("#view_all").prop('checked', this.checked);
        }
    });

    $("#edit_all").on("change", function() {
        $(".edit_checkb").prop('checked', this.checked);
        if($('#edit_all').is(':checked')){
            $(".module_checkb").prop('checked', this.checked);
            $(".view_checkb").prop('checked', this.checked);
            $("#module_select_all").prop('checked', this.checked);
            $("#view_all").prop('checked', this.checked);
        }
    });

    $("#delete_all").on("change", function() {
        $(".delete_checkb").prop('checked', this.checked);
        if($('#delete_all').is(':checked')){
            $(".module_checkb").prop('checked', this.checked);
            $(".view_checkb").prop('checked', this.checked);
            $("#module_select_all").prop('checked', this.checked);
            $("#view_all").prop('checked', this.checked);
        }
    });

});
</script>
@endpush