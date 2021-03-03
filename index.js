const core = require('@actions/core')
const github = require('@actions/github')

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
    return (parseInt(metrics.coveredelements, 10) / parseInt(metrics.elements, 10)) * 100
}

try {
    const filenameBase = core.getInput('filename-base')
    const filenameRelative = core.getInput('filename-relative')

    const base = getCloverMetrics(filenameBase)
    const relative = getCloverMetrics(filenameRelative)

    const coverageBase = calcCodeCoverage(base)
    const coverageRelative = calcCodeCoverage(relative)

    core.setOutput('difference', coverageRelative - coverageBase)

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)
} catch (error) {
    core.setFailed(error.message)
}
