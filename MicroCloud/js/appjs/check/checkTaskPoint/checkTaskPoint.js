
var prefix2 = contpath+"check/checkTaskPoint"
$(function() {
	load2();
});
var taskId;
function clickThis2(event){
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择一条路线");
		event.stopPropagation();
	}else if(rows.length > 1){
		layer.msg("请仅选择一条路线,您当前选中了"+rows.length+"条");
		event.stopPropagation();
	}
	taskId=rows[0].id;
	reLoad2();
	load2();
}
function load2() {
	$('#checkTaskLine-point')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix2 + "/pointlist", // 服务器数据的加载地址
						showRefresh : true,
						showToggle : true,
						showColumns : true,
						iconSize : 'outline',
						toolbar : '#exampleToolbar',
						striped : true, // 设置为true会有隔行变色效果
						dataType : "json", // 服务器返回的数据类型
						pagination : true, // 设置为true会在底部显示分页条
						// queryParamsType : "limit",
						// //设置为limit则会发送符合RESTFull格式的参数
						singleSelect : false, // 设置为true将禁止多选
						// contentType : "application/x-www-form-urlencoded",
						// //发送到服务器的数据编码类型
						pageSize : 10, // 如果设置了分页，每页数据条数
						pageNumber : 1, // 如果设置了分布，首页页码
						//search : true, // 是否显示搜索框
						showColumns : true, // 是否显示内容下拉框（选择显示的列）
						clickToSelect: true, // 单击行即可以选中
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
								taskId:taskId,
								likeStr:$('#searchName2').val(),
					           // name:$('#searchName').val(),
					           // username:$('#searchName').val()
							};
						},
						// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
						// queryParamsType = 'limit' ,返回参数必须包含
						// limit, offset, search, sort, order 否则, 需要包含:
						// pageSize, pageNumber, searchText, sortName,
						// sortOrder.
						// 返回false将会终止请求
						columns : [
								{
									checkbox : true
								},{
									field : 'checkDate', 
									title : '巡检日期' 
								},
																{
									field : 'lineCode', 
									title : '路线编码' 
								},{
									field : 'orgCode', 
									title : '机构代码' 
								},
																{
									field : 'checkType', 
									title : '巡检类型' 
								},{
									field : 'pointCode', 
									title : '巡检点编码' 
								},
																{
									field : 'pointName', 
									title : '巡检点名称' 
								},
																{
									field : 'checkClasses', 
									title : '班次' 
								},
																{
									field : 'checkUser', 
									title : '巡检人' 
								},
																{
									field : 'taskTotal', 
									title : '任务量' 
								},{
									field : 'remark', 
									title : '备注' 
								},{
									title : '操作',
									field : 'id',
									align : 'center',
									formatter : function(value, row, index) {
										var s = '<a class="btn btn-primary btn-sm" href="#" mce_href="#" title="查看" onclick="select2(\''
												+ row.id
												+ '\')"><i class="fa fa-eye"></i></a> ';
										var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="edit2(\''
												+ row.id
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove2(\''
												+ row.id
												+ '\')"><i class="fa fa-remove"></i></a> ';
										var f = '<a class="btn btn-success btn-sm" href="#" title="备用"  mce_href="#" onclick="resetPwd2(\''
												+ row.id
												+ '\')"><i class="fa fa-key"></i></a> ';
										return s ;
									}
								} ]
					});
}
function reLoad2() {
	$('#checkTaskLine-point').bootstrapTable('refresh');
}
function add2() {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix2 + '/add' // iframe的url
	});
}
function edit2(id) {
	layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix2 + '/edit/' + id // iframe的url
	});
}
function select2(id) {
	layer.open({
		type : 2,
		title : '查看',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix2 + '/select/' + id // iframe的url
	});
	reLoad2();
}
function remove2(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix2+"/remove",
			type : "post",
			data : {
				'id' : id
			},
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					reLoad2();
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}

function resetPwd2(id) {
}
function batchRemove2() {
	var rows = $('#checkTaskLine-point').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['id'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : prefix2 + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad2();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}