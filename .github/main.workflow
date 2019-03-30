workflow "Build, Test, and Publish" {
  resolves = ["Publish"]
  on = "push"
}

action "Install" {
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "Test" {
  needs = "Install"
  uses = "borales/actions-yarn@master"
  args = "test:unit"
}

action "Build" {
  needs = "Test"
  uses = "borales/actions-yarn@master"
  args = "build"
}

action "Publish" {
  needs = "Build"
  uses = "borales/actions-yarn@master"
  args = "deploy"
  secrets = ["GITHUB_TOKEN"]
}
