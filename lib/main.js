const errors = require('./errors')

module.exports = (clause, state) => {
  if (!clause) { throw errors.UNDEFINED_CLAUSE }
  if (!state) { throw errors.UNDEFINED_STATE }
  if (typeof (clause) !== 'string') { throw errors.CLAUSE_NOT_STRING }
  if (typeof (state) !== 'object' || Array.isArray(state)) { throw errors.STATE_NOT_OBJECT }
}
