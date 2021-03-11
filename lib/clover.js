const txml = require('txml')

function getCloverMetrics(xml, resultName = 'project') {
    const data = txml.parse(xml)
    const metrics = data.filter((node) => node.tagName === 'coverage')
        .map((node) => node.children)[0]
        .filter((node) => node.tagName === resultName)
        .map((node) => node.children)[0]
        .filter((node) => node.tagName === 'metrics')[0].attributes

    return metrics
}

function getCloverTestMetrics(xml, resultName = 'testproject') {
    const data = txml.parse(xml)
    const result = {
        testruns: 0,
        testpasses: 0,
        testfailures: 0,
        testduration: 0
    }

    data.filter((node) => node.tagName === 'coverage')
        .map((node) => node.children)[0]
        .filter((node) => node.tagName === resultName)
        .map((node) => node.children)[0]
        .filter((node) => node.tagName === 'package')
        .forEach((pckge) => {
            pckge.children
                .filter((node) => node.tagName === 'file')
                .forEach((file) => {
                    const metrics = file.children
                        .filter((node) => node.tagName === 'class')
                        .map((node) => node.children)[0]
                        .filter((node) => node.tagName === 'metrics')[0].attributes
                    result.testruns += parseInt(metrics.testruns, 10)
                    result.testpasses += parseInt(metrics.testpasses, 10)
                    result.testfailures += parseInt(metrics.testfailures, 10)
                    result.testduration = Math.round(result.testduration + parseFloat(metrics.testduration) * 1000)
                })
        })

    return result
}

module.exports = {
    getCloverMetrics,
    getCloverTestMetrics
}
