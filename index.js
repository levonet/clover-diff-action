const core = require('@actions/core')
const github = require('@actions/github')

try {
    const filenameBase = core.getInput('filename-base')
    const filenameRelative = core.getInput('filename-relative')

    core.setOutput('difference', 0);

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
