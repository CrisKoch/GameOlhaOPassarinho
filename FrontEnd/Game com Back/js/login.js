
$(document).ready(function () {


    $("#btnLogin").click(function () {
        let $user = $("#user").val();
        let $pwd = $("#pwd").val();

        if ($user && $pwd) {
            $.getJSON("http://localhost:8080/usuarios", function ($registros) {
                console.log(JSON.stringify($registros));
                let usr = $registros.find($usuario => $usuario.user == $user && $usuario.pwd == $pwd)
                if (usr){
                    window.open(`index.html?id_usuario=${usr.id}`, "_self");
                    sessionStorage.setItem("id",usr.id);
                }
                    else alert("USUÁRIO INVÁLIDO")
            });

        } else alert("ERRO: favor informar usuário e senha");
    });

    $("#btnCadastro").click(function () {
        let $user = $("#user").val();
        let $pwd = $("#pwd").val();
        let data = { "user": $user, "pwd": $pwd };
        
        console.log(`${$user} ----- ${$pwd}`);
        
        if ($user && $pwd) {
            console.log("enviando Requisicao: " + JSON.stringify(data))
            let url = "http://localhost:8080/";
            axios.post(url, data);
            alert("CADASTRO REALIZADO COM SUCESSO.");
        }
        
        else alert("ERRO: favor informar usuário e senha");

    });

});
