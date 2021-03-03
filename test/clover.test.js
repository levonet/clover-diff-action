const getCloverMetrics = require('../lib/clover')

test('open file and get expected metrics', () => {
    expect(getCloverMetrics('test/assets/clover.xml')).toMatchObject({
        coveredelements: '1277',
        elements: '7976'
    })
})
