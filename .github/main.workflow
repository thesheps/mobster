workflow "Build, Test, and Publish" {
  resolves = ["Publish"]
  on = "push"
}

action "Install" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Test" {
  needs = "Install"
  uses = "nuxt/actions-yarn@master"
  args = "test:unit"
}

action "Build" {
  needs = "Test"
  uses = "nuxt/actions-yarn@master"
  args = "build"
}

action "Publish" {
  needs = "Build"
  uses = "nuxt/actions-yarn@master"
  args = "deploy"
  secrets = ["GITHUB_TOKEN"]
}
