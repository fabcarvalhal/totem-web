app.factory('EventosService', 
    ['$http',
        function($http) {
            var urlBase = "http://localhost/totem-api";

            this.getEventos = function() {
               return $http.get(urlBase+"/eventos");
            }

            this.getEvento = function(id) {
                return $http.get(urlBase+"/evento/"+id);
            }

            this.cadastrar = function($scope) {
                return $http.post(urlBase+"/adm/evento/cadastrar",$scope.dados);
            }

            this.editar = function($scope) {
                return $http.post(urlBase+"/adm/evento/editar",$scope.dados);
            }

            this.getAdmEventos = function() {
                return $http.get(urlBase+"/adm/eventos")
            }

            return this;
        }
    ]
);

app.factory('InscricaoService',
    ['$http',
        function($http){
            var urlBase = "http://localhost/totem-api";


            this.inscrever = function($scope) {
                var config = {
                    headers:  {'Content-Type': 'application/x-www-form-urlencoded'}
                }
                return $http.post(urlBase+"/inscrever",$scope.dados);
            }

            return this;
        }
    ]


);


app.factory('InstituicoesService', 
    ['$http',
        function($http) {
            var urlBase = "http://localhost/totem-api";

            this.getInstituicoes = function() {
               return $http.get(urlBase+"/instituicoes");
            }

            this.cadastrar = function($scope) {
                return $http.post(urlBase+"/adm/instituicao/cadastrar",$scope.dados);
             }

            this.editar = function($scope) {
                return $http.post(urlBase+"/adm/instituicao/editar",$scope.dados);
            }

            this.getInstituicao = function(id) {
                return $http.get(urlBase+"/instituicao/"+id);
            }

            return this;
        }
    ]
);


app.factory('CursosService', 
    ['$http',
        function($http) {
            var urlBase = "http://localhost/totem-api";

            this.getCursos = function() {
               return $http.get(urlBase+"/cursos");
            }

            this.cadastrar = function($scope) {
                return $http.post(urlBase+"/adm/curso/cadastrar",$scope.dados);
            }
            
            this.getCurso = function(id) {
                return $http.get(urlBase+"/curso/"+id);
            }

            this.editar = function($scope) {
                return $http.post(urlBase+"/adm/curso/editar",$scope.dados);
            }

            return this;
        }
    ]
);

app.factory('CredenciamentoService', 
    ['$http',
        function($http) {
            var urlBase = "http://localhost/totem-api";

            this.checkin = function($scope) {
                return $http.post(urlBase+"/checkin",$scope.dados);
            }

            this.checkout = function($scope) {
                return $http.post(urlBase+"/checkout",$scope.dados);
            }
            return this;
        }
    ]
);