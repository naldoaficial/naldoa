document.addEventListener('DOMContentLoaded', function() {
    // Lógica do Header e Animações de Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Efeito de Brilho ao Rolar
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));

    // Rádio no Topo
    const playPauseButton = document.getElementById('play-pause-button');
    const radioStream = document.getElementById('radio-stream');
    const onAirPulse = document.querySelector('.on-air-pulse');
    
    playPauseButton.addEventListener('click', () => {
        if (radioStream.paused) {
            radioStream.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            onAirPulse.style.display = 'block';
        } else {
            radioStream.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
            onAirPulse.style.display = 'none';
        }
    });

    // Lógica "Carregar Mais Vídeos"
    const allVideoIds = [ "dGdda27vfRM", "dwYoOnT_7Pc", "AHsb5xThjyk", "-wFl2OcdDnk", "GdE1z8Mf0zA", "s-p1w9kAkFY", "8FylSyd2Q6o", "lcSXpMr0OUw", "N4KYGevK0nA", "UZfhORsxS98", "BM4uCU1pUAY", "QoFsUuUjusc" ];
    let loadedVideosCount = 0;
    const videosGrid = document.querySelector('.videos-grid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    function loadMoreVideos() {
        const videosToLoad = allVideoIds.slice(loadedVideosCount, loadedVideosCount + 3);
        videosToLoad.forEach(videoId => {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container reveal';
            videoContainer.innerHTML = `<iframe loading="lazy" src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
            videosGrid.appendChild(videoContainer);
            revealObserver.observe(videoContainer); // Adiciona o novo vídeo ao observador de animação
        });
        loadedVideosCount += 3;
        if (loadedVideosCount >= allVideoIds.length) {
            loadMoreBtn.style.display = 'none';
        }
    }
    loadMoreBtn.addEventListener('click', loadMoreVideos);
});
