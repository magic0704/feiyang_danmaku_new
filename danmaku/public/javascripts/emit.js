//var socket = io();

var myplayer = $('#my-player');
$('#popupMenu_font a').click(function(e){
    $('#size').text($(e.target).text()).attr("danmaku-size",$(e.target).attr("danmaku-size"));
});

$('#popupMenu_mode a').click(function(e){
    $('#mode').text($(e.target).text()).attr("danmaku-mode",$(e.target).attr("danmaku-mode"));
});

$('#popupMenu_color a').click(function(e){
    $('#color').text($(e.target).text()).attr("danmaku-color",$(e.target).attr("danmaku-color"));
});



$('#btnSend').click(function(e){
    var myplayer = $('#my-player');
    //myplayer.append('<p><span style="color:' + 'red' + '">' + 'wbp' + '</span> @ ' + </p>');
    var socket = io();
    var colorlist = new Array();
    colorlist[0] = 8388608 //藏青
    colorlist[1] = 8388608 //藏青
    colorlist[2] = 32768 //墨绿
    colorlist[3] = 128 //红褐
    colorlist[4] = 0 //黑色
    colorlist[5] = 255 //红色
    colorlist[6] = 16711935 //洋红
    colorlist[7] = 16746496 //蓝色
    var num  = Math.floor((Math.random()*7)+1);
    e.preventDefault();
    var danmaku = {
        //"mode": Number($("#mode").attr("danmaku-mode")),
	"mode": 1,
        "text": $('#msg').val(),
        "stime":0,
        //"size": Number($("#size").attr("danmaku-size")),
        "size": 100,
        //"color":parseInt($("#color").attr("danmaku-color"),16),
        //"color":65280,
        "color":colorlist[num],
        "dur":10000
    };
    var msg=JSON.stringify(danmaku);
    console.log(msg);
    socket.emit('danmaku send',msg);
    myplayer.append(msg);
    $('#msg').val("");
});


window.addEventListener('load', function () {
    var socket = io();
    var CM1 = new CommentManager($('#my-comment-stage'));
    CM1.init();
    CM1.start();
  
    window.CM1 = CM1;
	
//	var socket = io();
    socket.on('danmaku show', function (msg) {
       //console.log(msg);
        $('#messages').append($('<li>').text(msg));
        var danmaku = JSON.parse(msg);
	//console.log(danmaku);
        CM1.send(danmaku);
    });
});
