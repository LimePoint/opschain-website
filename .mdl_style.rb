# frozen_string_literal: true

all
rule 'MD029', style: :ordered # Numbered lists
rule 'MD024', allow_different_nesting: true # Repeated headings
rule 'MD026', punctuation: '.,;:' # Punctuation in headings
exclude_rule 'MD013' # Line length
exclude_rule 'MD033' # Inline HTML
exclude_rule 'MD005' # List item indentation - bug https://github.com/markdownlint/markdownlint/issues/374
exclude_rule 'MD007' # List item indentation - bug https://github.com/markdownlint/markdownlint/issues/313
exclude_rule 'MD041' # First line in file should be a top level header
exclude_rule 'MD002' # First header should be a top level header
