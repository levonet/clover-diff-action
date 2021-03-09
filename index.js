const core = require('@actions/core')
const fs = require('fs')
const { getCloverMetrics, getCloverTestMetrics } = require('./lib/clover')
const calcCodeCoverage = require('./lib/coverage')

function setOutputAndPrint(core, key, value) {
    core.setOutput(key, value)
    core.info(`Set ${key}: ${value}`)
}

try {
    const filenameBase = core.getInput('filename-base')
    const filenameHead = core.getInput('filename-head')
    const xmlBase = fs.readFileSync(filenameBase, {encoding:'utf8', flag:'r'})
    const xmlHead = fs.readFileSync(filenameHead, {encoding:'utf8', flag:'r'})

    const metricsBase = getCloverMetrics(xmlBase)
    const metricsHead = getCloverMetrics(xmlHead)
    const testMetricsHead = getCloverMetrics(xmlHead, 'testproject')
    const testsHead = getCloverTestMetrics(xmlHead)
    core.info(`Base metrics: ${JSON.stringify(metricsBase)}`)
    core.info(`Head metrics: ${JSON.stringify(metricsHead)}`)

    const coverageBase = calcCodeCoverage(metricsBase)
    const coverageHead = calcCodeCoverage(metricsHead)

    setOutputAndPrint(core, 'base-coverage', coverageBase)
    setOutputAndPrint(core, 'base-source-coveredelements', metricsBase.coveredelements)
    setOutputAndPrint(core, 'base-source-elements', metricsBase.elements)

    setOutputAndPrint(core, 'head-coverage', coverageHead)
    setOutputAndPrint(core, 'head-source-elements', metricsHead.elements)
    setOutputAndPrint(core, 'head-source-coveredelements', metricsHead.coveredelements)

    setOutputAndPrint(core, 'head-test-elements', testMetricsHead.elements)
    setOutputAndPrint(core, 'head-test-testruns', testsHead.testruns)
    setOutputAndPrint(core, 'head-test-testpasses', testsHead.testpasses)
    setOutputAndPrint(core, 'head-test-testfailures', testsHead.testfailures)
    setOutputAndPrint(core, 'head-test-testduration', testsHead.testduration)

    setOutputAndPrint(core, 'diff-coverage', coverageHead - coverageBase)
    setOutputAndPrint(core, 'diff-source-elements', metricsHead.elements - metricsBase.elements)
    setOutputAndPrint(core, 'diff-source-coveredelements', metricsHead.coveredelements - metricsBase.coveredelements)
} catch (error) {
    core.setFailed(error.message)
}
