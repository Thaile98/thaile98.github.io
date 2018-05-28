  var total = totalItem("false");
  document.getElementById('count').innerHTML= total+ "--items left";
  function resetActive () {
  document.getElementById('all').classList.remove('att');
  document.getElementById('active').classList.remove('att');
  document.getElementById('complete').classList.remove('att');
  }
  function createBykey(){
		var n = new Date();
		return n.getTime();
	}
  function newElement() {
      var test = localStorage.getItem("test");
      var inputValue = document.getElementById("myInput").value;
      if (inputValue === '') {
        alert("You must write something!");
      } else {
          var testObj = (test !== null) ? JSON.parse(test) : {};
          var key = createBykey();
         
          testObj[key] = {"data":inputValue,"check":"false"};
 
          localStorage.setItem('test', JSON.stringify(testObj));
          let myUL = document.getElementById('myUL');
          let liNode = document.createElement("li");
          let text = document.createElement("div");
          text.className = "text";
          liNode.setAttribute("data-id",key)	
          let textLiNode = document.createTextNode(inputValue);
          text.appendChild(textLiNode);
          document.getElementById("myInput").value = "";
          var div = document.createElement("div");
          var txt = document.createTextNode("\u00D7");
          div.className = "close";
          div.appendChild(txt);
          liNode.appendChild(div);
          liNode.appendChild(text);
          liNode.className = "active";
          myUL.appendChild(liNode);

			    var close = document.getElementsByClassName("close");
			    var i;
			    for (i = 0; i < close.length; i++){
				    close[i].onclick = function() {
  					var div = this.parentElement;
  					var id = div.getAttribute("data-id");
  					this.parentNode.removeChild(this);
  					var item = localStorage.getItem('test');
  					item= JSON.parse(item);
  					if(item){
  						delete item[id];
  						item = JSON.stringify(item);
  						localStorage.setItem('test',item);
            }
            var total = totalItem("false");
            document.getElementById('count').innerHTML= total+ "--items left";
  					div.parentNode.removeChild(div);
				  }
			}
    }
    var total = totalItem("false");
    document.getElementById('count').innerHTML= total+ "--items left";
    addEdit();
	}
  
 
  let items = localStorage.getItem('test');
  if(items !== null) {
    let myUL = document.getElementById('myUL');
    items  = JSON.parse(items);
    for(let i  in items){
      let liNode = document.createElement("li");
      let text = document.createElement("div");
      text.className = "text";
      let textLiNode = document.createTextNode(items[i].data);
      text.appendChild(textLiNode);
      liNode.appendChild(text);
      if(items[i].check == "false"){
      	liNode.className = "active";
      }else{
      	liNode.className = "checked";
      }
      liNode.setAttribute("data-id",i);
      var div = document.createElement("div");
      var txt = document.createTextNode("\u00D7");
      div.className = "close";
      div.appendChild(txt);
      liNode.appendChild(div);
      myUL.appendChild(liNode);
    }
    var close = document.getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        var id = div.getAttribute("data-id");
        this.parentNode.removeChild(this);
        var item = localStorage.getItem('test');
        item= JSON.parse(item);
        if(item){
        	delete item[id];
        	item = JSON.stringify(item);
        	localStorage.setItem('test',item);
        }
        div.parentNode.removeChild(div);
        var total = totalItem("false");
    	  document.getElementById('count').innerHTML= total+ "--items left";
      }
	} 
	addEdit();	
}
  
  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
  			let items = localStorage.getItem('test');
  			items = JSON.parse(items);
  			var id = ev.target.getAttribute("data-id");
  				if(items[id].check == "false"){
  					items[id].check = "true";	
  				}else{
  					items[id].check = "false";
  				}
					ev.target.classList.toggle('checked');
					ev.target.classList.toggle('active');	
  				item = JSON.stringify(items);
      		localStorage.setItem('test',item);
      		var total = totalItem("false");
  	      document.getElementById('count').innerHTML= total+ "--items left";

  }, false);
  function addEdit(){
    let text = document.getElementsByClassName('text');
    for (var i = 0; i < text.length; i++) {
      text[i].oncontextmenu = function(e) {
          e.path[0].outerHTML='<input style="width:90%" type="text" class="edittext" value="'+e.path[0].innerHTML+'">';
          // console.log(e.path[0].outerHTML)
          let edittext = document.getElementsByClassName('edittext');
          edittext[0].focus();
          edittext[0].addEventListener('keypress', function (e) {
            if (e.key=="Enter") {
              var id = this.parentNode.getAttribute("data-id");
              let items = localStorage.getItem('test');
              items = JSON.parse(items);
              if(items){
                items[id].data = this.value;
                item = JSON.stringify(items);
                localStorage.setItem('test',item);
              }
              this.outerHTML='<div class="text">'+this.value+'</div>';
              addEdit();
          }
        })
      }
      
    }
  }



 
 	function totalItem(status){
 		var Item = localStorage.getItem('test');
 		Item = JSON.parse(Item);
 		var c = 0;
 		for(let i in Item){
 			if (Item[i].check  == status) {
 				c++;
 			}

 		}
 		return c;
 	}



  // Thêm công việc mới khi click vào button "thêm"

  function complete() {
    let li = document.getElementById('myUL').children;
    for (var i = 0; i < li.length; i++) {
      li[i].classList.contains('checked')?li[i].style.display = 'block':li[i].style.display = 'none';
    }
    
    resetActive();
    document.getElementById("complete").classList.add("att");
  }
  function active() {

    var li = document.getElementById('myUL').children;
    for (var i = 0; i < li.length; i++) {
      li[i].classList.contains('active')?li[i].style.display = 'block':li[i].style.display = 'none';
    }
    
    resetActive();
    document.getElementById("active").classList.add("att");
  }
  function abc() {
    var li = document.getElementsByTagName("li");
    var i;
    for (i = 0; i < li.length; i++) {
      li[i].style.display = "block";
      }
      resetActive();
    document.getElementById("all").classList.add("att");
  }
  function clearcp() {
    var child = Array.prototype.slice.call(document.getElementsByClassName("checked"));
    var lengthChild = child.length;
    for (let i = 0; i < lengthChild; i++) 
    {
    	var id = child[i].getAttribute("data-id");
      	var item = localStorage.getItem('test');
        item = JSON.parse(item);
        if(item){
        	delete item[id];
        	item = JSON.stringify(item);
        	localStorage.setItem('test',item);
        	
      		child[i].parentNode.removeChild(child[i]);

        }


    }
    
  }

  function activeAll(){
    items = localStorage.getItem('test');
    items = JSON.parse(items);
    for (let i in items) {
      if(items[i].check == "false")
      {
        items[i].check = "true"; 
      }
    }
    var active = document.getElementsByTagName('li');
    for (var t = 0; t < active.length; t++) {
      if(active[t].classList.contains('active')){
        active[t].classList.remove('active');
        active[t].classList.add('checked');
      }
    }
    items = JSON.stringify(items);
    localStorage.setItem('test',items);
    var total = totalItem("false");
    document.getElementById('count').innerHTML= total+ "--items left";
  }
  function removeActive(){
    items = localStorage.getItem('test');
    items = JSON.parse(items);
    for (let i in items) {
      if(items[i].check == "true")
      {
        items[i].check = "false"; 
      }
    }
    var checked = document.getElementsByTagName('li');
    for (var t = 0; t < checked.length; t++) {
      if(checked[t].classList.contains('checked')){
        checked[t].classList.remove('checked');
        checked[t].classList.add('active');
      }
    }
    items = JSON.stringify(items);
    localStorage.setItem('test',items);
    var total = totalItem("false");
    document.getElementById('count').innerHTML= total+ "--items left";
  }
