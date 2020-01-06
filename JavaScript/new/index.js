/**
 * 手动实现 new 操作符
 * @param {*} fn 构造函数，第二个及后面的参数传递给构造函数
 */
function New(fn) {
    const instance = {}
    instance.__proto__ = fn.prototype

    const args = Array.prototype.slice.call(arguments, 1)
    const res = fn.apply(instance, args)

    // 如果构造函数有返回值并且为对象时，直接用该返回值，否则返回前面生成的实例
    if (res !== null && (typeof res === 'object' || typeof res === 'function')) {
        return res
    }
    return instance
}

// test
function Dog(name) {
    this.name = name
}

var dog = New(Dog, 'Tony')
console.log(dog.name) // 'Tony'
console.log(dog instanceof Dog) // true


/**
 * 
 * @param {*} instance 实例
 * @param {*} clazz 类
 */
 function instanceOf(instance, clazz) {
    if ( typeof clazz !== 'function') throw new Error('Right-hand error')
    if (instance === null || (typeof instance !== 'object' && typeof instance !== 'function')) return false

    const proto = clazz.prototype
    while (instance.__proto__) {
        if (instance.__proto__ === proto) return true
        instance = instance.__proto__
    }
    return false
 }

 // test
 var one = new Number(1)
 console.log(
    instanceOf(one, Number), // true
    instanceOf(one, Object) // true
 )