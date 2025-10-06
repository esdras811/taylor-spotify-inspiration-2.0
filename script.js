document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona os elementos principais
    const header = document.querySelector('.spotify-header');
    const eraCards = document.querySelectorAll('.era-card');
    const headerBgImage = document.querySelector('.header-bg-image');
    
    // 2. Adiciona a classe para permitir a transição suave de cor no header
    header.classList.add('color-header-change');

    // 3. Define uma cor padrão e a imagem de fundo inicial (pode ser a cor de Midnights, por exemplo)
    const defaultEraColor = '#404040'; // Cor padrão do gradiente, cinza escuro
    
    // 4. Itera sobre cada card de era para adicionar a interatividade
    eraCards.forEach(card => {
        // Pega a cor definida no atributo data-era-color do HTML
        const eraColor = card.getAttribute('data-era-color');

        // Evento ao passar o mouse (mouseover/mouseenter)
        card.addEventListener('mouseenter', () => {
            // A. Mudar a cor do cabeçalho:
            // Define a variável CSS --main-era-color com a cor da era
            document.documentElement.style.setProperty('--main-era-color', eraColor);
            
            // Adiciona a classe que aplica o gradiente dinâmico no header (definida no CSS)
            header.classList.add('dynamic-color');
            
            // B. Efeito de destaque no card:
            // Muda a cor do background do card ao passar o mouse para dar destaque
            // Usando '33' no final para adicionar uma transparência (opacidade 20%) à cor da era
            card.style.backgroundColor = `${eraColor}33`; 
            
            // C. Opcional: Mudar a imagem de fundo ou efeito, se houver lógica para isso.
            // Para manter a simulação do Spotify, vamos focar na cor do gradiente.
        });

        // Evento ao tirar o mouse (mouseout/mouseleave)
        card.addEventListener('mouseleave', () => {
            // A. Voltar a cor do cabeçalho para o padrão:
            document.documentElement.style.setProperty('--main-era-color', defaultEraColor);
            header.classList.remove('dynamic-color');
            
            // B. Voltar a cor de fundo do card para o padrão:
            card.style.backgroundColor = '#181818'; // Cor padrão do card definida no CSS
        });
    });
});