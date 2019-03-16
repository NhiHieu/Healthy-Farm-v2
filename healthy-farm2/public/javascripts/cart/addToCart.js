$(document).ready(()=> {
  
  if (localStorage.getItem('successMsg')) {
    toastr.success(localStorage.getItem('successMsg'), 'success');
    localStorage.clear();
  }
  // loop array list product

  $('.add-product').each((i, e)=> {
    $(e).click((event)=> {
      event.preventDefault();
      let productId = $(e).attr('product-id'),
          quantity = $('#quantity').val();
      $.ajax({
        type: 'GET',
        contentType : "application/json",
        url : "/cart/api/add-to-cart",
        data : {
          productId,
          quantity
        },
        dataType: 'json',
        success: (result)=> {
          if (result.message == "Success") {
            localStorage.setItem('successMsg', 'Add to cart successfully');
            location.reload();
          } else {
            toastr.error("Failure to add to cart", "Server Error");
          }
        },
        error: ()=> {
          alert('error');
        }
      })
    })
  })
})
