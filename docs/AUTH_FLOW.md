# Authentication and /progresso/me endpoint (EduCria)

This document explains the new authentication flow and the protected endpoint that returns a personalized progress summary.

## Backend (Node.js + Express)

### JWT login
- POST /usuarios/login
  - Request body: { email, senha }
  - Returns: { token, usuario: { id, nome, email } }
  - Token expiry: 1h (configured in backend)

### Protected endpoint
- GET /progresso/me
  - Requires Authorization header: `Authorization: Bearer <token>`
  - Uses token to identify the user (id is extracted from token payload)
  - Returns a JSON object with:
    - usuario_id
    - materias: array of { materia, registros, progressoMedia, pontos, faltas, boletimMedia }
    - totais: { pontos, faltas }
    - mediaProgressoGeral
    - mediaBoletimGeral
    - desempenhoGeral
    - raw: raw rows returned from DB

## Frontend (Angular)

- `AuthService.login()` stores the returned token and usuario in `localStorage`.
- `Progresso.getMe()` calls GET /progresso/me sending the `Authorization` header with the token and returns the summary described above.
- Pages that need personalized progress can call `Progresso.getMe()` after login and display `resumo.materias`, `resumo.totais` and `resumo.desempenhoGeral`.

## Example (curl)

1) Login

```bash
curl -X POST http://localhost:3000/usuarios/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"usuario@exemplo.com","senha":"senha123"}'
```

2) Fetch current user progress

```bash
curl -X GET http://localhost:3000/progresso/me \
  -H 'Authorization: Bearer <TOKEN_FROM_LOGIN>'
```

## Notes
- In production, use HTTPS and a strong, secret JWT key kept out of version control.
- Consider adding refresh tokens if you need long-lived sessions.
