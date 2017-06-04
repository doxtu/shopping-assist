$(document).ready(function exe(){
  $("#searchSubmit").on("click",function search(){
    let search = $("#searchInput").val();
    let url = "http://api.walmartlabs.com/v1/search?format=json&apiKey=nr8nmaedubfzep9kys6syxdy&callback=?&query=" + search;
    $.getJSON(url,function handleSearch(results){
      let items = results.items;
      console.log(items);
      items.forEach(function appender(item){
        $("#predictorList").append(`
          <h3 class="text-center">${item.name}</h3>
          <img class="center-block" src=${item.thumbnailImage}>
          <p class="text-center">Price: ${item.salePrice}</p>
          `);
      });
    });
  });
});

/*
  When you search, there will be multiple results in the search.items array,
  create a container with the results and display it with a select button
  need names, thumbnailImage, msrp, salePrice
*/
