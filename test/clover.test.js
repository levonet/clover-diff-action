const fs = require('fs')
const { getCloverMetrics, getCloverTestMetrics } = require('../lib/clover')
let xml

beforeAll(() => {
    xml = fs.readFileSync('test/assets/clover.xml', {encoding:'utf8', flag:'r'})
})

test('open file and get expected metrics', () => {
    expect(getCloverMetrics(xml)).toMatchObject({
        coveredelements: '1277',
        elements: '7976'
    })
})

test('open file and get test metrics', () => {
    expect(getCloverMetrics(xml, 'testproject')).toMatchObject({
        coveredelements: '758',
        elements: '1092'
    })
})

test('open file and get test stat', () => {
    expect(getCloverTestMetrics(xml)).toMatchObject({
        testruns: 27,
        testpasses: 26,
        testfailures: 1,
        testduration: 0.146
    })
})
