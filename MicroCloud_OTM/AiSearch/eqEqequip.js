
var prefix = contpath+"equip/eqEqequip"
$(function() {
	// 收缩面板
	collapse();
	// Bootstrap-Table
	load();	
	// 填充下拉框
	selectLoad();	
});



// 收缩面板
function collapse(){
	$('#collapse').click(function(){
		debugger
		if($('#collapse').attr('aria-expanded') == 'false'){
			$('#collapse span').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');							
		}else{
			$('#collapse span').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');							
		}
	})
}

// 引入分类树
var TypeSelect = function(){
	layer.open({
		type:2,
		title:"选择分类",
		area : [ '300px', '450px' ],
		content:contpath+"equip/eqType/typeTreeView"
	})
}

// 分类树多选
function loadEqType(typeId,typeName){
	//$("#eqType").val(typeId);
	if($('#eqTypeName').val() == ''){
		$('#eqTypeName').val(typeName);
	}else{
		var selectAll = $('#eqTypeName').val() + ',' + typeName;
		$('#eqTypeName').val(selectAll);
	}	
}

// 填充下拉框
function selectLoad(){
	var colLength = $('#exampleTable thead tr th').length - 2;
    for(var i=0;i<colLength;i++){
    	$('.colName-select').append('<option value=""></option>');
    	var colName = $('#exampleTable thead tr th:not(:first-child):not(:last-child)').eq(i).text();
    	var code = $('#exampleTable thead tr th:not(:first-child):not(:last-child)').eq(i).attr('data-field');
    	$('.colName-select option').eq(i+1).text(colName);
    	$('.colName-select option').eq(i+1).val(code);
    }
    // 下拉框内容改变时触发
    $('.colName-select').change(function(){
    	var pick = $('.colName-select option:selected').val();
    	// 当下拉框中的值不为空时
        if(pick != ''){
        	debugger;           
            var pickName = $('.colName-select option:selected').text();
        	if(pick == 'eqTypeName'){
        		// 分类树
        		var sort = '<div class="col-sm-3" style="margin-top: 15px;"><label class="col-sm-4 control-label" data-code='+pick+'>'+pickName+'：</label><div class="col-sm-8 input-delete"><input id="eqTypeName" class="form-control" type="text" style="cursor: pointer;" onclick="TypeSelect()" readonly placeholder="设备分类"><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
        		$('.search-box .form-group').append(sort);
        	}else if(pick == 'startDate'){
        		// 日期控件
        		var date = '<div class="col-sm-3" style="margin-top: 15px;"><label class="col-sm-4 control-label" data-code='+pick+'>'+pickName+'：</label><div class="col-sm-8 input-delete"><input class="form-control input-date" type="text" placeholder="开始 到 结束"><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
        		$('.search-box .form-group').append(date);        		
        		// Laydate 日期格式化
        		laydate.render({
        			  elem: '.input-date'
        			  ,range: true
        			}); 
        	}else if(pick == 'eqState'){
        		// 多选下拉框
        		var select = '<div class="col-sm-3" style="margin-top: 16px;"><label class="col-sm-4 control-label" data-code='+pick+'>'+pickName+'：</label><div class="col-sm-8 input-delete"><select data-placeholder="选择搜索类别" class="chosen-select form-control choses" multiple tabindex="4"><option value="1">1</option><option value="2">2</option></select><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
        		$('.search-box .form-group').append(select);
        		$(".choses").chosen();
        	}
        	else{
        		// 文本框
        		 var input = '<div class="col-sm-3" style="margin-top: 15px;"><label class="col-sm-4 control-label" data-code='+pick+'>'+pickName+'：</label><div class="col-sm-8 input-delete"><input class="form-control" type="text"><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
        		$('.search-box .form-group').append(input);
        	}
        }
    }); 
    
    // 移除所选的控件
    $('.search-box').on('click','.btn-minus',function(){
    	$(this).parent().parent().remove();	
    });

    // 提交数据
    $('#submit-btn').click(function(){
    	debugger;
        // 数据获取
    	var formData = {};
    	var inputNum = $('.form-horizontal label').length;
    	// 判断控件类型
    	for(var i=0;i<inputNum;i++){
    		formData['ncr['+i+'].field'] = $('.form-horizontal label').data('code');
    		if(type = "input"){   			
    			formData['ncr['+i+'].inner'] = $('.form-horizontal .input-delete').eq(i).children().val();
    		}else if(type = "select"){
    			var myStr = $('.form-horizontal .input-delete').eq(i).children().val().join("-");
    			formData['ncr['+i+'].inner'] = myStr; 
    		}else if(type = "sort"){
    			var myStr2 = $('.form-horizontal .input-delete').eq(i).children().val().split(",").join("-");
    			formData['ncr['+i+'].inner'] = $('.form-horizontal input').val(); 
    		}
    	}
    });
    
    // 重置数据
    $('#reset-btn').click(function(){
    	$('.form-horizontal .input-delete').children().val('');
    	$('.form-horizontal .chosen-select').val('');
    	$('.form-horizontal .chosen-select').trigger('chosen:updated');
    })
}

function load() {
	$('#exampleTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix + "/list", // 服务器数据的加载地址
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
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						clickToSelect: true, // 单击行即可以选中
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
								queryStr : $("#searchName").val()
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
										var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="修改" onclick="edit(\''
												+ row.id
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
												+ row.id
												+ '\')"><i class="fa fa-remove"></i></a> ';
										var f = '<a class="btn btn-success btn-sm" href="#" title="备用"  mce_href="#" onclick="resetPwd(\''
												+ row.id
												+ '\')"><i class="fa fa-key"></i></a> ';
										return s + e ;
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
function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
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
function applyToDelete(){
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要操作的数据");
		return;
	}
	for(var i=0;i<rows.length;i++){
		if(rows[i].eqState=='4'){
			layer.msg("待报废设备不能再次申请减少");
			return;
		}
	}
	layer.confirm("确认要申请减少选中的设备吗?", {
		btn : [ '确定', '取消' ]
	}, function() {
		var ids = new Array();
		var eqCodes = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['id'];
			eqCodes[i] = row['eqCode'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids, "eqCodes" : eqCodes
			},
			url : prefix + '/applyToDelete',
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