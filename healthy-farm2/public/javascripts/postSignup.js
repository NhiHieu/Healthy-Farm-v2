let validateSignup = false;
let username = $('#signup-username'),
    email = $('#signup-email'),
    password = $('#signup-password');
    confirmPassword = $('#confirm-password');
let validClass = 'is-valid valid',
    invalidClass = 'is-invalid invalid';
    
$(document).ready(function(){
  validateFormSignup();

  $('#signup-form').submit(function(event){
    event.preventDefault();
    if (validateSignup) {
      postSignupAjax();
    }
  })  

  function postSignupAjax() {
    //prepare formData
    const formData = {
      _csrf: $('#_csrf').val(),
      username: username.val(),
      email: email.val(),
      password: password.val()
    }
    // do post
    $.ajax({
      type: 'POST',
      contentType : "application/json",
      url : "/user/api/signup",
      data : JSON.stringify(formData),
      dataType: 'json',
      success: function(data) {
        console.log('success', data);
        $('#modalRegisterForm').modal('toggle');    
        if (data.hasError) {
          toastr.error(data.message, 'Error');
        } else {
          toastr.options.onHidden = function() { 
            location.reload();
          }
          toastr.success('Success', "Sign up successfully");
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
      username.val(null);
      email.val(null);
      password.val(null);
      confirmPassword.val(null);
      username.removeClass(`${validClass} ${invalidClass}`);
      email.removeClass(`${validClass} ${invalidClass}`);
      password.removeClass(`${validClass} ${invalidClass}`);
      confirmPassword.removeClass(`${validClass} ${invalidClass}`);
      $(".label-input").removeClass("active");
    }

})

function validateFormSignup() {
  let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  $('#signup-button').click((event)=> {
    validateSignup = true;
    if (username.val()==='') {
      validateSignup = false;
      username.addClass(invalidClass).removeClass(validClass);
    }

    if (email.val()==='' || !emailReg.test(email.val())) {
      validateSignup = false;
      email.addClass(invalidClass).removeClass(validClass);
    }

    if (password.val().length<8) {
      validateSignup = false;
      password.addClass(invalidClass).removeClass(validClass);
    }

    if (confirmPassword.val()!==password.val()) {
      validateSignup = false;
      confirmPassword.addClass(invalidClass).removeClass(validClass);
    }
    console.log(validateSignup)
  })

  // validate username
  username.on('input', (e)=> {
    if (username.val()==='') {
      username.addClass(invalidClass).removeClass(validClass);
    } else {
      username.addClass(validClass).removeClass(invalidClass);
    }
  })

  // validate email 
  email.on('input', (e)=> {
      // validate email
    if (email.val() ==='' || !emailReg.test(email.val())) {
      email.addClass(invalidClass).removeClass(validClass);
    } else {
      email.addClass(validClass).removeClass(invalidClass);
    }
  })

  // validate password
  password.on('input', (e)=> {
    if (password.val().length<8) {
      password.addClass(invalidClass).removeClass(validClass);
    } else {
      password.addClass(validClass).removeClass(invalidClass);
    }
  })

  // confirm password
  confirmPassword.on("input", function(e) {
    if (confirmPassword.val()!==password.val()) {
      $(this).addClass(invalidClass).removeClass(validClass)
    } else {
      $(this).addClass(validClass).removeClass(invalidClass)
    }
  });
}