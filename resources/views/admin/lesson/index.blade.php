@extends('layouts.admin.master')
@section('title'){{ __('Lesson for') }} {{ $course->course_title }}@endsection
@push('css-plugins')
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link href="{{ URL::asset('admin/assets/vendor/bootstrap4-toggle/css/bootstrap4-toggle.min.css') }}" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="{!! URL::asset('admin/assets/vendor/datepicker.css') !!}">
@endpush
@section('content')
<style type="text/css">
.progress{ height: 25px; }
.pagination{float:right !important;}
.highlight {
    padding: 1rem;
    margin: 0;
    background-color: #f7f7f9;
    -ms-overflow-style: -ms-autohiding-scrollbar;
}
.highlight pre {
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;
    background-color: 
    transparent;
    border: 0;
}
pre {
    display: block;
    font-size: 87.5%;
    color: #212529;
}
</style>
<div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-2 text-gray-800">{{ __('Lesson for') }} {{ $course->course_title }}</h1>
        <div>
            <a data-toggle="modal" href="#model_add" class="btn btn-sm-block btn-primary mb-2"><i class="fas fa-plus fa-sm"></i> {{ __('Add New Lesson') }}</a>
            <a href="{{url('admin/courses')}}" class="btn btn-sm-block btn-danger mb-2"><i class="fas fa-arrow-left fa-sm"></i> {{ __('Back') }}</a>
        </div>
    </div>
    <!-- Content Row -->
    <div class="row connectedSortable" id="sort-lesson">
        @forelse ($result as $index => $row)
        <div class="col-md-3 col-sm-12 mb-3 sort-lesson-item" item-id="{{ $row->id }}">
            <div class="card shadow mb-4">
                <img src="{{ $row->coverImagePath() }}" class="card-img-top" alt="{{ $row->lesson_title }}" style="min-height: 200px; height: 200px; width: 100%;">
                <div class="card-body">  
                	<h5 class="font-weight-bold text-primary text-center">{{ $row->lesson_title }}</h5> <hr/>
                	<div class="d-flex flex-row align-items-center justify-content-between">
                        <div class="btn-group">
                        	<a class="btn btn-warning mr-2 rounded" data-toggle="modal"
                            href="#model_edit_{!! $row->id !!}" title="Edit"><i class="fas fa-pencil-alt fa-sm"></i></a>

                            <a class="btn btn-danger mr-2 rounded" data-toggle="modal"
                                href="#model_edit_delete_{!! $row->id !!}" title="Delete"><i class="fas fa-trash fa-sm"></i></a>
                        </div>
                    </div>
                </div>
                <!-- end card body -->        
            </div>
            <!-- end card -->
        </div>
        <!-- sort-lesson-item -->
        @push('scripts')
        <!-- Modal Delete #{!! $row->id !!}-->
        <div class="modal fade" id="model_edit_delete_{!! $row->id !!}" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false" >
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                   <div class="modal-header">
                        <h5 class="modal-title">{{ __('Delete Lesson?') }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                   <div class="modal-body">
                        <div class="row">
                            <div class="col-md-10">
                                <p class="h5 font-weight-bold text-gray-800">{{ $row->lesson_title }}</p> 
                            </div>
                        </div>                                
                    </div>
                    <div class="modal-footer">
                    	<button type="button" class="btn btn-danger" data-dismiss="modal">{{ __('Cancel') }}</button>
                        <a href="{!! route('admin.lesson.delete',['lesson' => $row->id ]) !!}"
                           class="btn btn-primary">{{ __('Yes, Delete it') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal Delete #{!! $row->id !!} -->
        @include('admin.lesson.edit',['lesson' => $row ])        
    	@endpush
        @empty
        <div class="col-12">
            <div class="card shadow mb-4">
                <div class="card-body"> 
                    <div class="row">
                        <div class="col-md-12">{{ __('No Lessons Found') }}</div>
                    </div>
                </div>
            </div>
        </div>
        @endforelse        
    </div>
    <!-- end Content Row -->
    <!-- Lesson New -->
    @include('admin.lesson.add') 
    <!-- End Lesson --> 
</div> 
@endsection
@push('scripts')
<script src="{{ asset('/admin/assets/vendor/jquery.form.js') }}"></script>
<script src="{!! URL::asset('admin/assets/vendor/moment.min.js') !!}"></script>
<script src="{!! URL::asset('admin/assets/vendor/bootstrap-datetimepicker.min.js') !!}"></script>
<script src="{{url('')}}/admin/assets/vendor/tinymce/tinymce.min.js" type="text/javascript"></script>
<script type="text/javascript">
$(function() {
    tinymce.init({
        min_height: 400,
        selector: 'textarea.lesson_description',
        menubar: false,
        plugins: ["table","code"],
        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | table | code'
    });
});
// Prevent Bootstrap dialog from blocking focusin
$(document).on('focusin', function(e) {
  if ($(e.target).closest(".lesson_description").length) {
        e.stopImmediatePropagation();
    }
});
</script>
<script type="text/javascript">  
$(document).ready(function(){
    $('form').ajaxForm({

        uploadProgress:function(event, position, total, percentComplete)
        {
            $('.modal.show').find('.btn-submit').attr('disabled', true);
            $('.modal.show').find('.progress-bar').text(percentComplete + '%');
            $('.modal.show').find('.progress-bar').css('width', percentComplete + '%');
        },
        success:function(data)
        {
            if(data.status == 2)
            {
                $('.modal.show').find('.btn-submit').attr('disabled', false);
                $('.modal.show').find('.progress-bar').text('0%');
                $('.modal.show').find('.progress-bar').css('width', '0%');
                toastr.error(data.message);
            }
            if(data.status == 1)
            {
                $('.modal.show').find('.btn-submit').attr('disabled', false);
                $('.modal.show').find('.progress-bar').text('100%');
                $('.modal.show').find('.progress-bar').css('width', '100%');
                toastr.success(data.data.success);
                $('.modal.show').modal('hide');
                location.reload(true);
            }
        }
    });

    $('.modal').on('hidden.bs.modal', function(e){
        $(this).find('form').resetForm(); // only reset form
        $('#model_add').clearForm(); // clear all data
        $(this).find('.btn-submit').attr('disabled', false);
        $(this).find('.progress-bar').text('0%');
        $(this).find('.progress-bar').css('width', '0%');
    });

    $(".modal").on('shown.bs.modal', function(){ 
    	var dateFormat = 'DD/MM/YYYY HH:mm:ss';
	    var from = $('.modal.show').find(".published_at").datetimepicker({
	    	format: dateFormat,
	        icons: {
	            time: "fa fa-clock",
	            date: "fa fa-calendar",
	            up: "fa fa-chevron-up",
	            down: "fa fa-chevron-down",
	            previous: 'fa fa-chevron-left',
	            next: 'fa fa-chevron-right',
	            today: 'fa fa-screenshot',
	            clear: 'fa fa-trash',
	            close: 'fa fa-remove'
	        },
	    }); 

    });

});
</script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>

  $( function() {

  	$( "#sort-lesson" ).sortable({

      connectWith: ".connectedSortable",

      opacity: 0.5,

    }).disableSelection();

    $( ".connectedSortable" ).on( "sortupdate", function( event, ui ) {

        var lessonArr = [];


        $("#sort-lesson .sort-lesson-item").each(function( index ) {

          lessonArr[index] = $(this).attr('item-id');

        });


        $.ajax({

            url: "{{ route('admin.lesson.update-display-order') }}",

            method: 'POST',

            headers: {

                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

            },

            data: {lessonArr:lessonArr},

            success: function(data) {

              console.log('success');

            }

        });

    }); 
});

$('.custom-file input').change(function (e) {
    var files = [];
    for (var i = 0; i < $(this)[0].files.length; i++) {
        files.push($(this)[0].files[i].name);
    }
    $(this).next('.custom-file-label').html(files.join(', '));
});
</script> 
@endpush