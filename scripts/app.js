var app = angular.module("totem-web", ["ngRoute","angularUtils.directives.dirPagination"]);
app.constant("APIURL", "https://www.nexusjr.com/totem-api");

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "eventos.html"
    })
    .when("/evento/:id", {
        templateUrl : "evento.html"
    })
    .when("/adm/evento/cadastrar", {
        templateUrl : "adm/cadastrarEvento.html"
    })
    .when("/adm/evento/:id/editar", {
        templateUrl : "adm/editarEvento.html"
    })
    .when("/adm/eventos", {     
        templateUrl : "adm/listarEventos.html"
    })
    .when("/adm/curso/cadastrar", {
        templateUrl : "adm/cadastrarCurso.html"
    })
    .when("/adm/curso/:id/editar", {
        templateUrl : "adm/editarCurso.html"
    })
    .when("/adm/cursos", {
        templateUrl : "adm/listarCursos.html"
    })
    .when("/adm/instituicao/cadastrar", {
        templateUrl : "adm/cadastrarInstituicao.html"
    })
    .when("/adm/instituicao/:id/editar", {
        templateUrl : "adm/editarInstituicao.html"
    })
    .when("/adm/instituicoes", {
        templateUrl : "adm/listarInstitut.html"
    })
    .when("/credenciamento", {
        templateUrl : "credenciamento.html"
    })
    .when("/adm", {
        templateUrl : "adm/dash.html"
    });
});