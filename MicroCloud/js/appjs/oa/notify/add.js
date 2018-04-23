var prefix = contpath + "oa/notify";
var prefixs = contpath + "common/sysDict/list";
var prefixt = contpath + "sys/user";
$().ready(function() {
	loadType();
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		/*url : "../../oa/notify/save",*/
		url : prefix + '/save',
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			name : {
				required : true
			}
		},
		messages : {
			name : {
				required : icon + "请输入姓名"
			}
		}
	})
}
function loadType(){
	var html = "";
	$.ajax({
		/*url : '../../common/sysDict/list/oa_notify_type',*/
		url : prefixs + 'oa_notify_type',
		success : function(data) {
			//加载数据
			for (var i = 0; i < data.length; i++) {
				html += '<option value="' + data[i].value + '">' + data[i].name + '</option>'
			}
			$(".chosen-select").append(html);
			$(".chosen-select").chosen({
				maxHeight : 200
			});
			//点击事件
			$('.chosen-select').on('change', function(e, params) {
				console.log(params.selected);
				var opt = {
					query : {
						type : params.selected,
					}
				}
				$('#exampleTable').bootstrapTable('refresh', opt);
			});
		}
	});
}

var openUser = function(){
	layer.open({
		type:2,
		//UPD START BY 李泽辉 20180322
		/*title:"选择人员",*/
		title:"选择部门",
		//UPD END BY 李泽辉 20180322
		area : [ '300px', '450px' ],
		/*content:"../../sys/user/treeView"*/
		content: prefixt + 'treeView'
	})
}

function loadUser(deptIds,deptNames){
	$("#deptIds").val(deptIds);
	$("#deptNames").val(deptNames);
}