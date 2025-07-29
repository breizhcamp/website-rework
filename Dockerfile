FROM node:24-alpine
RUN corepack enable pnpm
WORKDIR /app
COPY . /app
# --force is required for Tailwind installation, that executes a script
RUN pnpm install --force
EXPOSE 5173
CMD ["pnpm", "dev"]
