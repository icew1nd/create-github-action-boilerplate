# Create-github-action-boilerplate

Creates a boilerplate github action ready to be published - based off [Githubs official guide ](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-a-javascript-action#commit-and-push-your-action-to-github)

## Quick overview

```
npx create-github-action-boilerplate my-action
```

OR

```
npm i create-github-action-boilerplate -g
create-github-action-boilerplate my-action
```

Then add it to GitHub by

```
git init
git add .
git commit -m init
git push --set-upstream origin master
```

From there go to your repository on github and click "Publish this action to marketplace" following
[this guide](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/publishing-actions-in-github-marketplace#publishing-an-action).

### Use in workflow

#### Public market place

```
    - name: Hello world
      uses: *your-github-handle*/my-action@v1
      with:
        who-to-greet: 'Mona the Octocat'
```

#### Private action

For private actions you will need to place your action within the repository that it's going to be used in under:

`/.github/actions/`

```
|-- hello-world (repository)
|   |__ .github
|       └── workflows
|           └── my-first-workflow.yml
|       └── actions
|           |__ hello-world-action
|               └── action.yml
```

and then from your work flow

```
    - name: Hello world
      uses: ./.github/actions/hello-world-action
      with:
        who-to-greet: 'Mona the Octocat'
```

You can read more from the official documentation [here](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/configuring-a-workflow#referencing-actions-in-your-workflow).
