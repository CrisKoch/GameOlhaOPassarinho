const $levels = { "easy": 3, "medium": 5, "hard": 7 };
const $imgWidth = 100; // largura da toupeira
const $imgHeight = 79; //altura da toupeira
const $imgsTheme = { "default": "../img/sozinhoB.gif", "active": "../img/passarinhos2.gif", "dead": "../img/fotoNova4.gif", "capa": "../img/fotoCapa.gif" }
const $inicialTime = 10; //tempo de jogabilidade independente da fase
var $timeGame = $inicialTime;
var $idChronoGame; // irá controlar o setIterval do cronometro
var $idChronoStartGame;
var $urlParams = new URLSearchParams(window.location.search);
//var $userId = $urlParams.get('id_usuario');
var $userId = sessionStorage.getItem("id");
console.log("Passado pela sessionStorage: " + sessionStorage.getItem("id"))
//console.log("Usuario: " + $userId)

$(document).ready(function () {
    fillBoard();
    $("#chrono").text($inicialTime);
    $("#btnPlay").click(function () {
        btnCtrl();
        $idChronoStartGame = setInterval(startGame, 1180);
        $idChronoGame = setInterval(startChronoGame, 1000);

    });

    $("#btnPause").click(function () {
        btnPause();

    });

    $("#btnStop").click(function () {
        endGame();
    });

    $("#btnExit").click(function () {
        window.open("welcome.html", "_self");
    });

});


function startChronoGame() {
    let $secondsFormat = (--$timeGame).toLocaleString("pt-br", { minimumIntegerDigits: 2 });
    ($timeGame >= 0) ? $("#chrono").text($secondsFormat) : endGame();
}

function endGame() {
    clearInterval($idChronoGame);
    clearInterval($idChronoStartGame);

    ranking($("#level option:selected").text(), $("#score").text(), $userId);
    sessionStorage.setItem("level", $("#level option:selected").text());
    alertWifi(`Parabéns! No nível ${"<em>"}${$("#level option:selected").text()}${"</em>"} você conseguiu tirar ${$("#score").text()} fotos.`,
        false, 0, `img/${$imgsTheme.capa}`, "50");
   
    fillBoard();

    $("#score").text("0");
    $timeGame = $inicialTime;
    $("#chrono").text($timeGame);
   

}

function btnCtrl() {
    $("#btnPause").prop("disabled", false); //Habilita
    $("#btnStop").prop("disabled", false);//Habilita
    $("#btnPlay").prop("disabled", true); //Desabilita
}
function btnPause() {
    $("#btnPause").prop("disabled", true); //Habilita
    $("#btnStop").prop("disabled", false);//Habilita
    $("#btnPlay").prop("disabled", false); //Habilita
}
//Cria a moldura do tabuleiro conforme o nível de dificuldade
function fillBoard() {
    $level = getLevel();
    $boardWidth = $imgWidth * $level;
    $boardHeight = $imgHeight * $level;
    $("#board").css({ "width": $boardWidth, "height": $boardHeight });
    placeHolesBoard($level);

}
//insere os buracos das toupeiras no tabuleiro
function placeHolesBoard($level) {
    $("#board").empty();
    for ($i = 0; $i < Math.pow($level, 2); $i++) {
        $div = $("<div></div>");//attr("id",`mole_${$i+1}`);
        $img = $("<img>").attr({ "src": `img/${$imgsTheme.default}`, "id": `mole_${$i + 1}` });
        $($img).click(function () { updateScore(this) });
        $($div).append($img);
        $("#board").append($div);
    }
}
function updateScore($img) {
    if ($($img).attr("src").search($imgsTheme.active) != -1) {
        $("#score").text(parseInt($("#score").text()) + 1);
        $($img).attr("src", `img/${$imgsTheme.dead}`);
    }

}


function startGame() {
    fillBoard(); // Melhorar: trocar apenas a toupeira do tabuleiro pelo buraco ao inves de limpar todo o tabuleiro
    $("#cursor").css("cursor", "")
    $level = getLevel();
    $randNumber = getRanNumber(1, Math.pow($level, 2));
    $(`#mole_${$randNumber}`).attr("src", `img/${$imgsTheme.active}`);
}
// Gera um numero aleatorio entre "min" e "max"
function getRanNumber(min, max) {
    return Math.round((Math.random() * Math.abs(max - min)) + min);
}
function getLevel() {
    return $levels[$("#level").val()];
}
function ranking($nivel, $pontuacao, $userId) {

    let $rankeamento = { "pontos": $pontuacao, "nivel": $nivel, "usuario": { "id": $userId } };
    let $urlRanking = "http://localhost:8080/novo-ranking";
    axios.post($urlRanking, $rankeamento);

}

/*function buscaRanking() {
    const url = `http://localhost:8080/ranking/${$nivel}`;
    axios.get(url).then(
        (result) => {
            console.log(result.data)
            alertWifi(`Fim de Jogo. Sua pontuação foi = ${pontuacao}<div>` +
                mostraRanking(result) + '</div>',
                false, 0, `img/${$imgsTheme.dead}`, "50");
        })
};
function mostraRanking(result) {
    return (
        "<table class='caixa'><thead><tr><td>Usuário</td><td>Pontos</td></tr></thead>" +
        result.data.slice(0, 9).map(pontos => {
            return `<tr><td>${pontos.usuario.user}</td><td>${pontos.pontuacao}</td></tr> `;
        }).join('') +
        "</table>"
    )
}*/