#!/bin/bash
rake private_git_repos:tag_latest
rake public_git_repos:publish_squashed_repos
