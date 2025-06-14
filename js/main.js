// 게임 시작
window.addEventListener('load', () => {
    const game = new ConstellationGame();
    window.game = game; // 전역 접근을 위해
    game.init();
});