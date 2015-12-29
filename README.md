# 联动装置
城市联动查询，省、省市、省市县三种查询方式可供选择。
这个省市联动是基于`bootstrap3`而写，依赖[标签页插件](http://v3.bootcss.com/javascript/#tabs)

省市：

![preview](https://raw.githubusercontent.com/floraluo/linkage/master/lib/images/preview.png)

##Options
###url
Type: json数组

省市县数据源

###tab
Type: `Boolean`

Default: `true`

控制下拉面板上tab切换是否显示，若不显示设置为`false`

###prov
Type: `String`

Default: `null`

设置默认省级城市

###city
Type: `String`

Default: `null`

设置默认市级城市

###dist
Type: `String`

Default: `null`

设置默认县级城市

###formatProvResult
Type: `Function`

Default:
```javascript
formatProvResult: function (result) {
 return {
  value: result.n,
  template: result.n,
  tab: result.n
 }
}
```

`value`是某个省，`template`是省级列表的模板，可自定义，`tab`是省列表面板的标签，也可自定义。若你的数据中key和我的默认的不一样，则这些都可自定义成你自己的数据格式，确保值正确就可以了。

Example:
```javascript
formatProvResult: function (result) {
 return {
  value: result.n,
  template: '<span>'+result.n+'</span>',
  tab: result.n
 }
}
```
###formatCityResult
Type: `Function`

Default:
```javascript
formatCityResult: function(result) {
 return {
	 value: result.n,
	 template: result.n,
	 tab: result.n
 }
}
```

市级自定义格式，返回数据同省一样可自定义

###formatDistResult
Type: `Function`

Default:
```javascript
formatDistResult: function(result) {
 return {
	 value: result.s,
	 template: result.s,
	 tab: result.s
 }
}
```

县级自定义格式，返回数据同省一样可自定义

###getCitys
Type: `Function`

Default:
```javascript
getCitys: function(results) {
	return results.c
}
```
获取指定省的所有市，当数据源格式不同时重新自定义指定，返回结果是一个json数组
###getDists
Type: `Function`

Default:
```javascript
getDists: function(results) {
	return results.a
}
```
获取指定市的所有省，当数据源格式不同时重新自定义指定，返回结果是一个json数组

##html模板
```html
<div class="col-md-3 example" id="example2">
	<input type="text" class="form-control linkage-input" id="input" placeholder="请选择一个城市" readonly="readonly">
	<div class="linkage-wrap">
		<div class="linkage">
			<div class="linkage-tab">
				<ul class="nav nav-tabs">
					<li class="active">
						<a href="#prov2" data-toggle="tab" class="value"></a>
					</li>
					<li class="">
						<a href="#city2" data-toggle="tab" class="value"></a>
					</li>
				</ul>
			</div>
			<div class="linkage-content tab-content">
				<div class="tab-pane active" id="prov2"></div>
				<div class="tab-pane" id="city2"></div>
			</div>
		</div>
	</div>			
</div>
```
这个模板基于bootstrap3的标签页插件html模板，在标签页的基本模板基础之上稍加改了一些。tabs的数量决定插件是查询省、省市、省市县的主要因素。其他的和使用bootstrap3的标签页插件一样。
插件主要组成为：
* 一个带唯一id`example2`的wrap div
* 一个input框，`linkage-input` class必需
* `linkage-wrap`、`linkage-tab`、`linkage-content`都是本插件必需
* `linkage-tab`里为`bootstrap3`标签页插件的`Nav tabs`部分，其中`<a>`标签上的`class="value"`为插件必需
* `linkage-content`既`bootstrap3`标签页插件的`Tab panes`部分
* 

这个html模板中的tabs部分可以自定义，正如我的`index.html`中一样

Example:
```html
<a href="#prov2" data-toggle="tab"><span class="value"></span></a>
```
注意：`class="value"`所在标签下不能包含子标签，这个标签是存放数据所用。

##Example
###插件调用

####多个同时调用
有几个input框为同样的数据源可以使用class调用
```javascript
$(".example").linkage({
	url: citylist
})
```


####设置默认值
```javascript
$("#example").linkage({
 url: citylist,
 prov: "四川",
 city: "成都"
})
```


####取消tab
```javascript
$("#example").linkage({
 url: citylist,
 tab: false
})
```
![取消tab预览](https://github.com/floraluo/linkage/blob/master/lib/images/notab.png)



###选择查询省、省市、省市县

####只查询省
```html
<div class="col-md-3 example" id="example2">
	<input type="text" class="form-control linkage-input" id="input" placeholder="请选择一个城市" readonly="readonly">
	<div class="linkage-wrap">
		<div class="linkage">
			<div class="linkage-tab">
				<ul class="nav nav-tabs">
					<li class="active">
						<a href="#prov2" data-toggle="tab" class="value"></a>
					</li>
				</ul>
			</div>
			<div class="linkage-content tab-content">
				<div class="tab-pane active" id="prov2"></div>
			</div>
		</div>
	</div>			
</div>
```

####联动查询省市
```html
<div class="col-md-3 example" id="example2">
	<input type="text" class="form-control linkage-input" id="input" placeholder="请选择一个城市" readonly="readonly">
	<div class="linkage-wrap">
		<div class="linkage">
			<div class="linkage-tab">
				<ul class="nav nav-tabs">
					<li class="active">
						<a href="#prov2" data-toggle="tab" class="value"></a>
					</li>
					<li class="">
						<a href="#city2" data-toggle="tab" class="value"></a>
					</li>
				</ul>
			</div>
			<div class="linkage-content tab-content">
				<div class="tab-pane active" id="prov2"></div>
				<div class="tab-pane" id="city2"></div>
			</div>
		</div>
	</div>			
</div>
```

####联动查询省市县
```html
<div class="col-md-3 example" id="example2">
	<input type="text" class="form-control linkage-input" id="input" placeholder="请选择一个城市" readonly="readonly">
	<div class="linkage-wrap">
		<div class="linkage">
			<div class="linkage-tab">
				<ul class="nav nav-tabs">
					<li class="active">
						<a href="#prov2" data-toggle="tab" class="value"></a>
					</li>
					<li class="">
						<a href="#city2" data-toggle="tab" class="value"></a>
					</li>
					<li class="">
						<a href="#dist2" data-toggle="tab" class="value"></a>
					</li>
				</ul>
			</div>
			<div class="linkage-content tab-content">
				<div class="tab-pane active" id="prov2"></div>
				<div class="tab-pane" id="city2"></div>
				<div class="tab-pane" id="dist2"></div>
			</div>
		</div>
	</div>			
</div>
```
