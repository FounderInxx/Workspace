
var prefix = contpath+"equip/equipIn"
$(function() {
	load();
});

function load() {
	$('#exampleTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix + "/inlist", // 服务器数据的加载地址
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
								offset:params.offset
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
									field : 'eqCode', 
									title : '设备编码' 
								},
								{
									field : 'eqName', 
									title : '设备名称' 
								},
								{
									field : 'eqTypeName', 
									title : '设备分类' 
								},
								{
									field : 'eqSpec', 
									title : '规格' 
								},
								{
									field : 'model', 
									title : '型号' 
								},
								{
									field : 'manufacturer', 
									title : '生产厂家' 
								},
								{
									field : 'facNumber', 
									title : '出厂编号' 
								},
								{
									field : 'startDate', 
									title : '开始使用日期' 
								},
								{
									field : 'useDeptName', 
									title : '使用部门' 
								},
								{
									field : 'eqState', 
									title : '设备状态',
									formatter : function(value, row, index) {
										if (value == '0') {
											return '<span>在用</span>';
										} else if (value == '1') {
											return '<span>备用</span>';
										} else if (value == '2') {
											return '<span>检修</span>';
										}else if(value == '3'){
											return '<span>停用</span>';
										}else if(value == '4'){
											return '<span>待报废</span>';
										}else if(value == '5'){
											return '<span>报废</span>';
										}
									}

								},
								{
									field : 'dutyUser', 
									title : '责任人' 
								},
								{
									title : '操作',
									field : 'id',
									align : 'center',
									formatter : function(value, row, index) {
										var s = '<a class="btn btn-primary btn-sm" href="#" mce_href="#" title="查看" onclick="select(\''
												+ row.id
												+ '\')"><i class="fa fa-eye"></i></a> ';
										var e = '<a class="btn btn-primary btn-sm " href="#" mce_href="#" title="编辑" onclick="edit(\''
												+ row.id
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm " href="#" title="删除"  mce_href="#" onclick="removebyid(\''
												+ row.id
												+ '\')"><i class="fa fa-remove"></i></a> ';
										var f = '<a class="btn btn-primary btn-sm" href="#" title="入台账"  mce_href="#" onclick="auditByid(\''
												+ row.id
												+ '\')"><i class="fa fa-check"></i></a> ';
										return s + e + d + f ;
									}
								} ]
					});
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}
function add() {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/add' // iframe的url
	});
}
function edit(id) {
	layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/edit/' + id // iframe的url
	});
}
function select(id) {
	layer.open({
		type : 2,
		title : '查看',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/select/' + id // iframe的url
	});
}
function removebyid(id) {
	layer.confirm('删除后不可恢复！是否继续删除？', {
		btn : [ '是', '否' ]
	}, function() {
		$.ajax({
			url : prefix+"/remove",
			type : "post",
			data : {
				'id' : id
			},
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					reLoad();
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}

function resetPwd(id) {
}
function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	layer.confirm("删除后不可恢复！是否继续删除？", {
		btn : [ '是', '否' ]
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
			url : prefix + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}
function auditByid(id){
	layer.confirm("确认审核通过这条数据吗?", {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			type : 'POST',
			data : {
				"id" : id
			},
			url : prefix + '/auditByid',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}
function audit(){
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要审核的数据");
		return;
	}
	layer.confirm("确认审核通过选中的'" + rows.length + "'条数据吗?", {
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
			url : prefix + '/audit',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}
function auditFail(){
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要审核不通过的数据");
		return;
	}
	layer.confirm("确认审核【不通过】选中的'" + rows.length + "'条数据吗?", {
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
			url : prefix + '/auditFail',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}