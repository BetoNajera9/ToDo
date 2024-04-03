# ToDo Backend

_RESTful API - Task Management System_

## Objective ⌨️

A REST API for a task management system must be created. Through this system a user will be able to view, add, edit or delete his personal tasks. Each task must have an associated status, which can be "pending", "in progress" or "completed". In addition, the paths to access the tasks must be protected, and only authenticated users should be able to access them.

## Beginning 🚀

### Database diagram 💾

```mermaid
erDiagram
    CUSTOMER ||--o{ TASK : have
    CUSTOMER {
        SERAIAL id PK
        VARCHAR(50) name
        VARCHAR(50) last_name
        VARCHAR(100) email UK
        VARCHAR(50) password
        TIMESTAMP created_at "DEFAULT CURRENT_TIMESTAMP"
    }
    TASK {
        SERAIAL id PK
        INTEGER customer_id FK
        VARCHAR(50) title
        VARCHAR(250) description
        TIMESTAMP due_date
        TEXT comment
        TEXT[] tags
        VARCHAR(250) file
    }
```

### Prerequisites 📋

### Installation 🔧

### Running 🆙

## Despliegue 📦

## Built with 🛠️

- [Nestjs](https://nestjs.com/) - The framework used
- [npm](https://www.npmjs.com/) - Dependency handler
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Typescript](https://www.typescriptlang.org/) - Language

## Author ✒️

- **Roberto Miron Najera** - _Initial Work_ - [betonajera9](https://github.com/villanuevand)

## License 📄

This project is under the (MIT) License - see the [LICENSE](LICENSE) file for details.

---

⌨️ with ❤️ by [betonajera](https://github.com/BetoNajera9) 😊
