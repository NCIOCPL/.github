# Workflows Branch

We isolate our workflow templates on a separate branch of our `.github` repository. This branch is orphaned from `master` and should never be merged back in to it.

## Updating Workflows

### Minor Changes

If you need to update a workflow you can create a separate development branch off of the workflow branch (e.g. `workflows-v1-dev`). Modify (or add) your workflow on that branch. You can then test that reuseable workflow by tagging to it from another repo:

```
  my_job:
    uses: NCIOCPL/.github/.github/workflows/my_reuseable_workflow.yml@workflows-v1-dev
```

Once done making changes, merge your `workflows-v1-dev` branch back into `workflows-v1` and update your calling workflow:

```
  my_job:
    uses: NCIOCPL/.github/.github/workflows/my_reuseable_workflow.yml@workflows-v1
```

At that point any currently existing workflows that reference `my_reuseable_workflow.yml` will pick up your changes.

### Breaking Changes

If you are going to institute a breaking change that is liable to either truly break workflow execution or to seriously impede work then you should make a new branch such as `workflows-v1`. You can use the same development strategy as above but when done merge back into your new branch.

At this point you will need to update the template workflows on the `master` branch to point to your new `workflows-v2` branch which will mean any *new* workflows created use the new reusable workflow. For any *existing* workflows you will have to upgrade them one by one on each repository.