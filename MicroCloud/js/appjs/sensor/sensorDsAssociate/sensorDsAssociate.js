
var prefix2 = contpath + "sensor/sensorDsAssociate"
var dsId;
function detailed2(){
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 1) {
		$(".query").removeClass("active");
		$(".queryDetails").addClass("active");		
		$("#tab-1").removeClass("active");
		$("#tab-2").addClass("active");
		$("#exampleTable2").bootstrapTable('destroy');
		dsId = rows[0].id;
		load2(rows[0].id);
	}else{
		layer.msg("请选择一条数据");
		return;
	}
}

function load2(dsId) {
	$('#exampleTable2')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix2 + "/list", // 服务器数据的加载地址
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
						clickToSelect: true, // 单击行即可以选中
						showColumns : true, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
								dsId:dsId
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
								},
																{
									field : 'sensorCode', 
									title : '传感器编号' 
								},
																{
									field : 'sensorName', 
									title : '传感器名称' 
								},
																{
									field : 'model', 
									title : '产品编号' 
								},
																{
									field : 'sensorType', 
									title : '传感器类型' 
								},
																{
									field : 'unit', 
									title : '量程单位' 
								},
																{
									field : 'upperRange', 
									title : '量程上限' 
								},
																{
									field : 'lowerRange', 
									title : '量程下限' 
								},
																{
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
										return s + e + d ;
									}
								} ]
					});
}
function reLoad2() {
	$('#exampleTable2').bootstrapTable('refresh');
}
function add2() {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix2 + '/add/' + dsId// iframe的url
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
	var rows = $('#exampleTable2').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
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