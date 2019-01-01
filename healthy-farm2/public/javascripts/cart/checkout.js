$(document).ready(()=> {
  $('#credit,#paypal').each((i, e)=> {
    $(e).click((event)=> {
      event.preventDefault();
      toastr.warning('This feature will develop in the future', 'Warning');
    })
  })

  let validateCheckout = false;
  validateCheckoutForm();
  $('#checkoutForm').one('submit', (event)=> {
    if (!validateCheckout) {
      event.preventDefault();
    } 
    $(this).submit();
  });

})

function validateCheckoutForm() {
  $('#btn-checkout').click((event)=> {
    validateCheckout = true;
    $('.input-checkout').each((i, e)=> {
      if ($(e).val()==='') {
        validateCheckout = false;
        $(e).addClass(invalidClass).removeClass(validClass);
      } else {
        $(e).addClass(validClass).removeClass(invalidClass);
      }
    })
  })
  $('.input-checkout').each((i, e)=> {
    console.log($(e).val());
    $(e).on('input', (event)=> {
      if ($(e).val()==='') {
        $(e).addClass(invalidClass).removeClass(validClass);
      } else {
        $(e).addClass(validClass).removeClass(invalidClass);
      }
    })
  })  
  
}