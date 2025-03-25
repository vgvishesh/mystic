# Mytic Wisdom - Indian Mythology Wisdom Application

An application that provides wisdom and guidance from Indian mythological texts like Upanishads, Mahabharata, Ramayana, and Manusmriti to help users with modern life problems.

## Project Structure

This project is organized as a monorepo with the following structure:

```
mytic-wisdom/
├── apps/
│   ├── backend/         # Node.js + Express + TypeScript backend
│   └── frontend/        # React + TypeScript frontend
├── packages/
│   ├── shared-types/    # Shared TypeScript interfaces
│   └── ui-components/   # Shared UI components
├── scripts/             # Build and deployment scripts
```

## Features

- Interactive interface for users to ask questions about personal or professional problems
- AI-powered matching of user questions with relevant mythological wisdom
- Knowledge base drawn from Indian mythological texts
- Modern, responsive design for all devices

## Tech Stack

- **Backend**: Node.js with Express and TypeScript
- **Frontend**: React with TypeScript
- **AI Integration**: OpenAI API for enhanced matching capabilities
- **Monorepo Management**: Turborepo for efficient workspace management

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mytic-wisdom

# Install dependencies
yarn install

# Start development environment
yarn dev
```

## Git Branching Strategy

We follow a simplified Git Flow branching strategy:

- `main`: Production-ready code
- `develop`: Integration branch for ongoing development
- `feature/*`: Feature branches for new functionality
- `bugfix/*`: Branches for bug fixes
- `release/*`: Release preparation branches

## License

MIT
