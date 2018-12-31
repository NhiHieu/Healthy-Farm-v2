$(document).ready(()=> {
  // loop array list product
  $('.add-product').each((i, e)=> {
    $(e).click((event)=> {
      event.preventDefault();
      let productId = $(e).attr('product-id'),
          quantity = $('#quantity').val() || 1;
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
