.SILENT:
.DEFAULT_GOAL := help

.PHONY: help
help:
	$(info =================================================================)
	$(info Development Commands)
	$(info =================================================================)
	$(info )
	$(info Setup & Dependencies:)
	$(info   make setup                Install dependencies)
	$(info   make install-clean        Clean install (removes node_modules))
	$(info )
	$(info Development:)
	$(info   make dev                  Start development server (port 3000))
	$(info   make type-check           Run TypeScript type checking)
	$(info   make lint                 Run ESLint checks)
	$(info   make format               Format code with Prettier)
	$(info )
	$(info Production:)
	$(info   make build                Build for production)
	$(info   make preview              Preview production build locally)
	$(info )
	$(info Utilities:)
	$(info   make audit                Run security audit)
	$(info   make audit-fix            Fix security vulnerabilities)
	$(info   make outdated             Check for outdated dependencies)
	$(info   make clean                Clean build artifacts)
	$(info =================================================================)

.PHONY: setup
setup:
	npm install

.PHONY: install-clean
install-clean:
	rm -rf node_modules package-lock.json
	npm install

.PHONY: dev
dev:
	npm run dev

.PHONY: type-check
type-check:
	npm run type-check

.PHONY: lint
lint:
	npm run lint

.PHONY: format
format:
	npm run format

.PHONY: build
build:
	npm run build

.PHONY: preview
preview:
	npm run preview

.PHONY: audit
audit:
	npm audit

.PHONY: audit-fix
audit-fix:
	npm audit fix

.PHONY: outdated
outdated:
	npm outdated

.PHONY: clean
clean:
	rm -rf dist node_modules .eslintcache
	$(info Clean: Removed dist/, node_modules/, .eslintcache)

.PHONY: build-dev
build-dev:
	npm run build:dev
