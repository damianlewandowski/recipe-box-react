const increment = function(initialValue) {
  let i = initialValue;
  return function() {
    return ++i
  }
}

export default increment;