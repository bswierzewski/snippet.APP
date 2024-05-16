#!/bin/bash
# replace-variables.sh

# Define a list of mandatory environment variables to check
MANDATORY_VARS=("NEXT_PUBLIC_API_URL" "NEXT_PUBLIC_AUTH0_DOMAIN" "NEXT_PUBLIC_AUTH0_CLIENTID" "NEXT_PUBLIC_NEXTAUTH_URL")

# Define a list of optional environment variables (no check needed)
OPTIONAL_VARS=()

# Infer NEXT_PUBLIC_APP_HOST from APP_HOST if not already set
if [ -z "$NEXT_PUBLIC_APP_HOST" ] && [ ! -z "$APP_HOST" ]; then
    export NEXT_PUBLIC_APP_HOST="$APP_HOST"
fi

# Infer NEXT_PUBLIC_GITHUB_INTEGRATION_CLIENT_ID from GITHUB_INTEGRATION_CLIENT_ID if not already set
if [ -z "$NEXT_PUBLIC_GITHUB_INTEGRATION_CLIENT_ID" ] && [ ! -z "$GITHUB_INTEGRATION_CLIENT_ID" ]; then
    export NEXT_PUBLIC_GITHUB_INTEGRATION_CLIENT_ID="$GITHUB_INTEGRATION_CLIENT_ID"
fi

# Check if each mandatory variable is set
for VAR in "${MANDATORY_VARS[@]}"; do
    if [ -z "${!VAR}" ]; then
        echo "$VAR is not set. Please set it and rerun the script."
        exit 1
    fi
done

# Combine mandatory and optional variables for replacement
ALL_VARS=("${MANDATORY_VARS[@]}" "${OPTIONAL_VARS[@]}")

# Add NEXT_PUBLIC_APP_HOST and NEXT_PUBLIC_GITHUB_INTEGRATION_CLIENT_ID to the list for replacement
ALL_VARS+=("NEXT_PUBLIC_APP_HOST" "NEXT_PUBLIC_GITHUB_INTEGRATION_CLIENT_ID")

# Find and replace BAKED values with real values
find /app/public /app/.next -type f -name "*.js" |
while read file; do
    for VAR in "${ALL_VARS[@]}"; do
        if [ ! -z "${!VAR}" ]; then
            sed -i "s|BAKED_$VAR|${!VAR}|g" "$file"
        fi
    done
done