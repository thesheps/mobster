workflow "Build, Test, and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Build" {
  uses = "borales/actions-yarn@master"
  args = "build"
}

action "Test" {
  needs = "Build"
  uses = "borales/actions-yarn@master"
  args = "test:unit"
}

action "Publish" {
  needs = "Test"
  uses = "borales/actions-yarn@master"
  args = "deploy"
}
