# Vector Voyager UI

A modern, interactive RAG (Retrieval-Augmented Generation) interface built with Next.js that allows users to upload documents, ask questions, and receive AI-powered responses based on the document content.

![Vector Voyager UI](public/vector-voyager.png)

## Features

- **Document Upload**: Upload CSV files with review data and specify column mappings
- **Interactive Chat Interface**: Communicate with an AI assistant that uses your uploaded documents as context
- **Responsive Design**: Built with a modern UI using Tailwind CSS and Radix UI components
- **Top-K Configuration**: Control the number of similar documents retrieved for each query

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **Form Handling**: React Hook Form, Zod validation
- **Notifications**: Sonner toast notifications
- **Containerization**: Docker and Docker Compose

## Getting Started

### Prerequisites

- Node.js 21+ (recommended: use the version specified in `.nvmrc`)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/vector-voyager-ui.git
   cd vector-voyager-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```
   API_URL="http://localhost:8000/api/v1"
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Development

### Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run format` - Check code formatting with Prettier
- `npm run format:fix` - Fix code formatting issues with Prettier

### Code Quality Tools

This project uses several tools to ensure code quality:

- **ESLint**: For code linting
- **Prettier**: For code formatting
- **Husky**: For git hooks
- **lint-staged**: For running linters on staged files
- **commitlint**: For commit message validation

## Deployment

### Using Docker

1. Build the Docker image:

   ```bash
   docker build -t vector-voyager-ui .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 vector-voyager-ui
   ```

### Using Docker Compose

1. Start the application with Docker Compose:
   ```bash
   docker-compose up
   ```
