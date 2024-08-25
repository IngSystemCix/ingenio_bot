## 🤖IngenioBot

IngenioBot is your intelligent assistant for Discord, designed to enhance your server with fun and efficiency. With interactive commands and useful tools, IngenioBot helps you manage your community and organize events effortlessly. Explore its features and let IngenioBot handle the work!

## Project structure

```
└── 📁src
    └── 📁commands
    └── 📁handlers
    └── bot.ts
└── .env.template
└── .gitignore
└── package-lock.json
└── package-json.json
└── README.md
└── tsconfig.md
```

## ⚠️ Warning: Handling `.env` Files

> ⚠️ **Warning:** The `.env` file contains sensitive information, including API keys, database credentials, and other environment-specific configurations. **Please ensure this file is excluded from version control systems and shared only with authorized personnel.**

- **Never** commit your `.env` file to version control (e.g., GitHub). Always add it to your `.gitignore` file to ensure it is not accidentally pushed to your repository.
- **Keep your `.env` file secure** and share it only with trusted team members who need access.
- Consider using environment-specific tools like [dotenv-safe](https://github.com/rolodato/dotenv-safe) to ensure that all required environment variables are properly set.
