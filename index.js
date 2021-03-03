const core = require('@actions/core')
const getCloverMetrics = require('./lib/clover')
const calcCodeCoverage = require('./lib/coverage')

try {
    const filenameBase = core.getInput('filename-base')
    const filenameHead = core.getInput('filename-head')

    const base = getCloverMetrics(filenameBase)
    const head = getCloverMetrics(filenameHead)
    core.info(`Base metrics: ${JSON.stringify(base)}`)
    core.info(`Head metrics: ${JSON.stringify(head)}`)

    const coverageBase = calcCodeCoverage(base)
    const coverageHead = calcCodeCoverage(head)
    core.info(`Base coverage: ${coverageBase}`)
    core.info(`Head coverage: ${coverageHead}`)

    core.setOutput('difference', coverageHead - coverageBase)
    core.info(`Difference: ${coverageHead - coverageBase}`)
} catch (error) {
    core.setFailed(error.message)
}
