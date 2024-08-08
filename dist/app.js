"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireWildcard(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

/**
 * วางแพลนก่อนจะใช้ Data กับอะไรใช้ทำอะไร
 * TODO
 * Create todo  #Post
 * update todo by id
 * delete todo by id
 * get to by id
 */

/*
    *id
    *status = completed, in-progress, canceled
    *name
*/

// สร้างตัวแปร todoList สำหรับเก็บข้อมูล  
var todoList = [];

//สร้างหลายรายการ
app.post('/todos/bulk', function (req, res) {
  var _todoList;
  //เก็บข้อมูลไว้ในตัวแปร totoList ที่ประกาศรับข้อมูล ด้วย Destructuring การรับข้อมูลที่ไม่ทราบจำนวน,ขนาดของข้อมูล ข้อมูลจะเป็น array
  (_todoList = todoList).push.apply(_todoList, _toConsumableArray(req.body));
  //ส่งตอบกลับ client
  res.send(req.body);
});

// สร้างข้อมูล
app.post('/todos', function (req, res) {
  //เก็บข้อมูลไว้ในตัวแปร totoList ที่ประกาศรับข้อมูล
  todoList.push(req.body);
  //ส่งตอบกลับ client
  res.send(req.body);
});

// ลบข้อมูล
app["delete"]('/todos/:id', function (req, res) {
  // หาตำแหน่ง index ของ data ที่จะลบ ผ่าน id
  var todoIndex = todoList.findIndex(function (todo) {
    return todo.id === req.params.id;
  });
  if (todoIndex === -1) {
    // ตอบกลับ status 404 ถ้าไม่พบข้อมูล
    res.status(404).send("Todo not found");
    return;
  }
  // ใช้ methode splice ลดค่าใน array ออก ใช้ parameter ตำเเหน่งใน array, จำนวนที่จะเอาออก
  todoList.splice(todoIndex, 1);
  //ส่งตอบกลับ client
  res.send(req.params.id);
});

//ลบหลายรายการ
app["delete"]('/todos', function (req, res) {
  // ใช้ methode split แยกตัวอักษร
  var listIds = req.query["in"].split(',');
  console.log(listIds);
  // ใช้ filter สำหรับกรองสมาชิกใน array ใช้ .includes ในการค้นหาค่าใน array ในการค้นหา โดย includes จะเป็นการเช็คว่า array นั้นมีค่าที่เราต้องการจะค้นหาอยู่หรือไม่
  // ใส่ ! คือห้ามอยู่ใน listIds ตัวแปรที่ประกาศ
  todoList = todoList.filter(function (todo) {
    return !listIds.includes(todo.id);
  });

  // ใช้ query เพื่อรับค่า params id หลายรายการ  && ส่วน url ใช้ ?in รับ params id หลายรายการ
  res.send(listIds);
});

// เขียนทับข้อมูล
app.put('/todos/:id', function (req, res) {
  // หาตำแหน่ง index ของ data ที่จะเขียนทับ ผ่าน id
  var todoIndex = todoList.findIndex(function (todo) {
    return todo.id === req.params.id;
  });
  if (todoIndex === -1) {
    // ตอบกลับ status 404 ถ้าไม่พบข้อมูล
    res.status(404).send("Todo not found");
    return;
  }

  //เขียนทับข้อมูล ตามตำแหน่ง Index ที่ระบุไว้ผ่านตัวแปรที่รับค่ามา
  todoList[todoIndex] = req.body;

  //ส่งตอบกลับ client
  res.send(todoList[todoIndex]);
});

// แก้ไขข้อมูล
app.patch('/todos/:id', function (req, res) {
  // หาตำแหน่ง index ของ data ที่จะแก้ไข ผ่าน id
  var todoIndex = todoList.findIndex(function (todo) {
    return todo.id === req.params.id;
  });
  if (todoIndex === -1) {
    // ตอบกลับ status 404 ถ้าไม่พบข้อมูล
    res.status(404).send("Todo not found");
    return;
  }

  //แก้ไขค่า ใช้วิธี Destructuring การ Marge Opj, Array เข้าด้วยกัน
  todoList[todoIndex] = _objectSpread(_objectSpread({}, todoList[todoIndex]), req.body);
  res.send(todoList[todoIndex]);
});

// ค้นหาข้อมูล
app.get('/todos/:id', function (req, res) {
  // หาตำแหน่ง index ของ data ที่จะค้นหา ผ่าน id
  var todo = todoList.find(function (todo) {
    return todo.id === req.params.id;
  });
  if (todo) {
    res.send(todo);
  }
  res.status(404).send('Todo not found');
});

// รับข้อมูล
app.get('/todos', function (req, res) {
  //ส่งตอบกลับ client
  res.send(todoList);
});

//สร้าง serve port 3000
app.listen(3000, function () {
  console.log('http://localhost:3000');
});