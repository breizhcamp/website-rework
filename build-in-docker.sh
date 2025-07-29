#!/bin/sh

# Invoking pnpm build on a mounted directory results in a "Resource busy 'build'" error
# That's why we need to copy the result after it was built
pnpm build
rm -fr /app/out/*
cp -a /app/build/. /app/out
pnpm preview
