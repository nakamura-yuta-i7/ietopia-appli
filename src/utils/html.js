$.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};
global.$html = function(tagname, params={}, $innerHtml=null) {
  var $tag = $(`<${tagname}>`);
  $tag.attr(params);
  if ($innerHtml) {
    $tag.append($innerHtml);
  }
  return $tag;
}
global.$select = function(params) {
  var options= params.options || [];
  var selectedVal= params.selectedVal || "";
  var name = params.name || ""
  var classes = (function() {
    return params.class || "ui dropdown"
  })();
  var $select = $html("select", {name, class: classes});
  options.forEach( (data) => {
    if ( is("String", data) ) {
      data = {
        val: data,
        name: data
      };
    }
    var $option = $(`<option value="${data.val}">${data.name}</option>`);
    if ( data.val == selectedVal ) {
      $option.attr("selected", "selected");
    }
    $select.append($option);
  });
  return $select;
};
