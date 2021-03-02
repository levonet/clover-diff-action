# clover-diff-action

Calculate the difference between the two coverage reports.

## Inputs

### `filename-base`

**Required** The filename of the XML report with which it is compared.

### `filename-relative`

**Required** The filename of the XML report being compared.

## Outputs

### `difference`

Coverage difference between reports.

## Example usage

```yaml
- uses: levonet/clover-diff-action@master
  id: diff
  with:
    filename-base: clover-head.xml
    filename-relative: clover-branch.xml
- run: echo ${{ steps.diff.outputs.difference }}
```
