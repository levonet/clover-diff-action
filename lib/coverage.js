function calcCodeCoverage(metrics) {
    const elements = parseInt(metrics.elements, 10)

    if (!elements) {
        return 0
    }

    return (parseInt(metrics.coveredelements, 10) / elements) * 100
}

module.exports = calcCodeCoverage
