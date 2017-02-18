// 型を確かめる
// sample: is("String", new String("Test")) => true
// String
// Number
// Boolean
// Date
// Error
// Array
// Function
// RegExp
// Object
global.is = function(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}