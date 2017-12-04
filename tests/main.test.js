const main = require('../lib/main')
const errors = require('../lib/errors')

const mockClause = 'something===somthing'
const mockState = { state: 'object' }

describe('argument validation', () => {
  describe('clause', () => {
    it('throws "UNDEFINED_CLAUSE" if no clause is passed', () => {
      expect(() => { main() }).toThrow(errors.UNDEFINED_CLAUSE)
    })
    it('throws "CLAUSE_NOT_STRING" if the clause is not a string', () => {
      expect(() => { main(123, mockState) }).toThrow(errors.CLAUSE_NOT_STRING)
      expect(() => { main({ an: 'object' }, mockState) }).toThrow(errors.CLAUSE_NOT_STRING)
      expect(() => { main(['an', 'array'], mockState) }).toThrow(errors.CLAUSE_NOT_STRING)
    })
  })
  describe('state', () => {
    it('throws "UNDEFINED_STATE" if no state is passed', () => {
      expect(() => { main(mockClause) }).toThrow(errors.UNDEFINED_STATE)
    })
    it('throws "STATE_NOT_OBJECT" if the state is not an object', () => {
      expect(() => { main(mockClause, 'state') }).toThrow(errors.STATE_NOT_OBJECT)
      expect(() => { main(mockClause, 123) }).toThrow(errors.STATE_NOT_OBJECT)
    })
    it('throws "STATE_NOT_OBJECT" if the state is an array', () => {
      expect(() => { main(mockClause, ['an', 'array', 123]) }).toThrow(errors.STATE_NOT_OBJECT)
    })
  })
})
