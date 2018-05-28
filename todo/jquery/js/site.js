$(document).ready(function(){
  function F5 () {
  let c=0;
  $('#myUL li').each(function () {
    if ($(this).hasClass('checked'))
      c++;
  })
  $('#count').html($("#myUL li").length-c);
  }
  F5();
  $(".addBtn").click(function(){
    $test = localStorage.getItem('test');
    $input = $("#myInput").val();
    if($input === ''){
      alert("You must write something!");
    } else {

      $testObj = ($test !== null) ? JSON.parse($test) : {};
      $key = $.now();
      $testObj[$key] = {"data":$input,"check":"false"};
      localStorage.setItem('test',JSON.stringify($testObj));

      $("#myUL").prepend(
        '<li class="active" data-id="'+$key+'"><div class="text">'
        +$input+
        '</div><div class="close">\u00D7</div></li>');
      $(".close").click(function(){
        $id = $(this).parent().attr("data-id");
        $item = localStorage.getItem('test');
            $item= JSON.parse($item);
            console.log($item[$id]);
            if($item){
              delete $item[$id];
              $item = JSON.stringify($item);
              localStorage.setItem('test',$item);
            }
        $(this).parent().remove();
        F5();
      });
    }
    $("#myInput").val('');
    F5();
  });
  $items = localStorage.getItem('test');
  if($items !== null){
    $items = JSON.parse($items);
    for($i in $items){
      if($items[$i].check === "false"){
        $("#myUL").prepend(
          '<li class="active" data-id="'+$i+'"><div class="text">'
          +$items[$i].data+
          '</div><div class="close">\u00D7</div></li>'
        );
      }else{
        $("#myUL").prepend(
          '<li class="checked" data-id="'+$i+'"><div class="text">'
          +$items[$i].data+
          '</div><div class="close">\u00D7</div></li>'
        );
      }

      $(".close").click(function(){
            $id = $(this).parent().attr("data-id");
            $item = localStorage.getItem('test');
            $item= JSON.parse($item);
            console.log($item[$id]);
            if($item){
              delete $item[$id];
              $item = JSON.stringify($item);
              localStorage.setItem('test',$item);
            }
        $(this).parent().remove();
        F5();
      });
    }
    F5();
  }
  $(document).on('click','#myUL li',function () {
    $(this).toggleClass('checked');
    $(this).toggleClass('active');
    $item = localStorage.getItem('test');
    $item = JSON.parse($item);
    $id = $(this).attr("data-id");
    if($item[$id].check == "false"){
      $item[$id].check = "true";
    }else{
      $item[$id].check = "false";
    }
    $item = JSON.stringify($item);
    localStorage.setItem('test',$item);
    F5();
  });

  $(document).on('mousedown','.text',function (e) {
    $(this).html('<input type="text" class="edittext" value="'+$(this).html()+'">');
    $(this).removeClass('text');
  });
  $(document).on('keypress','.edittext',function (key) {
  if (key.key==='Enter' && $(this).val()!='') {
    $item = localStorage.getItem('test');
    $item = JSON.parse($item);
    $id = $(this).parent().parent().attr("data-id");
    $item[$id].data = $(this).val();
    $item = JSON.stringify($item);
    localStorage.setItem('test',$item);
    $(this).parent().html('<div class="text">'+$(this).val()+'</div>');
  }     
  })
  document.oncontextmenu = function() {return false;};
  

  
  $("#all").click(function(){
    resetActive();
    $(this).addClass('att');
    $("li").css("display", "block");
    
  });
  $("#active").click(function(){
    resetActive();
    $(this).addClass('att');
    $(".active").css("display", "block");
    $(".checked").css("display", "none");
    
  });
  $("#complete").click(function(){
    resetActive();
    $(this).addClass('att');
    $(".checked").css("display", "block");
    $(".active").css("display", "none");
    
  });
  $("#clear").click(function(){
    
    $(".checked").each(function(){
      $items = localStorage.getItem('test');
      $items = JSON.parse($items);
      $id = $(this).attr("data-id");
      if($items[$id].check == "true"){
        delete $items[$id];
        $items = JSON.stringify($items);
        localStorage.setItem('test',$items);
      }
    })
    $(".checked").remove();
    
  });
  $('#active-all').click(function () {
    var flag =false;
    var count=0;
    $('#myUL li').each(function() {
      if ($(this).hasClass('checked')) {
        flag=true;
        count++;
      }
      else
        flag=false;

    });
    if (flag && count==$("#myUL li").length) {
      $('#myUL li').removeClass('checked');
      $('#myUL li').addClass('active');
      $items = localStorage.getItem('test');
      $items = JSON.parse($items);
      for($i in $items){
        if($items[$i].check == "true"){
          $items[$i].check = "false";
        }
      }
      $items = JSON.stringify($items);
      localStorage.setItem('test',$items);
      F5();
    }
    else{
      $('#myUL li').removeClass('active');
      $('#myUL li').addClass('checked');
      $items = localStorage.getItem('test');
      $items = JSON.parse($items);
      for($i in $items){
        if($items[$i].check == "false"){
          $items[$i].check = "true";
        }
      }
      $items = JSON.stringify($items);
      localStorage.setItem('test',$items);
      F5();
    }
    
  });
  $('#remove-active').click(function(){
    $items = localStorage.getItem('test');
    $items = JSON.parse($items);
    for($i in $items){
      if($items[$i].check == "true"){
        $items[$i].check = "false";
      }
    }
    $('#myUL li').removeClass('checked');
    $('#myUL li').addClass('active');
    $items = JSON.stringify($items);
    localStorage.setItem('test',$items);
  });
  function resetActive () {
  $('#all').removeClass('att');
  $('#active').removeClass('att');
  $('#complete').removeClass('att');
  }

});