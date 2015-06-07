$(function(){

	var files =[];

	var banned = document.getElementById("banned");
	var success = document.getElementById("success");
	var text = document.getElementById("text");
	var drop = document.getElementById("drop");
	var sendBtn = document.getElementById("btn");


	if (window.File) {
		// window.alert("File APIが実装されてます。");
		drop.addEventListener("dragover", onDragOver, false);
		drop.addEventListener("drop", onDrop, false);
	} 
	else {
		window.alert("本ブラウザではFile APIが使えません");
	}


	function onDragOver(event){
		event.preventDefault();
	}//--onDragOver

	function onDrop(event) {
		event.preventDefault();
		var keep = event.dataTransfer.files;
		files = keep;

		var filesType = files[0].type;
		//ファイルの拡張子の有無でフォルダのドロップ防止。
		if(filesType===""){
			del();
			$("#text").removeClass("active");
			$("#text").addClass("hide");
			$("#banned").addClass("active");
			$("#success").removeClass("active");

		}
    //単一ファイル時のみ送信・削除ボタン追加。ファイルプロパティを表示。
		else if(files.length==1){
			$("#btn").addClass("active").addClass("btn");
			$("#drop").addClass("active");
			$("#text").addClass("hide");
			$("#text").removeClass("active");
			$("#banned").removeClass("active");
			$("#success").removeClass("active");

			addBtn();
 		}
    //それ以外の時、ファイル削除する事で複数ファイルのドロップ防止。
		else{
			del();
			$("#text").removeClass("active");
			$("#text").addClass("hide");
			$("#banned").addClass("active");
		}
	}//--onDrop

  //削除・送信ボタン追加。プロパティ表示。
	function addBtn(){	
		var f=files[0];
		$("#disp").html('<div id="zero1" ><button type="button" id="zero" >削除</button>ファイル名 :' + f.name + '<br>' +  'ファイルの型:' + f.type + '<br>' + 'ファイルサイズ:' + f.size / 1000 + 'KB<br /></div>');
		$("#zero").click(del);
	}// -- addBtn			

	function del(){
		$("#btn").removeClass("active");
		$("#drop").removeClass("active");
		$("#text").addClass("active");
		$("#disp").html("");
		files=null;
		console.log("pass delBtn!");
	} //-del

  //送信ユニット
	$("#btn").click(function(){
		$("#drop").removeClass("active");
		$("#btn").removeClass("active");
		$("#zero").addClass("hide");
		$("#success").addClass("active");

		var file=files[0];
		var formData=new FormData();
        formData.append('name', file.name);
        formData.append('file', file);

		$.ajax({
			type:"POST",
			url:'./upload.php',
			contentType:false,
			processData: false ,
			data: formData,

			success:function(returnData){
				console.log("success!");
				console.log(returnData);
				del();
				$("#text").removeClass("active");
				//処理を書く
			},error:function(returnData){

			} //error
		});//ajax
	});//	$("#btn").click(function()
});
