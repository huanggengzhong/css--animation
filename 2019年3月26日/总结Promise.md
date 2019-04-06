总结:Promise意思是承诺,在开发中,可以使我们更合理,更规范地处理异步操作的对象,它总有三种状态:初始化(panding),操作成功(fulfilled),操作失败(rejected);使用实例方法:then()和catch()来绑定处理程序;还提供了类的方法:Promise.all()和Promise.race()。
#### 一.Promise小案例
比如,我们要想在家吃顿饭，是要经过三个步骤的:
 1.洗菜做饭。
 2.坐下来吃饭。
 3.收拾桌子洗碗。

上面三种过程用三个函数来表示如下:

```js
state=1 ;// 我们先定义成功的状态为1
// 第一步: 1.洗菜做饭。
function step1(resolve,reject){
    console.log("1.开始洗衣做饭");
    
 if(state==1){
    resolve("洗菜做饭--完成");

 }else {
     reject("洗菜做饭--失败")
 }
}
// 第二步: 2.坐下来吃饭
function step2(resolve,reject){
    console.log("2.开始坐下来吃饭");
    
 if(state==1){
    resolve("坐下来吃饭--完成");

 }else {
     reject("坐下来吃饭--失败")
 }
}
// 第三步:3.收拾桌子洗碗。
function step3(resolve,reject){
    console.log("3.开始收拾桌子洗碗。");
    
 if(state==1){
    resolve("收拾桌子洗碗--完成");

 }else {
     reject("收拾桌子洗碗--失败")
 }
}
```
接着,我们分别用promise对象按顺序一步步来完成上面的操作:
1.Promise对象传入的是一个函数,三个步骤分别用三个then来表示,它会按一个个then往下执行,如果前面的then有错就不会继续往下一个then执行,大的结构如下:
```js
//Promise对象传入的是一个函数,三个步骤分别用三个then来表示
new Promise(step1).then().then().then()
```
2.在第一个then()里,也是传入一个函数,这个函数里有一个参数(自定义名val),这个val值就是step1中resolve里面的内容,然后继续return一个Promise对象,在新的Promise对象里继续传入step2这个函数.
```js
//Promise对象传入的是一个函数,三个步骤分别用三个then来表示
new Promise(step1).then(function(val){
    console.log(val);//打印"收拾桌子洗碗--完成"
    return new Promise(step2)//继续返回一个Promise对象
    
}).then().then()
```
3.第二个then和第一个then思路相同
```js
  //Promise对象传入的是一个函数,三个步骤分别用三个then来表示
  new Promise(step1)
    .then(function(val) {
      console.log(val) //打印"洗菜做饭--完成"
      return new Promise(step2) //继续返回一个Promise对象
    })
    .then(function(val) {
      console.log(val) //打印"收拾桌子洗碗--完成"
      return new Promise(step3) //继续返回一个Promise对象
    })
    .then()
```
4.在第三个then中因为不用继续下一个步骤,不用再返回Promise对象就可以了.

```js
  //Promise对象传入的是一个函数,三个步骤分别用三个then来表示
  new Promise(step1)
    .then(function(val) {
      console.log(val) //打印"洗菜做饭--完成"
      return new Promise(step2) //继续返回一个Promise对象
    })
    .then(function(val) {
      console.log(val) //打印"收拾桌子洗碗--完成"
      return new Promise(step3) //继续返回一个Promise对象
    })
    .then(function(val){
        console.log(val);//"收拾桌子洗碗--完成"
    })
```
上面结果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190319173420507.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
假设,第二步state状态改为2,则会报错

```js
// 第二步: 2.坐下来吃饭
function step2(resolve,reject){
    console.log("2.开始坐下来吃饭");
    state =2;
 if(state==1){
    resolve("坐下来吃饭--完成");

 }else {
     reject("坐下来吃饭--失败")
 }
}
```
报错如下:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190319173637340.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
最后附上完整的代码:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body></body>
</html>
<script>
  // promise意思是承诺的意思,在js中主要是为了解决回调地狱.
  /*比如,我们要想在家吃顿饭，是要经过三个步骤的:
   1.洗菜做饭。
   2.坐下来吃饭。
   3.收拾桌子洗碗。
  */
  state = 1 // 我们定义一个成功的状态
  // 第一步: 1.洗菜做饭。
  function step1(resolve, reject) {
    console.log('1.开始洗衣做饭')
    if (state == 1) {
      resolve('洗菜做饭--完成')
    } else {
      reject('洗菜做饭--失败')
    }
  }
  // 第二步: 2.坐下来吃饭
  function step2(resolve, reject) {
    console.log('2.开始坐下来吃饭')
    if (state == 1) {
      resolve('坐下来吃饭--完成')
    } else {
      reject('坐下来吃饭--失败')
    }
  }
  // 第三步:3.收拾桌子洗碗。
  function step3(resolve, reject) {
    console.log('3.开始收拾桌子洗碗。')
    if (state == 1) {
      resolve('收拾桌子洗碗--完成')
    } else {
      reject('收拾桌子洗碗--失败')
    }
  }
  //Promise对象传入的是一个函数,三个步骤分别用三个then来表示
  new Promise(step1)
    .then(function(val) {
      console.log(val) //打印"洗菜做饭--完成"
      return new Promise(step2) //继续返回一个Promise对象
    })
    .then(function(val) {
      console.log(val) //打印"收拾桌子洗碗--完成"
      return new Promise(step3) //继续返回一个Promise对象
    })
    .then(function(val){
        console.log(val);//"收拾桌子洗碗--完成"
    })
</script>
```
实际应用场景:比如我们在注册页面的时候,就用到了Promise对象,我们第一步发送请求去验证用户名是否已经注册,验证完用户名没有被注册后再进行第二步验证手机动态码,手机动态验证码正确了,然后再进行第三步把注册的信息写入数据库当中.


#### 二.Promise的设计初衷
在日常开发中,经常需要用到ajax请求,拿到数据后,再进行一些处理,比如再次发送请求,比如:

```js
// 请求A开始
$.ajax({
    success:function(res1){
        // 请求B开始
        $.ajax({
            success:function(res2){
                // 请求C开始
                $.ajax({
                    success:function(res3){
                        console.log(res3);     
                    }
                })
                // 请求C结束
            }
        })
         // 请求B结束
    }
})
// 请求A结束
```
上述请求顺序是后面依赖于前面的,就是前面执行完后才能执行后面的,即执行顺序:请求A->请求B->请求C.
带来不好的影响有:
1.可读性差,不直观,调试差;
2.B必须等到A请求完了再执行,消耗了更多的等待时间.
这种回调函数层层嵌套的形式,我们称之为回调地狱.
所以,ES6想到了办法治理它,于是就有了Promise,Promise能使我们更合理,更规范地处理异步操作.

#### 三.Promise的基本写法

```js
let pro=new Promise(function(resolve,reject){
    console.log('Promise');//创建后会立即执行,所以会打印Promise
    
})
```
用new关键字创建Promise对象,参数是一个匿名函数,里面有两个参数:resolve和reject,这两个参数均为方法。resolve方法用于处理异步操作成功后业务,reject方法用于操作异步操作失败后的业务.

#### 四.Promise有三种状态
1.pending:刚创建Promise实例的时候,即初始状态;
2,fulfilled:resolve方法调用的时候,即操作成功;
3.rejected:reject方法调用的时候,即操作失败.
上面状态只能从:初始化->成功或者初始后->失败.不能逆向转换，也不能在成功fulfilled 和失败rejected之间转换

```js
let pro=new Promise(function(resolve,reject){
    //初始化状态:pending
    if('操作成功'){
        resolve()
        // resolve方法调用,状态为fulfilled
    }else{
        reject()
        // reject方法调用,状态为rejected
    }
})
```
初始化实例后，对象的状态就变成了pending；当resolve方法被调用的时候，状态就变成了：成功fulfilled；当reject方法被调用的时候，状态就会有pending变成失败rejected。
#### 五.then()方法
了解了创建和状态,我们接着介绍一个最重要的方法:then()方法,它用来处理操作成功或操作失败后的处理程序。

```js
pro.then(function(res){
//操作成功的处理程序
},function(error){
// 操作失败的处理程序
})
```
.then()方法的参数是两个函数,一个是处理操作成功后的业务,另一个是处理操作失败后的业务(对于操作失败的程序Promis通常用catch方法来处理)。
#### 六.catch()方法
对于操作异常的程序，Promise专门提供了一个实例方法来处理：catch( )方法。

```js
pro.catch(function(error){
    //操作失败的处理程序
})
```
catch方法只接受一个参数,用于处理操作异常后的业务。
  综合上面五,六者两个方法，大家都建议将then方法用于处理操作成功，catch方法用于处理操作异常,也就是:


```js
  pro.then(function(res) {
    //操作成功的处理程序
  }).catch(function(error) {
    // 操作失败的处理程序
  })
```
为什么上述代码能够链式调用,因为then方法和catch方法都会返回Promise对象。

上述完整代码演示:

```js
let pro =new Promise(function(resolve,reject){
    let condition =true;//假设condition的值为true
    if(condition){
        resolve('操作成功');
    }else{
        reject('操纵失败');
    }
})
pro.then(function(res){
    console.log(res);//最终打印:操作成功
    
}).catch(function(error){
    console.log(error);
    
})
```
上面就是Promise用于处理操作异常的这个过程；如果多个操作之间层层依赖，我们用Promise又是怎么处理的呢？操作如下:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190326144110845.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
案例中，先是创建一个实例，还声明了4个函数，其中三个是分别代表着请求A，请求B，请求C；有了then方法，三个请求操作再也不用层层嵌套了。我们使用then方法，按照调用顺序，很直观地完成了三个操作的绑定，并且，如果请求B依赖于请求A的结果，那么，可以在请求A的程序用使用return语句把需要的数据作为参数，传递给下一个请求，案例中我们就是使用return实现传递参数给下一步操作的。

#### 更直观的图解
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019032615030231.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
#### 七.Promise.all()方法
Promise.all()方法:接受一个数组作为参数,数组的元素是Promise对象,当参数的实例对象的状态都为fulfilled时,Promise.all()才会有返回.

```js
let pro1=new Promise(
    function(resolve,reject){
        setTimeout(function(){
            resolve('实例1操作成功')
        },5000)
    }
)
let pro2=new Promise(
    function(resolve,reject){
        setTimeout(function(){
            resolve('实例2操作成功')
        },2000)
    }
)

Promise.all([pro1,pro2]).then(function(res){
    console.log(res);//5秒后打印:["实例1操作成功", "实例2操作成功"]
    
})
```

上述案例，我们创建了两个Promise实例：pro1和pro2，我们注意两个setTimeout的第二个参数，分别是5000毫秒和1000毫秒，当我们调用Promise.all( )方法的时候，会延迟到5秒才控制台会输出结果。

   因为2000毫秒以后，实例pro2进入了成功fulfilled状态；此时，Promise.all( )还不会有所行动，因为实例pro1还没有进入成功fulfilled状态；等到了5000毫秒以后，实例pro1也进入了成功fulfilled状态，Promise.all( )才会进入then方法，然后在控制台输出：["实例1操作成功","实例2操作成功"]。



   这个方法有什么用呢？一般这样的场景：我们执行某个操作，这个操作需要得到需要多个接口请求回来的数据来支持，但是这些接口请求之前互不依赖，不需要层层嵌套。这种情况下就适合使用Promise.all( )方法，因为它会得到所有接口都请求成功了，才会进行操作


#### 八.Promise.rase()方法
它的参数要求跟Promise.all( )方法一样，不同的是，它参数中的promise实例，只要有一个状态发生变化（不管是成功fulfilled还是异常rejected），它就会有返回，其他实例中再发生变化，它也不管了。

```js
let pro1=new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('实例1操作成功');
    },5000)
})
let pro2=new Promise(function(resolve,reject){
    setTimeout(function(){
        reject('实例2操作失败');
    },2000)
})
Promise.race([pro1,pro2]).then(function(res){
    console.log(res);
    
}).catch(function(error){
    console.log(error);//2秒后直接打印:实例2操作失败
    
})
```
上面结果:2秒后直接打印:'实例2操作失败', 同样是两个实例，实例pro1不变，不同的是实例pro2，这次我们调用的是失败函数reject,由于pro2实例中2000毫秒之后就执行reject方法，早于实例pro1的5000毫秒，所以最后输出的是：实例2操作失败。