/**
 * 手动实现 new 操作符
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
