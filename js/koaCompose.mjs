
const middleware = []
middleware.push((next) => {
  console.log(1);
  next()
  // next()
  console.log(1.1);
})

middleware.push((next) => {
  console.log(2);
  next()
  console.log(2.1);
})

middleware.push((next) => {
  console.log(3);
  next()
  console.log(3.1);
})

// function compose(middleares) {
//   let index = -1;
//   const dispatch = (i) => {
//     if (i <= index) throw new Error('next() 不能调用多次');
//     index = i;
//     if (i >= middleares.length) return;
//     const middleare = middleares[i];
//     // next 是把下一个中间件传入
//     return middleare(dispatch.bind(null, i + 1));
//   }
//   return dispatch(0);
// }

/**
 * 每次执行next的时候，闭包里的i都会增加一个，如果i > index 就说明next被调用了两次
 * @param {*} middleare 
 * @returns 
 */
function compose(middleare) {
  let i = 0
  return function () {
    const run = (index) => {
      if (index !== i) throw new RangeError('一个中间件next调用多次')
      if (index > middleare.length - 1) return // 最后一个中间件的next不执行
      const callfun = middleare[index]
      return callfun(run.bind(null, ++i)) // 把下一个中间件传给当前的中间件
    }
    run(i)
  }
}

fn = compose(middleware)
fn()
// const app = {
//   middlewares: [],
//   callback(ctx) {
//     console.log(ctx);
//   },
//   use(fn) {
//     this.middlewares.push(fn);
//   },
//   go(ctx) {
//     let index = 0;
//     const next = () => {
//       index++;
//     }
//     this.middlewares.map((fn, i) => {
//       if (index === i) fn(ctx, next); // 需要调用next才会有增加index，从而调用下一个中间件
//     });
//     if (index === this.middlewares.length - 1) { // 执行完
//       this.callback(ctx);
//     }
//   }
// }

// app.use((ctx, next) => {
//   ctx.name = 'Lucy';
//   console.log(1);
//   next();
//   console.log(1.1);
// });

// app.use((ctx, next) => {
//   ctx.age = 15;
//   console.log(2);
//   // next();
//   console.log(2.1);

// });

// app.use((ctx, next) => {
//   const { name, age } = ctx;
//   console.log(3);
//   console.log(`my name is ${name}, I am ${age} years old!`);
// });
// app.go({});