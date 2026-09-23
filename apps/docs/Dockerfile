FROM node:22-bookworm-slim AS build
WORKDIR /repo
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/docs/package.json ./apps/docs/
COPY apps/installer-lab/package.json ./apps/installer-lab/
COPY apps/registry/package.json ./apps/registry/
COPY packages/mielui/package.json ./packages/mielui/

ENV LEFTHOOK=0
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY apps/docs ./apps/docs
COPY changelog ./changelog
COPY packages/mielui ./packages/mielui

WORKDIR /repo/apps/docs
ENV DOCS_ADAPTER=node
RUN pnpm run build

FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=build /repo/apps/docs/build ./build
COPY --from=build /repo/package.json ./package.json
ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000
CMD ["node", "build"]
