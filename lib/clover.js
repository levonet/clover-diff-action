const fs = require('fs')
const txml = require('txml')

function getCloverMetrics(filename) {
    const xml = fs.readFileSync(filename, {encoding:'utf8', flag:'r'})
    const data = txml.parse(xml)
    const metrics = data.filter((node) => node.tagName === 'coverage')
        .map((node) => node.children)[0]
        .filter((node) => node.tagName === 'project')
        .map((node) => node.children)[0]
        .filter((node) => node.tagName === 'metrics')[0].attributes

    return metrics
}

module.exports = getCloverMetrics
