# Conecta Lab · Paulista

MVP responsivo de uma plataforma comunitária para negócios locais, cursos e oportunidades. A interface usa como referência visual as telas fornecidas para o projeto.

## Executar localmente

Sirva a pasta `dist` com qualquer servidor HTTP estático e abra o endereço local no navegador. Não há etapa de build nem instalação de dependências.

## Dados de demonstração

`dist/db.js` cria uma base IndexedDB chamada `conecta-lab-paulista` na primeira visita. Ela contém três negócios, quatro pessoas, três organizações e três oportunidades. As pessoas e organizações de exemplo são fictícias. Dados criados por um visitante ficam no próprio navegador e não aparecem para outros visitantes.

Os dados da versão anterior em `localStorage` são lidos na inicialização e preservados. A aplicação também mantém uma cópia local para uso quando o IndexedDB estiver indisponível.

## Telas

- Início, busca e detalhe de negócio
- Cursos, detalhe e progresso por aula
- Comunidade com perfis de pessoas e organizações
- Oportunidades e publicação de vaga
- Perfil, cadastro de negócio e conversa de demonstração

Para operação pública com dados compartilhados, ainda será necessário um serviço de autenticação, banco de dados no servidor e moderação.
