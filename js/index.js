// 变量的比较
console.log('{} == {}', {} == {});
console.log('NaN == NaN', NaN == NaN);
console.log('null == null', null == null);
console.log('null === null', null === null);
console.log('undefined == null', undefined == null);
console.log('undefined === null', undefined === null);
console.log('undefined == undefined', undefined == undefined);
console.log('undefined === undefined', undefined === undefined);
console.log('[] === []', [] == []);
console.log("2 + 10+ '' + 20", 2 + 10+ '' + 20);

// class ES5实现继承
function Super(){
    // console.log('arguments', arguments);
    const [ name = 'super', age = 25, type = 'string' ] = Array.from(arguments);
    this.name=name;
    this.age=age;
    this.array=[1, 2, 3];
    this.obj={ a: 'prop' };
    this.say=function(){
      console.log(`${this.name} from parent`);
    }
}
Super.prototype.testInherit=function(){
  console.log('I am method of super prototype')
}

// 1.构造函数里边调用父类的构造函数
function Subchild(name, age, type) {
    this.type = type;
    // console.log('arguments', arguments);
    Super.call(this, ...arguments);
    this.speak= function() {
      console.log(`${this.name} from child`);
    }
}
const child1 = new Subchild('望着', 20, 'string');
console.log(child1);
child1.say();
child1.speak();
console.log('通过构造函数继承的实例是否是Super的实例', child1 instanceof Super);


// 2. 原型链的继承
function SubChild2(color) {
  this.color = color;
}
SubChild2.prototype = new Super();
const instancechild2 = new SubChild2('green');
const instancechild3 = new SubChild2('blue');
instancechild2.array.push(4,5);
console.log('第一个实例的array',instancechild2.array);
console.log('第二个实例的array', instancechild3.array);
instancechild2.say(); // 调用父类的方法
console.log('通过原型链实现的继承的实例是否是Super的实例', instancechild2 instanceof Super);
instancechild2.testInherit();




// const defineGet = function(data, key, value) {
//     console.log(data);
//     console.log(`get key: ${key} value: ${value}`)
//     return value
// }
function defineReactive(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function defineGet() {
            console.log(`get key: ${key} value: ${value}`)
            return value
        },
        set: function defineSet(newVal) {
            console.log(`set key: ${key} value: ${newVal}`)
            value = newVal
        }
    })
}

function observe(data) {
   Object.keys(data).forEach(function(key) {
       defineReactive(data, key, data[key])
   })
}
// 当我们获取数组和改变已有索引当元素时，是可以监测到的
// 对象和数组的新增属性和新增元素不能被检测到，数组通过length长度属性更改数组的也不能被检测到
let arr = [1, 2, 3];
let obj = { a: 1, b: 2, c: 3 };
observe(obj);
observe(arr);




