
$(document).ready(() => {
  
  $.get("http://localhost:5000/finance", (data) => {
    $(".price").append(data[0].bidPrice)
    console.log(data)
  })
  
  console.log("connected")
})

