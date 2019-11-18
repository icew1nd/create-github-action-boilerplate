# Create-github-action-boilerplate

Simple script that creates a boilerplate github action project

## Usage

```
npx run create-github-action my-action
cd my-action
```

From there add it github by

```
git init
git add .
git commit -m init
git push --set-upstream origin/master
```

## Usage

```- name: Hello world
      uses: actions/my-action@v1
      with:
        who-to-greet: 'Mona the Octocat'
```
