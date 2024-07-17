export function throttle(fn, delay) {
  let last = 0;
  let timer = null;
  return function () {
    const now = Date.now();
    // now - last 当前时间距离上次触发过去了多久
    // remian，还剩下多长时间触发
    const remain = delay - (now - last);
    clearTimeout(timer); // 如果不清除定时器，会一直创建新定时器
    if (remain <= 0) {
      last = now;
      fn.apply(this, arguments);
    } else {
      timer = setTimeout(() => {
        last = Date.now(); // 触发后更新上次执行时间
        fn.apply(this, arguments);
      }, remain);
    }
  };
}

export function headThrottle(fn, delay) {
  let last = 0;
  return function () {
    const now = Date.now();
    if (now - last >= delay) {
      last = Date.now();
      fn.apply(this, arguments);
    }
  };
}

export function endThrottle(fn, delay) {
  let timer = null;
  return function () {
    // 第一次timer=null要调用fn，延迟后再调用fn
    if (timer === null) {
      timer = setTimeout(() => {
        // 开始赋值，到了delay后重新置为null
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
}
