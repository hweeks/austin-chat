# app

## install

run

```
$ yarn
```

## dev

run

```
$ yarn dev
```

## what

in app, a webpackdevserver based react app

in server an express based joke server

## how to do work using pull requests

hello and good morining, welcome to code hell. u gottta collabaroate with some asshole senior dev who never has time, they want u to do it via small PRs. the smaller they are, the faster the review, the easier it is for them!

### step one

```bash
git checkout main
git pull origin main
```

switch to the main branch, and get the latest updates to it from github

### step two

```bash
git switch -c my-useful-branch-name-describing-the-changes
```

make a new branch, based off of the latest main

### step three

write code

### step four

```bash
git add .
git commit -m 'feat: adding shockers'
```

add all of the files you've modified to the changes you want git to see, then label these changes with the message 'feat: adding shockers'

### step five

```bash
git push origin my-useful-branch-name-describing-the-changes
```

push all of your shit to github on a branch of your own naming

### step six

open a pr, theres a big button or a link in the git push. you can do this

### step seven

as reviews pour in, repeat steps 3 to 5. keep only one pr open

### step eight 

pr is approved and merged, go to step 1
