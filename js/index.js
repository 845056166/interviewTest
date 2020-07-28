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

/*
 * 1.构造函数里边调用父类的构造函数
 * 没有真正意义上实现继承，子类无法调用父类的静态属性
 * 拷贝的一份父类的属性和方法，所以子类修改引用类型的属性和方法，不会影响其他子类
 */
function Subchild(name, age, type) {
    this.type = type;
    this.dep = [1,2,3];
    // console.log('arguments', arguments);
    Super.call(this, ...arguments);
    this.speak= function() {
      console.log(`${this.name} from child`);
    }
}
const child1 = new Subchild('望着', 20, 'string');
const child2 = new Subchild('呵呵', 21, 'number');
console.log(child1);
child1.array.push(4);
console.log('改变了继承自Super属性的array');
console.log('child1的array', child1.array);
console.log('child2的array', child2.array);
child1.dep.push(4);
console.log('修改基于子类1的引用类型dep');
console.log('子类1的dep', child1.dep);
console.log('子类2的dep', child2.dep);
child1.say();
child1.speak();
console.log('通过构造函数继承的实例是否是Super的实例', child1 instanceof Super);


/**
 * 原型链的继承
 * 子类可以调用父类的静态属性（原型链上的方法）
 * 父类引用类型的属性： 当某一个子类改变了，会影响到其他子类
 */
function SubChild2(color) {
  this.color = color;
  this.dep = [1,2,3];
}
SubChild2.prototype = new Super();
const instancechild2 = new SubChild2('green');
const instancechild3 = new SubChild2('blue');
instancechild2.array.push(4,5);
console.log('=====修改了基于super的引用属性=====');
console.log('第一个实例的array',instancechild2.array);
console.log('第二个实例的array', instancechild3.array);
instancechild2.dep.push(4,5);
console.log('=====修改了基于子类的引用属性=====');
console.log('第一个实例的array',instancechild2.dep);
console.log('第二个实例的array', instancechild3.dep);
instancechild2.say(); // 调用父类的方法
console.log('通过原型链实现的继承的实例是否是Super的实例', instancechild2 instanceof Super);
instancechild2.testInherit();

/**
 * 组合式继承
 * 这种实现了继承，同时引用属性的改变不会互相影响，但是父类的构造函数执行了两次
 */
function SubChild3(name) {
  Super.call(this, ...arguments);
  this.name = name;
}
SubChild3.prototype = new Super('lucy');
const subChildInstance1 = new SubChild3('lancy');
const subChildInstance2 = new SubChild3('jack');
console.log(subChildInstance1);
subChildInstance1.array.push(4,5,6);
console.log(subChildInstance2);
// const defineGet = function(data, key, value) {
//     console.log(data);
//     console.log(`get key: ${key} value: ${value}`)
//     return value
// }
/**
 * 组合继承的改进版，解决父类构造函数调用了两次的问题
 */
function SubChil4(name) {
  Super.call(this, arguments);
  this.name = name;
}
SubChil4.prototype = Super.prototype;
SubChil4.contructor = SubChil4;
const child4Instance1 = new SubChil4('child4');
const child4Instance2 = new SubChil4('child5');
child4Instance1.array.push(7,3,2);
console.log('改变基于父类的引用属性');
console.log(child4Instance1.array);
console.log(child4Instance2.array);
console.log(Super.prototype.constructor);

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




