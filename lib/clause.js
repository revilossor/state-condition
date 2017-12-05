const errors = require('./errors')
const symbols = require('./symbols')

const equalityRegExp = new RegExp(symbols.equality.join('|'))
const negationRegExp = new RegExp(symbols.negation.join('|'))
const andRegExp = new RegExp(symbols.and.join('|'))

function getAtom (string) {
  let isNegated = false
  if (string.match(negationRegExp)) {
    isNegated = true
    string = string.match(equalityRegExp)
      ? string.replace(negationRegExp, '')
      : string.replace(negationRegExp, '=')
  }
  const bits = string.split(equalityRegExp)

  const out = [{ key: bits[0].trim(), value: bits[1].trim() }]
  if (isNegated) { out.unshift('NOT') }

  return out
}

function getModel (string) {              // TODO this is quite smelly 
  if (string.match(andRegExp)) {
    let ands = string.split(andRegExp)
    ands = ands.map(getAtom)
    ands.unshift('AND')
    return ands
  } else {
    return getAtom(string)
  }
}

const Clause = function (stringClause) {
  if (!stringClause) { throw errors.UNDEFINED_CLAUSE }
  if (typeof (stringClause) !== 'string') { throw errors.CLAUSE_NOT_STRING }
  this.model = getModel(stringClause)
}

module.exports = Clause
