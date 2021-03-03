const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')
const txml = require('txml')

function getCloverMetrics(filename) {
    const xml = fs.readFileSync(filename, {encoding:'utf8', flag:'r'})
    const data = txml.parse(xml)
    const metrics = data.filter((node) => node.tagName === 'coverage')
        .map((node) => node.children)[0]
        .filter((node) => node.tagName === 'project')
        .map((node) => node.children)[0]
        .filter((node) => node.tagName === 'metrics')
        [0].attributes

    return metrics
}

function calcCodeCoverage(metrics) {
    const elements = parseInt(metrics.elements, 10)

    if (!elements) {
        return 0
    }

    return (parseInt(metrics.coveredelements, 10) / elements) * 100
}

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
