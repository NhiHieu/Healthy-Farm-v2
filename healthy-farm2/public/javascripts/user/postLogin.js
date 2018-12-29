let validateLogin = false;
let loginEmail = $('#login-email'),
    loginPassword = $('#login-password');

$(document).ready(function(){
  if (localStorage.getItem('status')) {
    toastr.success(localStorage.getItem('status'), "Success");
    localStorage.clear();
  }

  $('#signup-link, #login-link').click((event)=> {
    event.preventDefault();
    $('#modalLoginForm').modal('toggle');
    $('#modalRegisterForm').modal('toggle');
  })

  validateFormLogin();

  $('#loginForm').submit(function(event){    
    event.preventDefault();
    if (validateLogin) {
      $('#modalLoginForm').modal('toggle');    
      ajaxPost();
    }
  })
})

function validateFormLogin() {
  let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  $('#login-button').click(()=> {
    validateLogin = true;
    if (loginEmail.val()==='' || !emailReg.test(loginEmail.val())) {
      validateLogin = false;
      loginEmail.addClass(invalidClass).removeClass(validClass);
    }  

    if (loginPassword.val().length<8) {
      validateLogin = false;
      loginPassword.addClass(invalidClass).removeClass(validClass);
    } else {
      loginPassword.addClass(validClass).removeClass(invalidClass);
    }
  })

  // validate email 
  loginEmail.on('input', (e)=> {
    // validate email
    if (loginEmail.val() ==='' || !emailReg.test(loginEmail.val())) {
      loginEmail.addClass(invalidClass).removeClass(validClass);
    } else {
      loginEmail.addClass(validClass).removeClass(invalidClass);
    }
  })

  // validate password
  loginPassword.on('input', (e)=> {
    if (loginPassword.val().length<8) {
      loginPassword.addClass(invalidClass).removeClass(validClass);
    } else {
      loginPassword.addClass(validClass).removeClass(invalidClass);
    }
  })
}
   
function ajaxPost() {
  //prepare formData
  const formData = {
    _csrf: $('#_csrf').val(),
    email: loginEmail.val(),
    password: loginPassword.val()
  }
  // do post
  $.ajax({
    type: 'POST',
    contentType : "application/json",
    url : "/user/api/login",
    data : JSON.stringify(formData),
    dataType: 'json',
    success: function(data) {
      console.log('success', data);
      if (data.hasError) {
        toastr.error(data.message, 'Error');
      } else {
        localStorage.setItem('status', 'Log in successfully');
        location.reload();
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error', textStatus);
    }
    // reset form data
  })
  resetData();
}
function resetData() {
  loginEmail.val('');
  loginPassword.val('');
  loginEmail.removeClass(`${validClass} ${invalidClass}`);
  loginPassword.removeClass(`${validClass} ${invalidClass}`);
  $(".label-input").removeClass("active");
}