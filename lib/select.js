const errors = require('./errors')

function select (selector, target) {
  const key = selector.split('.')
  if (key.length === 1) { return target[key] }
  const tree = target[key.shift()]
  return tree ? select(key.join('.'), tree) : undefined
}

module.exports = (selector, state) => {
  if (!selector) { throw errors.UNDEFINED_SELECTOR }
  if (typeof selector !== 'string') { throw errors.SELECTOR_NOT_STRING }
  if (/[.]{2,}/.test(selector)) { throw errors.INVALID_SELECTOR }
  if (!state) { throw errors.UNDEFINED_STATE }
  if (typeof (state) !== 'object') { throw errors.STATE_NOT_OBJECT }
  if (Array.isArray(state)) { throw errors.STATE_NOT_OBJECT }

  return select(selector, state)
}
