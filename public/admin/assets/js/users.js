$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$('body').on('shown.bs.modal', '.modal', function () {
    $('input:visible:enabled:first', this).focus();
})

/* Save record */
$("#mipl-save").click(function(e){    
    
    e.preventDefault(); 
        
    var form_method = $('#mipl-save').val() == 'save' ? "POST" : "PUT";
    var form_action = $("#mipl-modal").find("form").attr("action");
    var form_data = $("#mipl-modal").find("form").serialize();

    $.ajax({
    
        dataType: 'json',
        type: form_method,
        url: form_action,
        data: form_data        
    
    }).done(function(response){
        if (response.status == 1) {             
            $('#mipl-datatable').DataTable().ajax.reload();
            $("#mipl-modal").find("form").each( function() { this.reset; });
            $("#mipl-modal").modal('hide');
            toastr.success(response.data.success);
        } else {
            toastr.error(response.message);
        }

    }).fail(function (jqXHR, exception) {
        ajaxjqXHR(jqXHR, exception);
    });
});

/* Edit record*/
$(document).on('click', '.mipl-edit-record',function(e){
    
    e.preventDefault();

    var id = $(this).data("id");
    
    var form_action = pageUrl + '/' + id + '/edit';
    $.ajax({
        dataType: 'json',
        type:'GET',
        url: form_action,
        cache: false,
    }).done(function(data){
        /* modal modification for update */
        $('#mipl-modal-title').text("Update User");
        $('#mipl-save').attr('value','update');
        $('#mipl-save').text('Update');
        $('#mipl-modal').modal('show');
        $("#mipl-modal").find("form").attr("action", pageUrl + '/' + data.id);
        $('#mipl-modal').find(".password").prop("disabled", true); 

        /*assigen data to input*/
        $("#mipl-modal").find("input[name='name']").val(data.name);  
        $("#mipl-modal").find("input[name='phone']").val(data.phone);
        $("#mipl-modal").find("input[name='email']").val(data.email);
        $("#mipl-modal").find("select[name='user_type']").val(data.user_type).trigger('change.select2');
        $("#mipl-modal").find("input[name='ip_address']").val(data.ip_address);
        $("#mipl-modal").find("input[name='employee_no']").val(data.employee_no);
        $("#mipl-modal").find("input[name='designation']").val(data.designation);
        $("#mipl-modal").find("input[name='department']").val(data.department);
        $("#mipl-modal").find("input[name='joining_date']").val(data.joining_date);
        $("#mipl-modal").find("input[name='birthday_date']").val(data.birthday_date);
        $("#mipl-modal").find("input[name='address_line']").val(data.address_line); 
        $("#mipl-modal").find("input[name='city']").val(data.city);
        $("#mipl-modal").find("input[name='state']").val(data.state);
        $("#mipl-modal").find("input[name='country']").val(data.country);
        $("#mipl-modal").find("input[name='pincode']").val(data.pincode);

        if (data.masking_data == 1) {
            $("#mipl-modal").find('#masking_data').bootstrapToggle('on');
        }else{
            $("#mipl-modal").find('#masking_data').bootstrapToggle('off');
        }

        if (data.notification == 1) {
            $("#mipl-modal").find('#notification').bootstrapToggle('on');
        }else{
            $("#mipl-modal").find('#notification').bootstrapToggle('off');
        } 

        if (data.inactive == 1) {
            $("#mipl-modal").find('#inactive').bootstrapToggle('on');
        }else{
            $("#mipl-modal").find('#inactive').bootstrapToggle('off');
        } 

    }).fail(function (jqXHR, exception) {
        ajaxjqXHR(jqXHR, exception);
    });
});

/* Remove */
$("body").on("click",".mipl-remove-record",function(e){
    if(confirm("Are you sure you want to delete..?")){
        var id = $(this).data("id");
        $.ajax({
            dataType: 'json',
            type:'DELETE',
            url: pageUrl + '/' + id,
        }).done(function(response){
            if (response.status == 1) {             
                $('#mipl-datatable').DataTable().ajax.reload();
                toastr.success(response.data.success);
            } else {
                toastr.error(response.message);
            }
        }).fail(function (jqXHR, exception) {
            ajaxjqXHR(jqXHR, exception);
        });
    }
    return false;
});

/*datatable*/
$('#mipl-datatable').DataTable({
    "responsive":!1,
    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
    "pageLength":10,
    "processing": !1, 
    "serverSide": !1,
    "searchDelay":500,
    "ajax":{
        url :  targetUrl,
        type : "POST",
        dataType: 'json',
        error: function(data){
            console.log(data);
        }
    },
    "aoColumnDefs": [ { 'bSortable': false, 'aTargets': [-1] } ]
});

/*select2*/
$(".select2").select2({
    dropdownParent: $("#mipl-modal .modal-content"),width: '100%'
});

$('.btn-toggle').bootstrapToggle();
$("#mipl-modal").find('.btn-toggle').bootstrapToggle('on');

$(".input-group-prepend .input-group-text").click(function(event) {
    var x = $(this).parent().children('input');

    if (x.attr('type') === "password" && $('#mipl-save').val() === 'save') {
      x.attr('type', 'text'); 
      $(this).children('.password-show').show();
      $(this).children('.password-hide').hide();
    } else {
      x.attr('type', 'password');
      $(this).children('.password-show').hide();
      $(this).children('.password-hide').show();
    }
});

/*open modal change password*/
$(document).on('click', '.mipl-reset-password',function(e){

    var id = $(this).data("id");

    $('#mipl-modal-password').modal('show');

    $("#mipl-modal-password").find("#userid").val(id);

    $( 'input[rel="gp"]' ).each( function () {
        $( this ).val( randString( $( this ) ) );
    } );

}); 

/* Update Password */
$("body").on("click","#mipl-btn-password",function(e){
    
    e.preventDefault();

    var form_method = "POST";
    var form_action = $("#mipl-modal-password").find("form").attr("action");
    var form_data = $("#mipl-modal-password").find("form").serialize();

    $.ajax({
    
        dataType: 'json',
        type: form_method,
        url: form_action,
        data: form_data        
    
    }).done(function(response){
        if (response.status == 1) {             
            $("#mipl-modal-password").find("form").each( function() { this.reset; });
            $("#mipl-modal-password").modal('hide');
            toastr.success(response.data.success);
        } else {
            toastr.error(response.message);
        }

    }).fail(function (jqXHR, exception) {
        ajaxjqXHR(jqXHR, exception);
    });
});

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

/*modal hide*/
$('.modal').on('hidden.bs.modal', function (e) {
    $(this).find('form')[0].reset();
    $('#mipl-modal-title').text("Create User");
    $('#mipl-save').attr('value','save');
    $('#mipl-save').text('Save');
    $("#mipl-modal").find("form").attr("action", storeUrl);
    $('#mipl-modal').find(".password").prop("disabled", false);
    $(".select2").val(null).trigger("change");
    $("#mipl-modal").find('.btn-toggle').bootstrapToggle('on');
});

/* show User Access modal*/
$("body").on("click",".userAccessControl",function(e){

    e.preventDefault();

    var id = $(this).data("id");

    $("#userAccessControl").find("input[name='user_id']").val(id); 

    $.ajax({
        dataType: 'json',
        type:'GET',
        url: 'get_user_accesses?id='+id,
        cache: false,
    }).done(function(data){
        $.each(data, function( key, value ) {

           $.each(JSON.parse(value), function( k, v ) {
                
                $("#userAccessControl").find("input[name='"+k+"']").prop("checked", true);

                if (typeof v != 'string') {
                    $.each(v, function( k2, v2 ) {
                       //console.log(k);
                       $("#userAccessControl").find("input[name='"+k+"["+k2+"]']").val(1);
                       $("#userAccessControl").find("input[name='"+k+"["+k2+"]']").prop("checked", true);
                   }); 
                }

            });

        });

    });

});

$("body").on("click",".btn-user-access-submit",function(e){

    e.preventDefault();

    var form_action = $("#userAccessControl").find("form").attr("action");

    $.ajax({

        dataType: 'json',

        type:'POST',

        url: form_action,

        data:$("#userAccessControl").find("form").serialize()

    }).done(function(response){
        if (response.success) { 
            $("form").each( function() { this.reset; });
            $(".modal").modal('hide');
            swal({title:response.success,type:"success",confirmButtonClass:"btn btn-success m-btn m-btn--wide"});
        } else {
            swal({title:"",text:response.errors,type:"error", confirmButtonClass:"btn btn-danger m-btn m-btn--wide"});
        }
    });
});

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

    $("#view_all").on("change", function() {
        $(".module_checkb").prop('checked', this.checked);
        $(".view_checkb").prop('checked', this.checked);
        $("#module_select_all").prop('checked', this.checked);
        $("#view_all").prop('checked', this.checked);     
    });

    $(".module_checkb,  .view_checkb").on("change", function() {
        var val = $(this).attr( "module_id" );
        $("#module_"+val).prop('checked', this.checked)
        $("#module_view_"+val).prop('checked', this.checked);
        $("#module_create_"+val).prop('checked', this.checked)
        $("#module_edit_"+val).prop('checked', this.checked);
        $("#module_delete_"+val).prop('checked', this.checked);
    });

    $(".create_checkb,  .edit_checkb, .delete_checkb").on("change", function() {
        var val = $(this).attr( "module_id" );
        $(this).prop('checked', this.checked);
        if(!$("#module_"+val).is(':checked')){
            $("#module_"+val).prop('checked', this.checked);
        }
        if(!$("#module_view_"+val).is(':checked')){
            $("#module_view_"+val).prop('checked', this.checked);
        }       
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
