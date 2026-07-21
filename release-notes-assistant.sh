#!/bin/bash
# release-notes-assistant.sh
# Categorizes PRs based on labels from .github/release.yml
# Labels:
#   - feature → New Features ✨
#   - enhancement → Improvements 🖌️
#   - hotfix, fix → Fixes 🐛
#   - dependencies → Dependencies ⬆️
# Falls back to Conventional Commits prefixes if no labels present

# Read JSON payload from stdin
PAYLOAD=$(cat)

# Function to extract PR title from payload
get_pr_title() {
    echo "$PAYLOAD" | grep -o '"title":"[^"]*"' | head -1 | sed 's/"title":"\(.*\)"/\1/' || echo ""
}

# Function to extract PR labels from payload
get_pr_labels() {
    echo "$PAYLOAD" | grep -o '"label":"[^"]*"' | sed 's/"label":"\(.*\)"/\1/' || echo ""
}

# Function to extract commit messages from payload
get_commit_messages() {
    echo "$PAYLOAD" | grep -o '"message":"[^"]*"' | sed 's/"message":"\(.*\)"/\1/' || echo ""
}

# Function to check if label exists (exact match)
has_label() {
    local label="$1"
    local labels="$2"
    echo "$labels" | grep -qx "$label" || false
}

# Function to map labels to categories
# Matches the exact labels defined in .github/release.yml
map_labels_to_category() {
    local labels="$1"
    
    # Check for feature label (exact match)
    if has_label "feature" "$labels"; then
        echo "New Features ✨"
        return
    fi
    
    # Check for enhancement label (exact match)
    if has_label "enhancement" "$labels"; then
        echo "Improvements 🖌️"
        return
    fi
    
    # Check for hotfix or fix labels (exact match)
    if has_label "hotfix" "$labels" || has_label "fix" "$labels"; then
        echo "Fixes 🐛"
        return
    fi
    
    # Check for dependencies label (exact match)
    if has_label "dependencies" "$labels"; then
        echo "Dependencies ⬆️"
        return
    fi
    
    # No matching label found
    echo ""
}

# Function to extract Conventional Commits prefix from commit messages
get_conventional_commit_prefix() {
    local messages="$1"
    
    # Look for common Conventional Commits prefixes
    for prefix in feat fix docs style refactor perf test chore revert; do
        if echo "$messages" | grep -qi "^$prefix(" || false; then
            case "$prefix" in
                feat) echo "New Features ✨" ;;
                fix) echo "Fixes 🐛" ;;
                docs) echo "Improvements 🖌️" ;;
                perf) echo "Improvements 🖌️" ;;
                chore) echo "Dependencies ⬆️" ;;
                refactor) echo "Improvements 🖌️" ;;
                style) echo "Improvements 🖌️" ;;
                test) echo "Improvements 🖌️" ;;
                revert) echo "Improvements 🖌️" ;;
            esac
            return
        fi
    done
    
    # Also check without parentheses
    for prefix in feat fix docs style refactor perf test chore revert; do
        if echo "$messages" | grep -qi "^$prefix:" || false; then
            case "$prefix" in
                feat) echo "New Features ✨" ;;
                fix) echo "Fixes 🐛" ;;
                docs) echo "Improvements 🖌️" ;;
                perf) echo "Improvements 🖌️" ;;
                chore) echo "Dependencies ⬆️" ;;
                refactor) echo "Improvements 🖌️" ;;
                style) echo "Improvements 🖌️" ;;
                test) echo "Improvements 🖌️" ;;
                revert) echo "Improvements 🖌️" ;;
            esac
            return
        fi
    done
    
    echo ""
}

# Function to extract Conventional Commits prefix from PR title
get_prefix_from_title() {
    local title="$1"
    
    # Look for common Conventional Commits prefixes in title
    for prefix in feat fix docs style refactor perf test chore revert; do
        if echo "$title" | grep -qi "^$prefix(" || false; then
            case "$prefix" in
                feat) echo "New Features ✨" ;;
                fix) echo "Fixes 🐛" ;;
                docs) echo "Improvements 🖌️" ;;
                perf) echo "Improvements 🖌️" ;;
                chore) echo "Dependencies ⬆️" ;;
                refactor) echo "Improvements 🖌️" ;;
                style) echo "Improvements 🖌️" ;;
                test) echo "Improvements 🖌️" ;;
                revert) echo "Improvements 🖌️" ;;
            esac
            return
        fi
    done
    
    # Also check without parentheses
    for prefix in feat fix docs style refactor perf test chore revert; do
        if echo "$title" | grep -qi "^$prefix:" || false; then
            case "$prefix" in
                feat) echo "New Features ✨" ;;
                fix) echo "Fixes 🐛" ;;
                docs) echo "Improvements 🖌️" ;;
                perf) echo "Improvements 🖌️" ;;
                chore) echo "Dependencies ⬆️" ;;
                refactor) echo "Improvements 🖌️" ;;
                style) echo "Improvements 🖌️" ;;
                test) echo "Improvements 🖌️" ;;
                revert) echo "Improvements 🖌️" ;;
            esac
            return
        fi
    done
    
    echo ""
}

# Main logic
main() {
    # Get PR title and labels
    local title
    title=$(get_pr_title)
    
    local labels
    labels=$(get_pr_labels)
    
    local commit_messages
    commit_messages=$(get_commit_messages)
    
    # Try to categorize by labels first
    local category
    category=$(map_labels_to_category "$labels")
    
    # If no category from labels, try commit messages
    if [ -z "$category" ]; then
        category=$(get_conventional_commit_prefix "$commit_messages")
    fi
    
    # If still no category, try PR title
    if [ -z "$category" ]; then
        category=$(get_prefix_from_title "$title")
    fi
    
    # Default category if nothing matched
    if [ -z "$category" ]; then
        category="Other"
    fi
    
    echo "$category"
}

main
