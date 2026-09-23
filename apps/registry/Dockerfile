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

COPY apps/registry ./apps/registry
COPY packages/mielui ./packages/mielui

WORKDIR /repo/apps/registry
RUN DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" \
	DIRECT_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" \
	pnpm exec prisma generate

FROM node:22-bookworm-slim AS runtime
RUN corepack enable
WORKDIR /repo

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/docs/package.json ./apps/docs/
COPY apps/installer-lab/package.json ./apps/installer-lab/
COPY apps/registry/package.json ./apps/registry/
COPY packages/mielui/package.json ./packages/mielui/

ENV LEFTHOOK=0
RUN pnpm install --frozen-lockfile --production --ignore-scripts \
	--filter='registry' --filter='@mielui/svelte'

COPY apps/registry ./apps/registry
COPY packages/mielui ./packages/mielui
COPY --from=build /repo/apps/registry/prisma/generated ./apps/registry/prisma/generated

WORKDIR /repo/apps/registry
ENV PORT=4100
EXPOSE 4100

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && pnpm run start"]
