# frozen_string_literal: true

require 'shellwords'
require 'rugged'
require 'date'
require 'fileutils'

MASTER_BRANCH = 'main'
RELEASE_BRANCHES = %w[main staging].freeze

BASE_REPO_PATH = 'git@github.com:LimePoint/'
TP_LICENCE_FILE = 'THIRD-PARTY-SOFTWARE'
RELEASE_VERSION_FILE = 'tmp/opschain-website-release/RELEASE-VERSION'
RELEASE_VERSION = '4.2.AI'.freeze

ENV['GIT_AUTHOR_NAME']  = ENV['GIT_COMMITTER_NAME']  = 'OpsChain'
ENV['GIT_AUTHOR_EMAIL'] = ENV['GIT_COMMITTER_EMAIL'] = 'opschain@limepoint.com'

def clone_repo(repo, branch = MASTER_BRANCH)
  repo = repo.shellescape
  sh "rm -rf #{repo}"
  sh "git clone #{BASE_REPO_PATH}#{repo}.git #{repo}"

  Dir.chdir(repo) do
    # Check for local or remote-tracking branch, then checkout or create
    local_exists = system('git', 'rev-parse', '--verify', branch, out: File::NULL, err: File::NULL)
    remote_exists = system('git', 'rev-parse', '--verify', "origin/#{branch}", out: File::NULL, err: File::NULL)
    if local_exists
      sh 'git', 'checkout', branch
    elsif remote_exists
      sh 'git', 'checkout', '-b', branch, "origin/#{branch}"
    else
      sh 'git', 'checkout', '-b', branch
    end
    yield
  end
end

def release_tag
  release_version
end

def release_version
  return RELEASE_VERSION
end

def release_version_file
  return RELEASE_VERSION_FILE
end

def date_tag
  Date.today.iso8601
end

def tag_and_push(tag, branch)
  tag = tag.shellescape
  branch_esc = branch.shellescape
  sh "git tag #{tag} --force"
  sh "git push origin #{branch_esc} --force"
  sh "git push origin #{tag} --force"
end

def tag_and_process_repos(repos)
  FileUtils.mkdir_p 'tmp'
  Dir.chdir 'tmp' do
    repos.each do |repo|
      RELEASE_BRANCHES.each do |branch|
        clone_repo(repo, branch) do
          branch_tag = branch == MASTER_BRANCH ? release_tag : "#{release_tag}-#{branch}"
          yield if block_given?
          tag_and_push(branch_tag, branch)
        end
      end
    end
  end
end

PUBLIC_REPOS = %w[
  opschain-website
].freeze

def private_repo_name(repo)
  "#{repo}-private"
end

def tag_exists?(tag)
  Rugged::Repository.new('.').rev_parse(tag)
  true
rescue Rugged::ReferenceError
  false
end

def squash_and_publish_repo(public_repo, tag, branch)
  FileUtils.mkdir_p 'tmp'
  Dir.chdir 'tmp' do
    clone_repo(public_repo, branch) do
      sh "git remote add private-repo #{BASE_REPO_PATH}#{private_repo_name(public_repo)}.git"
      sh 'git fetch --force --tags private-repo'
      if tag_exists?(tag)
        sh 'git rm -rf . || true'
        sh "git checkout --force #{tag} -- ."
        sh 'git add --force .'
        sh "git diff --cached --quiet || git commit -m 'OpsChain Website Release - #{tag}.'"
        tag_and_push(tag, branch)
      else
        warn "Tag #{tag} not found in repository #{private_repo_name(public_repo)}."
      end
    end
  end
end

def create_release_version_file
  Rake::Task[RELEASE_VERSION_FILE].invoke

  sh "git add #{release_version_file.basename}"
  sh "git diff --cached --quiet || git commit -m 'Updating Release'"
end

file RELEASE_VERSION_FILE do
  File.write(release_version_file, release_tag)
end

namespace :public_git_repos do
  desc 'Publish squashed public repos (all release branches)'
  task :publish_squashed_repos, [:tag] do |_t, args|
    args.with_defaults(tag: release_tag)
    base_tag = args[:tag].shellescape
    PUBLIC_REPOS.each do |public_repo|
      RELEASE_BRANCHES.each do |branch|
        branch_tag = branch == MASTER_BRANCH ? base_tag : "#{base_tag}-#{branch}"
        squash_and_publish_repo(public_repo, branch_tag, branch)
      end
    end
  end

  desc 'Publish squashed public repos (single branch)'
  task :publish_squashed_repo_branch, [:tag, :branch] do |_t, args|
    args.with_defaults(tag: release_tag, branch: MASTER_BRANCH)
    base_tag = args[:tag].shellescape
    branch = args[:branch]
    branch_tag = branch == MASTER_BRANCH ? base_tag : "#{base_tag}-#{branch}"
    PUBLIC_REPOS.each { |public_repo| squash_and_publish_repo(public_repo, branch_tag, branch) }
  end
end

namespace :private_git_repos do
  desc 'Tag the private repos on all release branches'
  task :tag_latest do
    private_repos = %w[opschain-website-private]
    tag_and_process_repos(private_repos)
  end

  desc 'Tag the private repo on a specific branch'
  task :tag_branch, [:branch] do |_t, args|
    args.with_defaults(branch: MASTER_BRANCH)
    branch = args[:branch]
    private_repos = %w[opschain-website-private]
    FileUtils.mkdir_p 'tmp'
    Dir.chdir 'tmp' do
      private_repos.each do |repo|
        clone_repo(repo, branch) do
          branch_tag = branch == MASTER_BRANCH ? release_tag : "#{release_tag}-#{branch}"
          tag_and_push(branch_tag, branch)
        end
      end
    end
  end

  desc 'Get release version'
  task :release_version do
    puts "Current Release: #{release_version}"
  end
end
