let arr =[]
let arr1=[1,2,3]
let arr2=[4,5,6]
arr=[...arr1,...arr2]
console.log(arr);
console.log(...arr);
console.log([...arr]);



let obj={
    name:"jack",
    age:18
}
// console.log(...obj);//对象不能这样打印,会报错;但可以像下面这样打印
console.log({...obj});//打印{ name:"jack", age:18}

