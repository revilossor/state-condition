const Clause = require('../lib/clause')
const errors = require('../lib/errors')
const symbols = require('../lib/symbols')

it('exports a Clause constructor', () => {
  const instance = new Clause('something=something')
  expect(instance).toBeInstanceOf(Clause)
})

describe('constructor', () => {
  describe('converts string clause into array structure', () => {
    describe('equality', () => {
      symbols.equality.forEach(equalitySymbol => {
        it(`with ${equalitySymbol}`, () => {
          const instance = new Clause(`something${equalitySymbol}thing`)
          expect(instance.model).toEqual([
            { key: 'something', value: 'thing' }
          ])
        })
        it('trims whitespace from key and value', () => {
          const instance = new Clause(`something ${equalitySymbol} thing`)
          expect(instance.model).toEqual([
            { key: 'something', value: 'thing' }
          ])
        })
      })
    })
    describe('negation', () => {      // TODO not something not equals....
      const assertIsNot = (clause, key, value) => {
        const instance = new Clause(clause)
        expect(instance.model).toEqual([ 'NOT', { key, value } ])
      }
      symbols.negation.forEach(negationSymbol => {
        it(`${negationSymbol} alone means not equal`, () => {
          assertIsNot(`something${negationSymbol}thing`, 'something', 'thing')
        })
        symbols.equality.forEach(equalitySymbol => {
          it(`${negationSymbol}${equalitySymbol} means not equal`, () => {
            assertIsNot(`something${negationSymbol}${equalitySymbol}thing`, 'something', 'thing')
          })
          it(`${negationSymbol} ${equalitySymbol} (with a space) means not equal`, () => {
            assertIsNot(`something${negationSymbol}${equalitySymbol}thing`, 'something', 'thing')
          })
        })
        it(`${negationSymbol} at the start of clause means not equal`, () => {
          assertIsNot(`something${negationSymbol}thing`, 'something', 'thing')
        })
      })
    })
  })
})

/* eslint-disable no-new */
describe('argument validation', () => {
  it('throws "UNDEFINED_CLAUSE" if no clause is passed', () => {
    expect(() => { new Clause() }).toThrow(errors.UNDEFINED_CLAUSE)
  })
  it('throws "CLAUSE_NOT_STRING" if the clause is not a string', () => {
    expect(() => { new Clause(123) }).toThrow(errors.CLAUSE_NOT_STRING)
    expect(() => { new Clause({ an: 'object' }) }).toThrow(errors.CLAUSE_NOT_STRING)
    expect(() => { new Clause(['an', 'array']) }).toThrow(errors.CLAUSE_NOT_STRING)
  })
})
/* eslint-enable no-new */
