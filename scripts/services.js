app.factory('EventosService', 
    ['$http','APIURL', 
        function($http, APIURL) {
            this.getEventos = function() {
               
               return $http.get(APIURL+"/eventos");
            }

            this.getEvento = function(id) {
                return $http.get(APIURL+"/evento/"+id);
            }

            this.cadastrar = function($scope) {
                return $http.post(APIURL+"/adm/evento/cadastrar",$scope.dados);
            }

            this.editar = function($scope) {
                return $http.post(APIURL+"/adm/evento/editar",$scope.dados);
            }

            this.getAdmEventos = function() {
                return $http.get(APIURL+"/adm/eventos")
            }

            this.getOngoingEvents = function() {
                return $http.get(APIURL+"/ongoingEvents")
            }

            return this;
        }
    ]
);

app.factory('InscricaoService',
    ['$http', 'APIURL',
        function($http, APIURL){
            this.inscrever = function($scope) {
                return $http.post(APIURL+"/inscrever",$scope.dados);
            }

            return this;
        }
    ]


);


app.factory('InstituicoesService', 
    ['$http', 'APIURL', 
        function($http, APIURL) {
            this.getInstituicoes = function() {
               return $http.get(APIURL+"/instituicoes");
            }

            this.cadastrar = function($scope) {
                return $http.post(APIURL+"/adm/instituicao/cadastrar",$scope.dados);
             }

            this.editar = function($scope) {
                return $http.post(APIURL+"/adm/instituicao/editar",$scope.dados);
            }

            this.getInstituicao = function(id) {
                return $http.get(APIURL+"/instituicao/"+id);
            }

            return this;
        }
    ]
);


app.factory('CursosService', 
    ['$http', 'APIURL',
        function($http, APIURL) {

            this.getCursos = function() {
               return $http.get(APIURL+"/cursos");
            }

            this.cadastrar = function($scope) {
                return $http.post(APIURL+"/adm/curso/cadastrar",$scope.dados);
            }
            
            this.getCurso = function(id) {
                return $http.get(APIURL+"/curso/"+id);
            }

            this.editar = function($scope) {
                return $http.post(APIURL+"/adm/curso/editar",$scope.dados);
            }

            return this;
        }
    ]
);

app.factory('CredenciamentoService', 
    ['$http', 'APIURL',
        function($http, APIURL) {

            this.checkin = function($scope) {
                return $http.post(APIURL+"/checkin",$scope.dados);
            }

            this.checkout = function($scope) {
                return $http.post(APIURL+"/checkout",$scope.dados);
            }
            return this;
        }
    ]
);