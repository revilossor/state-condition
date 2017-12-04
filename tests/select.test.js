const select = require('../lib/select')
const errors = require('../lib/errors')

const mockSelector = 'first'
const mockState = {
  first: 'first',
  second: {
    first: 'second.first',
    second: 123,
    third: {
      first: 'second.third.first'
    }
  }
}

describe('argument validation', () => {
  describe('selector', () => {
    it('throws "UNDEFINED_SELECTOR" if no selector is passed', () => {
      expect(() => { select() }).toThrow(errors.UNDEFINED_SELECTOR)
    })
    it('throws "SELECTOR_NOT_STRING" if the selector is not a string', () => {
      expect(() => { select(123, mockState) }).toThrow(errors.SELECTOR_NOT_STRING)
      expect(() => { select({ an: 'object' }, mockState) }).toThrow(errors.SELECTOR_NOT_STRING)
      expect(() => { select(['an', 'array'], mockState) }).toThrow(errors.SELECTOR_NOT_STRING)
    })
    it('throws "INVALID_SELECTOR" if the selector has two consecutive dots in it', () => {
      expect(() => { select('invalid..selector', mockState) }).toThrow(errors.INVALID_SELECTOR)
    })
  })
  describe('state', () => {
    it('throws "UNDEFINED_STATE" if no state is passed', () => {
      expect(() => { select(mockSelector) }).toThrow(errors.UNDEFINED_STATE)
    })
    it('throws "STATE_NOT_OBJECT" if state is not an object', () => {
      expect(() => { select(mockSelector, 123) }).toThrow(errors.STATE_NOT_OBJECT)
      expect(() => { select(mockSelector, 'state') }).toThrow(errors.STATE_NOT_OBJECT)
    })
    it('throws "STATE_NOT_OBJECT" if state is an array', () => {
      expect(() => { select(mockSelector, ['an', 'array']) }).toThrow(errors.STATE_NOT_OBJECT)
    })
  })
})

it('returns values of depth one', () => {
  expect(select(mockSelector, mockState)).toBe('first')
})

it('returns undefined if the depth one selector doesnt exist', () => {
  expect(select('the moon', mockState)).not.toBeDefined()
})

it('returns values of depth greater than one', () => {
  expect(select('second.third.first', mockState)).toBe('second.third.first')
})

it('returns undefined if the greater than depth one selector doesnt exist', () => {
  expect(select('second.third.the moon', mockState)).not.toBeDefined()
})
