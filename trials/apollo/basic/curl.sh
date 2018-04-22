#!/bin/bash
curl -H "Authorization: bearer 57cac615ac72ce8487999babb98322befb29a1e5" -X POST -d " \
{ \
    \"query\": \"query { viewer { login }}\" \
} \
" https://api.github.com/graphql