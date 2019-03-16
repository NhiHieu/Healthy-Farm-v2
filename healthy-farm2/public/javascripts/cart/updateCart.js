$(document).ready(function(){

  if (localStorage.getItem('msgCart')) {
    toastr.success(localStorage.getItem('msgCart'), 'Success');
    localStorage.clear();
  }

  let successMsg = "Update cart successfully",
      failureMsg = "Failure to update cart";

  const handleSuccess = (result, success = successMsg)=> {
    if (result.message == "Success") {
      localStorage.setItem('msgCart', success);
      location.reload();
    } else {
      toastr.error(failureMsg, "Server Error");
    }
  }

  // loop list product list
  $('.update-add-cart').each((i, e)=> {
    // addEventListener for each element
    $(e).click((event)=> {
      console.log($(e).parent().children('.product-id').val());
      let productId = $(e).parent().children('.product-id').val();
      $.ajax({
        type: 'GET',
        contentType : "application/json",
        url : "/cart/api/add-to-cart",
        data : {
          productId
        },
        dataType: 'json',
        success: (result)=> {
          handleSuccess(result);
        },
        error: ()=> {
          alert('error');
        }
      })

    })  

  })

  // loop array list product
  $('.update-reduce-cart').each((i, e)=> {
    // addEventListener for each element
    $(e).click((event)=> {
      event.preventDefault();
      let productId = $(e).parent().children('.product-id').val();
      $.ajax({
        type: 'GET',
        contentType : "application/json",
        url : "/cart/api/reduce-cart",
        data : {
          productId
        },
        dataType: 'json',
        success: (result)=> {
          handleSuccess(result);
        },
        error: ()=> {
          alert('error');
        }
      })
    
    })
  })

  //loop list product
  $('.update-remove-cart').each((i, e)=> {
    // addEventListener for each element to remove from cart
    $(e).click((event)=> {
      event.preventDefault();
      let productId = $(e).parent().children('.product-id').val();

      $('.confirm-remove-cart').click((event)=> {
        event.preventDefault();

        $.ajax({
          type: 'GET',
          contentType : "application/json",
          url : "/cart/api/remove-from-cart",
          data : {
            productId
          },
          dataType: 'json',
          success: (result)=> {
            handleSuccess(result, "Remove product from cart successfully");
          },
          error: ()=> {
            alert('error');
          }
        })
      })
      
    })
  })

})

