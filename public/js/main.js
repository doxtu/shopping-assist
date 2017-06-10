$(document).ready(function exe(){
  /*
    State variables. Manage the current shopping list
  */
  let curlist = {};

  (function init(){
    let list = $("#resultsList li");
    Array.prototype.forEach.call(list,(_,i)=>{
      list[i].addEventListener("click",selectItem);
    });
  })();
  /*
    Ajax for items from Walmart API.
  */
  $("#searchSubmit, #searchInput").on("click keydown",function search(e){
    if(this === document.querySelector("#searchSubmit")) e.key = "Enter";
    if(typeof e.key === "undefined" || e.key !== "Enter") return;
    let search = $("#searchInput").val();
    let url = "http://api.walmartlabs.com/v1/search?format=json&apiKey=nr8nmaedubfzep9kys6syxdy&callback=?&query=" + search;
    $.getJSON(url,function handleSearch(results){
      let items = results.items;
      let list = $("#resultsList li");
      items.forEach(function appender(item,i){
        let name = item.name,
        category = item.categoryPath.split("/")[0] || "General",
        price = accounting.formatMoney(item.msrp || item.salePrice),
        image = item.thumbnailImage;
        list[i].innerHTML = (`
          <img src=${image}>
          <h3>${name}</h3>
          <p>Category: ${category}</p>
          <p>Price: ${price}</p>
          `);
      });
    });
  });

  /*
    Item selected event function
  */
  function selectItem(e){
    let name = this.children[1].innerHTML,
    category = this.children[2].innerHTML.split(": ")[1],
    price = +accounting.unformat(this.children[3].innerHTML.split(": ")[1]);

    if(typeof curlist[category] === "undefined"){
        curlist[category] = {};
    }
    curlist[category][name] = {
      name:name,
      price:price
    };

    buildList();
  }

  //Builds the shopping list
  function buildList(){
    //create list that fits in body
    let listWidth = document.querySelector("#shoppingCart").offsetWidth;
    let listHeight = document.querySelector("#shoppingCart").offsetHeight;
    console.log(listWidth,listHeight);
  }

});
