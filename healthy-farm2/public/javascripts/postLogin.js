$(document).ready(function(){
  $('#signup-link, #login-link').click((event)=> {
    event.preventDefault();
    $('#modalLoginForm').modal('toggle');
    $('#modalRegisterForm').modal('toggle');
  })

  $('#loginForm').submit(function(event){
    event.preventDefault();
    ajaxPost();
  })
})
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-bottom-left",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "2000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}    
function ajaxPost() {
  //prepare formData
  const formData = {
    _csrf: $('#_csrf').val(),
    email: $('#loginEmail').val(),
    password: $('#loginPassword').val()
  }
  // do post
  $.ajax({
    type: 'POST',
    contentType : "application/json",
    url : "/test/api/login",
    data : JSON.stringify(formData),
    dataType: 'json',
    success: function(data) {
      console.log('success', data);
      $('#modalLoginForm').modal('toggle');    
      if (data.hasError) {
        toastr.error(data.message, 'Error');
      } else {
        toastr.options.onHidden = function() { 
          location.reload();
        }
        toastr.success(data.message, "login success");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error', textStatus);
      console.log(err);
    }
    // reset form data
  })
  resetData();
}
function resetData() {
  $('#loginEmail').val('');
  $('#loginPassword').val('');
}