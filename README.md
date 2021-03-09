# clover-diff-action
[![test](https://github.com/levonet/clover-diff-action/actions/workflows/test.yml/badge.svg)](https://github.com/levonet/clover-diff-action/actions/workflows/test.yml)

Calculate the difference between the two coverage reports.

## Inputs

### `filename-base`

**Required** The filename of the XML report with which it is compared.

### `filename-head`

**Required** The filename of the XML report being compared.

## Outputs

### `diff-coverage`

Coverage difference between reports.

### `diff-source-elements`

Difference of source elements.

### `diff-source-coveredelements`

Difference of source covered elements.

### `base-coverage`

Coverage from base file report.

### `base-source-elements`

Code elements of source code from base file report.

### `base-source-coveredelements`

Covered elements of source code from base file report.

### `head-coverage`

Coverage from head file report.

### `head-source-elements`

Code elements of source code from head file report.

### `head-source-coveredelements`

Covered elements of source code from head file report.

### `head-test-elements`

Code elements of tests from head file report.

### `head-test-testruns`

Test runs from head file report.

### `head-test-testpasses`

Test passes from head file report.

### `head-test-testfailures`

Test failures from head file report.

### `head-test-testduration`

Test duration in seconds from head file report.

## Example usage

```yaml
- uses: levonet/clover-diff-action@master
  id: clover-diff
  with:
    filename-base: clover-master.xml
    filename-head: clover-branch.xml
- run: echo ${{ steps.clover-diff.outputs.diff-coverage }}
```
