global.$html = function(tagname, params={}) {
  var $tag = $(`<${tagname}>`);
  $tag.attr(params);
  return $tag;
}
global.$select = function(params) {
  var options= params.options || [];
  var selectedVal= params.selectedVal || "";
  var name = params.name || ""
  var $select = $html("select", {name});
  options.forEach( (data) => {
    var $option = $(`<option value="${data.val}">${data.name}</option>`);
    if ( data.val == selectedVal ) {
      $option.attr("selected", "selected");
    }
    $select.append($option);
  });
  return $select;
};
