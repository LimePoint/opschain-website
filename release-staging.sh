#!/bin/bash
rake private_git_repos:tag_branch[staging]
rake public_git_repos:publish_squashed_repo_branch[4.2.AI,staging]
