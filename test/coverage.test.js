const calcCodeCoverage = require('../lib/coverage')

const metrics0 = {
    coveredelements: '0',
    elements: '0'
}

const metrics1 = {
    coveredelements: '1288',
    elements: '8000'
}

test('zero metrics return zero', () => {
    expect(calcCodeCoverage(metrics0)).toBe(0)
})

test('calcule', () => {
    expect(calcCodeCoverage(metrics1)).toBe(16.1)
})
