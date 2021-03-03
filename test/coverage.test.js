const calcCodeCoverage = require('../lib/coverage')

const metrics0 = {
    coveredelements: '0',
    elements: '0'
}

const metrics1 = {
    coveredelements: '1277',
    elements: '7976'
}

test('zero metrics return zero', () => {
    expect(calcCodeCoverage(metrics0)).toBe(0)
})

test('zero metrics return zero', () => {
    expect(calcCodeCoverage(metrics1)).toBe(16.010531594784354)
})
