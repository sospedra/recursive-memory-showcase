const TICK = 1000

/**
 * Main job of the loop
 * @return Number nextValue
 */
const update = (x) => {
  console.log(`Execute \`update\` fn with argument {x} as ${x}`)
  return x
}

/**
 * Curry a function with the next execution arguments
 * In this example is incrementing by 1. Could be a replace of
 * a given param, a more complex calculation or any other
 * business logic
 * @return Func -- stack target fn
 *  @return Func -- stack update fn returned value
 *    @return Func -- execute target fn with next exec value
 */
const genNext = (fn) => (x = 0) => () => fn(x + 1)

/**
 * Executes first call on start -- good for lifecycles
 * Generates its own next execution -- good for purity
 * @return Interval -- can be cleared
 */
const start = (next = genNext(update)(0)) => {
  console.log(`
    Start recursive memory showcase 🧠
    Ticks are executed every ${TICK} miliseconds
  `)

  return setInterval(() => {
    next = genNext(update)(next())
  }, TICK)
}

/** Kick off */
start()

