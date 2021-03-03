# clover-diff-action

Calculate the difference between the two coverage reports.

## Inputs

### `filename-base`

**Required** The filename of the XML report with which it is compared.

### `filename-head`

**Required** The filename of the XML report being compared.

## Outputs

### `difference`

Coverage difference between reports.

## Example usage

```yaml
- uses: levonet/clover-diff-action@master
  id: clover-diff
  with:
    filename-base: clover-master.xml
    filename-head: clover-branch.xml
- run: echo ${{ steps.clover-diff.outputs.difference }}
```
