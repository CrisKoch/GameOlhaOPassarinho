$(document).ready(function () {
    console.log(sessionStorage.getItem("id"));

    
        $nivelUsuario = sessionStorage.getItem("level");
        $idUsuario = sessionStorage.getItem("id");
        $("#nivelJogador").text($nivelUsuario);
   

    $usuarios = $.getJSON("http://localhost:8080/usuarios", function ($registros) {
        let user = $registros.find(element => element == $idUsuario);
    });
    mostraRanking();

});
function mostraRanking() {
    $.getJSON("http://localhost:8080/ranking", function ($ranking) {

        console.log($ranking);
        let todosPorNivel = $ranking.filter((value) => value.nivel == $nivelUsuario);
        console.log(todosPorNivel);
        todosPorNivel.sort((a, b) => b.pontos - a.pontos);
        $("#tabela").html("");
        for ($i = 0; $i < 3; $i++) {
            $("#tabela tbody").append(`
                <tr> +
                <td>${$i + 1}</id> +
                <td>${todosPorNivel[$i].usuario_id.user}</td> +
                <td>${todosPorNivel[$i].pontos}</td>`
            )

        }
    })
}
