/*
 * @Description: 基于 Bootstrap 的高级搜索
 * @Author: Founderinxx 
 * @Date: 2018-04-25 18:32:00 
 * @Last Modified by: Founderinxx
 * @Last Modified time: 2018-05-04 18:44:32
 */

var treeVal;
var formData = {};
// 引入分类树
$('.ibox').on('click','.eqTypeName',function(){
	treeVal = $(this);
	layer.open({
		type:2,
		title:"选择分类",
		area : [ '300px', '450px' ],
		content:contpath+"equip/eqType/typeTreeView"
	})
});

// 分类树多选
// treeVal 是通过 layer 的 parent 传递过来的
function loadEqType(treeVal,result){
	//$("#eqType").val(typeId);
	// 重置文本框
	treeVal.val('');
	// 选中的节点数为1
	if(result.length == 1){
		treeVal.val(result[0].text);
	}else{
		// 选中的节点数大于1，用','将字符分隔
		for(var i = 0;i<result.length;i++){
			var selectAll = result[i].text;
			for(var j = 0;j < i;j++){
				selectAll = treeVal.val() + ',' + result[i].text;
			}
			treeVal.val(selectAll);
		}
	}
}
// 主方法
;(function($){  
    $.fn.extend({  
        "AiSearch":function(){
    		// 启用  AiSearch 搜索插件
        	var complete = this;
    		AiSearch(complete);	
        	function AiSearch(complete){
        		// 定义收缩面板	
        		var AiSearchPanel = '';
        		AiSearchPanel += '	<div class="AiSearch"> \
        									<div class="panel panel-primary"> \
        										<a id="collapse" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"> \
		        									<div class="panel-heading" style="overflow:hidden"> \
		        										<div class="columns pull-left col-md-2 nopadding"> \
		        											<div class="panel-title"><i class="fa fa-search" aria-hidden="true"></i>多重搜索</div> \
		        										</div> \
		        										<div class="pull-right nopadding"> \
	        									  			<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"> \
	        									  			</span> \
		        										</div> \
		        									</div> \
        										</a> \
	        									<div class="panel-body collapse" id="collapseExample"> \
	        										<div class="col-md-3"> \
	        											<div class="form-inline"> \
	        									  			<label class="control-label">请选择想要搜索的内容：</label> \
	        												<select data-placeholder="选择类别" class="form-control chosen-select colName-select"> \
        														<option value="">选择搜索类别</option>';
        		
        		//$.post("demo_ajax_gethint.asp",{suggest:txt},function(result){												
	        		var result = [['name', '姓名', 'input'], ['sex', '性别', 'select'], ['start', '日期', 'date'],['dept', '部门', 'tree']];
	        		$.each(result, function(i, item) {
	        			AiSearchPanel += '<option value="'+item[0]+'" dataType="'+item[2]+'">'+item[1]+'</option>';
	        		});
        		//});
        		
        		AiSearchPanel += '		</select> \
									</div> \
								</div> \
								<form class="form-horizontal"> \
									<div class="columns col-sm-12 nopadding search-box"> \
										<div class="form-group"></div> \
										<div class="btn-group"> \
											<div class="form-inline"> \
											  <button id="submit-btn" type="button" class="btn btn-success">搜索</button> \
											  <button id="reset-btn" type="button" class="btn btn-warning">重置</button> \
											</div> \
										</div> \
									</div> \
								</form> \
        						<input class="val-hide" type="hidden"> \
						  	</div> \
					  	</div> \
					</div>'	;
        		// 加载收缩面板,加载到 .ibox-body 内起始位置
        		complete.prepend(AiSearchPanel);	
        		
        		// 收缩面板
        		$('#collapse').click(function(){
        			if($('#collapse').attr('aria-expanded') == 'false'){
        				$('#collapse span').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');							
        			}else{
        				$('#collapse span').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');							
        			}
        		})       		
        	    
        	    // 下拉框内容改变时触发
        	    $('.colName-select').change(function(){
        	    	var pick = $('.colName-select option:selected').val();
        	    	var dataType = $('.colName-select option:selected').attr('dataType');
        	    	// 当下拉框中的值不为空时
        	        if(pick != ''){
        	            var pickName = $('.colName-select option:selected').text();
        	        	if(dataType == 'tree'){
        	        		// 分类树
        	        		var tree = '<div class="col-sm-3"><label class="col-sm-4 control-label" data-code='+pick+' data-type="tree">'+pickName+'：</label><div class="col-sm-8 input-delete"><input class="form-control eqTypeName" type="text" placeholder="设备分类"><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
        	        		$('.search-box .form-group').append(tree);
        	        	}else if(dataType == 'date'){
        	        		// 日期控件
        	        		var date = '<div class="col-sm-3"><label class="col-sm-4 control-label" data-code='+pick+' data-type="date">'+pickName+'：</label><div class="col-sm-8 input-delete"><input class="form-control input-date" type="text" placeholder="开始 到 结束"><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
        	        		$('.search-box .form-group').append(date);        		
        	        		// Laydate 日期格式化
        	        		laydate.render({
        	        			  elem: '.input-date',
        	        			  range: true
        	    			}); 
        	        	}else if(dataType == 'select'){
        	        		// 多选下拉框
        	        		var select = '<div class="col-sm-3"><label class="col-sm-4 control-label" data-code='+pick+' data-type="select">'+pickName+'：</label><div class="col-sm-8 input-delete"><select data-placeholder="选择搜索类别" class="chosen-select form-control choses" multiple><option value="1">1</option><option value="2">2</option></select><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
        	        		$('.search-box .form-group').append(select);
        	        		$(".choses").chosen();
        	        	}
        	        	else if(dataType == 'input'){
        	        		// 文本框
        	        		 var input = '<div class="col-sm-3"><label class="col-sm-4 control-label" data-code='+pick+' data-type="input">'+pickName+'：</label><div class="col-sm-8 input-delete"><input class="form-control" type="text"><div class="mybtn btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></div></div></div>';
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
        	        // 数据获取
        	    	var inputNum = $('.form-horizontal label').length;
        	    	// 判断控件类型,以 formData 对象的形式向后台传数据
        	    	for(var i=0;i<inputNum;i++){
        	    		debugger
            	    	var type = $('.form-horizontal label').eq(i).data('type');
        	    		//formData['ncr['+i+'].field'] = $('.form-horizontal label').eq(i).data('code');
        	    		var field = $('.form-horizontal label').eq(i).data('code');
        	    		if(type == "input" || "date"){  
        	    			formData[field] = $('.form-horizontal .input-delete').eq(i).children().val();
        	    			//formData['ncr['+i+'].inner'] = $('.form-horizontal .input-delete').eq(i).children().val();
        	    		}else if(type == "select"){
        	    			var myStr = $('.form-horizontal .input-delete').eq(i).children().val().join("-");
        	    			formData[field] = myStr;
        	    			//formData['ncr['+i+'].inner'] = myStr; 
        	    		}else if(type == "tree"){
        	    			var myStr2 = $('.form-horizontal .input-delete').eq(i).children().val().split(",").join("-");
        	    			formData[field] = myStr2;
        	    			//formData['ncr['+i+'].inner'] = $('.form-horizontal input').val(); 
        	    		}
        	    	}
        	    	// json 对象转字符串
        	    	// $('.val-hide').val(JSON.stringify(formData));
        	    	load(formData);
        	    	reLoad();
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