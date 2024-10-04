\# Content Analyzer

Content Analyzer is a web application built with Next.js that allows users to analyze YouTube video transcripts and text content. It provides age categorization, trigger warnings, content summaries, and identifies logical fallacies.

\## Features

\- YouTube video transcript analysis

\- Text content analysis

\- Age categorization (G, PG, T, M, A)

\- Trigger warnings

\- Content summarization

\- Logical fallacy detection

\## Tech Stack

\- Frontend: Next.js (React framework)

\- Styling: Tailwind CSS and shadcn/ui components

\- State Management: React hooks

\- API Routes: Next.js API Routes

\- Transcript Fetching: Custom YoutubeTranscript class

\- Content Analysis: HuggingFace Inference API

\## Getting Started

1\. Clone the repository:

\`\`\`

git clone https://github.com/your-username/content-analyzer.git

cd content-analyzer

\`\`\`

2\. Install dependencies:

\`\`\`

npm install

\`\`\`

3\. Set up environment variables:

Create a \`.env.local\` file in the root directory and add your HuggingFace API key:

\`\`\`

HUGGINGFACE\_API\_KEY=your\_api\_key\_here

\`\`\`

4\. Run the development server:

\`\`\`

npm run dev

\`\`\`

5\. Open \[http://localhost:3000\](http://localhost:3000) in your browser to see the application.

\## Project Structure

\- \`pages/\`: Next.js pages and API routes

\- \`components/\`: React components

\- \`lib/\`: Utility functions and classes

\- \`styles/\`: Global styles

\## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

\## License

This project is licensed under the MIT License.