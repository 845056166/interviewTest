function debounce(fn, delay) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    const context = this
    const arg = arguments
    timer = setTimeout(function () {
      fn.apply(context, arg)
    }, delay)
  }
}

export default debounce