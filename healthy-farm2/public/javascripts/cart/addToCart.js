$(document).ready(()=> {
  // get message success
  // if (localStorage.getItem('msgCart')) {
  //   toastr.success(localStorage.getItem('msgCart'), 'Success');
  //   localStorage.clear();
  // }


  // loop array list product
  $('.add-product').each((i, e)=> {
    $(e).click((event)=> {
      event.preventDefault();
      let productId = $(e).attr('product-id');
      $.ajax({
        type: 'GET',
        contentType : "application/json",
        url : "/cart/api/add-to-cart",
        data : {
          productId
        },
        dataType: 'json',
        success: (result)=> {
          if (result.message == "Success") {
            //localStorage.setItem('msgCart', "");
            toastr.success("Add to cart successfully", 'success');

            setTimeout(()=>{
              refreshCart(result.totalQuantity);
            }, 300)
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
