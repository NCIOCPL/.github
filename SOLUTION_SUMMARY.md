# Summary: Fix for commitlint Config File Loading Issue

## The Question
"In the 'commitlint_remote' job, why is the wagoid/commitlint-github-action@v5 action unable to load ${{ env.configfile }}?"

## The Answer

### Short Answer
Environment variables defined at the job level in a reusable workflow (defined with `on: workflow_call`) are **not accessible** in the `with` section of actions. Instead, you must use **workflow inputs**.

### Technical Explanation

1. **Reusable Workflows Have Different Scoping Rules**
   - Regular workflows: `env` variables at job level are accessible to all steps
   - Reusable workflows: `env` variables are NOT available in action `with` parameters

2. **Docker-Based Actions**
   - The `wagoid/commitlint-github-action@v5` runs in a Docker container
   - Parameters in `with` are evaluated before the container starts
   - `env` variables at job level don't propagate to action parameters

3. **The Correct Pattern**
   - Use `inputs` in the `workflow_call` trigger
   - Access them with `${{ inputs.parameterName }}`
   - This is the GitHub Actions recommended pattern for parameterizing reusable workflows

## Before (Doesn't Work)

```yaml
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
          configFile: ${{ env.configfile }}  # ❌ FAILS - env not accessible here
```

## After (Works Correctly)

```yaml
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
          configFile: ${{ inputs.configFile }}  # ✅ WORKS - inputs are accessible
```

## Key Differences

| Aspect | `env` | `inputs` |
|--------|-------|----------|
| Scope in reusable workflows | Limited to step execution | Available throughout workflow |
| Accessible in `with` params | ❌ No | ✅ Yes |
| Can be passed from caller | ❌ No | ✅ Yes |
| Default values | Can be set | Can be set |
| Documentation | Not designed for this | Designed for parameterization |

## Benefits of This Fix

1. **Proper Parameterization**: Callers can now override the config file path
2. **Backward Compatible**: Default value maintains existing behavior
3. **Follows Best Practices**: Uses GitHub Actions recommended pattern
4. **Clear Intent**: `inputs` clearly shows this is a configurable parameter
5. **Type Safety**: Input type is explicitly defined as `string`

## Usage Examples

### Default behavior (no changes needed for existing callers)
```yaml
jobs:
  commitlint_check:
    uses: NCIOCPL/.github/.github/workflows/ocpl_cm_standards_check.yml@workflow/v2
    # Uses default: ./commitlint/.github/workflows/commitlint.config.js
```

### Custom config file
```yaml
jobs:
  commitlint_check:
    uses: NCIOCPL/.github/.github/workflows/ocpl_cm_standards_check.yml@workflow/v2
    with:
      configFile: ./custom/path/commitlint.config.js
```

## References
- [GitHub Docs: Reusing Workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [GitHub Docs: workflow_call inputs](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onworkflow_callinputs)
