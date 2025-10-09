import { Usuario } from './usuario';

describe('Usuario', () => {
  it('should create an object', () => {
    const usuario: Usuario = {
      nome_usuario: 'teste',
      email: 'teste@email.com',
      senha: '1234'
    };
    expect(usuario).toBeTruthy();
  });
});
