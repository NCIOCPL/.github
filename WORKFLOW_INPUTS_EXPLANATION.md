# Why Environment Variables Don't Work in Reusable Workflows

## The Problem

When using the `wagoid/commitlint-github-action@v5` action in a reusable workflow (defined with `on: workflow_call`), attempting to use `${{ env.configfile }}` to specify the config file path will fail.

## Why This Happens

### Environment Variables vs. Workflow Inputs

In GitHub Actions:

1. **Environment Variables (`env`)**: Can be defined at the workflow, job, or step level
   - Work well in regular workflows
   - Have limited scope in reusable workflows
   - Cannot be passed from the calling workflow to the called workflow

2. **Workflow Inputs (`inputs`)**: Designed specifically for reusable workflows
   - Allow the caller to pass parameters to the reusable workflow
   - Available throughout the entire workflow using `${{ inputs.parameterName }}`
   - The correct way to make reusable workflows configurable

### Example of What Doesn't Work

```yaml
# ❌ This DOES NOT work in a reusable workflow
on:
  workflow_call:
  
jobs:
  commitlint:
    runs-on: ubuntu-latest
    env:
      configfile: ./commitlint/.github/workflows/commitlint.config.js
    steps:
      - name: Commitlint
        uses: wagoid/commitlint-github-action@v5
        with:
          configFile: ${{ env.configfile }}  # This will fail!
```

### The Correct Solution

```yaml
# ✅ This works correctly in a reusable workflow
on:
  workflow_call:
    inputs:
      configFile:
        description: 'Path to commitlint config file'
        required: false
        type: string
        default: './commitlint/.github/workflows/commitlint.config.js'
  
jobs:
  commitlint:
    runs-on: ubuntu-latest
    steps:
      - name: Commitlint
        uses: wagoid/commitlint-github-action@v5
        with:
          configFile: ${{ inputs.configFile }}  # This works!
```

## How to Use the Fixed Workflow

### Default Behavior (No Input)

```yaml
jobs:
  commitlint_check:
    uses: NCIOCPL/.github/.github/workflows/ocpl_cm_standards_check.yml@workflow/v2
```

This uses the default config file path: `./commitlint/.github/workflows/commitlint.config.js`

### Custom Config File Path

```yaml
jobs:
  commitlint_check:
    uses: NCIOCPL/.github/.github/workflows/ocpl_cm_standards_check.yml@workflow/v2
    with:
      configFile: ./path/to/custom/commitlint.config.js
```

## Additional Context

- The `wagoid/commitlint-github-action@v5` is a Docker-based action
- Docker-based actions run in a container with the workspace mounted
- Paths are resolved relative to the workspace root
- Using workflow inputs ensures proper path resolution and parameter passing

## References

- [GitHub Actions: Reusing Workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [GitHub Actions: Workflow syntax for workflow_call](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onworkflow_call)
