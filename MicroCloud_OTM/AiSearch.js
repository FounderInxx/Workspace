/*
 * @Description: 基于 Bootstrap 的高级搜索
 * @Author: Founderinxx 
 * @Date: 2018-04-25 18:32:00 
 * @Last Modified by:   Founderinxx 
 * @Last Modified time: 2018-04-25 18:32:00 
 */

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

;(function($){  
    $.fn.extend({  
        "AiSearch":function(){
    		// 启用 AiSearch 搜索插件
        	debugger
        	var complete = this;
    		AiSearch(complete);	
    		
        	function AiSearch(complete){
        		// 定义收缩面板	
        		var AiSearchPanel = '	<div class="AiSearch"> \
        									<div class="panel panel-primary"> \
	        									<div class="panel-heading" style="overflow:hidden"> \
	        										<div class="columns pull-left col-md-2 nopadding"> \
	        											<div class="panel-title"><i class="fa fa-search" aria-hidden="true"></i>多重搜索</div> \
	        										</div> \
	        										<div class="pull-right nopadding"> \
	        											<a id="collapse" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"> \
	        									  			<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"> \
	        									  			</span> \
	        											</a> \
	        										</div> \
	        									</div> \
	        									<div class="panel-body collapse" id="collapseExample"> \
	        										<div class="col-md-3"> \
	        											<div class="form-inline"> \
	        									  			<label class="control-label">请选择想要搜索的内容：</label> \
	        												<select data-placeholder="选择类别" class="form-control chosen-select colName-select"> \
	        													<option value="">选择搜索类别</option> \
	        												</select> \
	        											</div> \
	        										</div> \
	        										<form class="form-horizontal"> \
	        											<div class="columns col-sm-12 nopadding search-box"> \
	        												<div class="form-group"></div> \
	        												<div class="btn-group"> \
	        													<div class="form-inline"> \
	        													  <button id="submit-btn" type="submit" class="btn btn-success">搜索</button> \
	        													  <button id="reset-btn" type="button" class="btn btn-warning">重置</button> \
	        													</div> \
	        												</div> \
	        											</div> \
	        										</form> \
	        								  	</div> \
        								  	</div> \
        								</div>'	;
        		// 加载收缩面板,加载到 .ibox-body 内起始位置
        		complete.prepend(AiSearchPanel);	
        		
        		// 收缩面板
        		$('#collapse').click(function(){
        			debugger
        			if($('#collapse').attr('aria-expanded') == 'false'){
        				$('#collapse span').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');							
        			}else{
        				$('#collapse span').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');							
        			}
        		})
        		
        		// 填充下拉框 「option 的 val 应为后台传来的表头字段」
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
        	        	// 此处 if 语句判断中的 pick 字段因为后台传来的 type 类型
        	            var pickName = $('.colName-select option:selected').text();
        	        	if(pick == 'eqTypeName'){
        	        		// 分类树
        	        		var sort = '<div class="col-sm-3"><label class="col-sm-4 control-label" data-code='+pick+'>'+pickName+'：</label><div class="col-sm-8 input-delete"><input id="eqTypeName" class="form-control" type="text" onclick="TypeSelect()" placeholder="设备分类"><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
        	        		$('.search-box .form-group').append(sort);
        	        	}else if(pick == 'startDate'){
        	        		// 日期控件
        	        		var date = '<div class="col-sm-3"><label class="col-sm-4 control-label" data-code='+pick+'>'+pickName+'：</label><div class="col-sm-8 input-delete"><input class="form-control input-date" type="text" placeholder="开始 到 结束"><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
        	        		$('.search-box .form-group').append(date);        		
        	        		// Laydate 日期格式化
        	        		laydate.render({
        	        			  elem: '.input-date',
        	        			  range: true
        	    			}); 
        	        	}else if(pick == 'eqState'){
        	        		// 多选下拉框
        	        		var select = '<div class="col-sm-3"><label class="col-sm-4 control-label" data-code='+pick+'>'+pickName+'：</label><div class="col-sm-8 input-delete"><select data-placeholder="选择搜索类别" class="chosen-select form-control choses" multiple><option value="1">1</option><option value="2">2</option></select><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
        	        		$('.search-box .form-group').append(select);
        	        		$(".choses").chosen();
        	        	}
        	        	else{
        	        		// 文本框
        	        		 var input = '<div class="col-sm-3"><label class="col-sm-4 control-label" data-code='+pick+'>'+pickName+'：</label><div class="col-sm-8 input-delete"><input class="form-control" type="text"><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
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
        	    	// 判断控件类型,以 formData 对象的形式向后台传数据
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
        }  
    });  
})(jQuery); 



