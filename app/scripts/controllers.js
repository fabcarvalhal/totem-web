app.controller("eventos", function ($scope, EventosService) {
    var retorno;

    EventosService.getEventos()
    .then(retorno => {
        if("error" in retorno.data) {
            console.log("DEU RUIM");
        } else {
            retorno = retorno.data;
            $scope.eventos = retorno.map(function(item){
               return { nome: item.nome,
                        inicio: new Date(item.inicio).toISOString(),
                        fim: new Date(item.fim).toISOString(),
                        faculdade: item.faculdade,
                        id: item.id
                }
            });
        }
    });
});

app.controller("eventoInterna", function($scope,$route, EventosService){
    var retorno;
    var id = $route.current.params.id;
    EventosService.getEvento(id).
    then(retorno => {
        if("error" in retorno.data){
            console.log(retorno.error);
        } else {
            retorno = retorno.data[0];
            $scope.evento = {
                nome: retorno.nome,
                inicio: new Date(retorno.inicio).toISOString(),
                fim: new Date(retorno.fim).toISOString()
            };

        }

    });
});


app.controller("inscricao", function($scope,$route,InscricaoService,InstituicoesService,CursosService) {
    var evento_id = $route.current.params.id;
    $scope.responseClass = '';
    $scope.selectedFacul = '';
    $scope.selectedCurso = '';
    $scope.isStudent = false;

    $scope.dados = {
        nome: '',
        id_faculdade: '',
        email: '',
        telefone: '',
        matricula: '',
        id_curso: '',
        cpf: '',
        id_evento: evento_id
    };

    function resetDados(){
        $scope.dados = {
            nome: '',
            id_faculdade: '',
            email: '',
            telefone: '',
            matricula: '',
            id_curso: '',
            cpf: '',
            id_evento: evento_id
        };
    }
    
    $scope.cursos = CursosService.getCursos().
    then(retorno => {
        if("error" in retorno.data){

        } else {
            $scope.cursos = retorno.data;
        }

    });
    
    $scope.instituicoes = InstituicoesService.getInstituicoes().
    then(retorno => {
        if("error" in retorno.data){

        } else {
            $scope.instituicoes = retorno.data;
        }
    });


    $scope.submitForm = function() {
        if ($scope.isStudent) {
            if ($scope.selectedFacul.id == undefined){
                $scope.responseClass = "danger";
                $scope.inscricaoResposta = "Por favor informe a faculdade";
                return;
            } else if($scope.selectedCurso.id == undefined) {
                $scope.responseClass = "danger";
                $scope.inscricaoResposta = "Por favor informe o curso";
                return;
            }
            $scope.dados.id_curso = $scope.selectedCurso.id;
            $scope.dados.id_faculdade = $scope.selectedFacul.id;
        }
        InscricaoService.inscrever($scope).
        then(retorno => {
            if(retorno.data.error == true) {
                $scope.responseClass = "danger";
                $scope.inscricaoResposta = retorno.data.message;
            } else {
                $scope.responseClass = "success";
                $scope.inscricaoResposta = retorno.data.message;
                resetDados()
                $scope.selectedFacul = {};
                $scope.selectedCurso = {};
                $scope.inscricao_form.$setPristine();
                $scope.inscricao_form.$setValidity();
                $scope.inscricao_form.$setUntouched();
                $scope.isStudent = false;
                
            }
        })
    }
});

app.controller("admeventoCadastro", function($scope,$route, EventosService, InstituicoesService ){
    var retorno;
    $scope.responseClass = '';
    $scope.selectedFacul = '';
    $scope.cadastroResposta = '';
    

    $scope.dados = {
        nome: '',
        faculdade: '',
        inicio: '',
        fim: ''
    };

    $scope.instituicoes = InstituicoesService.getInstituicoes().
    then(retorno => {
        if("error" in retorno.data){

        } else {
            $scope.instituicoes = retorno.data;
        }
    });

    $scope.submitForm = function() {
        if ($scope.selectedFacul.id == undefined){
           $scope.responseClass = "danger";
           $scope.cadastroResposta = "Por favor informe a faculdade";
           return;
       }
       $scope.dados.faculdade = $scope.selectedFacul.id;

       EventosService.cadastrar($scope).
       then(retorno => {
           if(retorno.data.error == true) {
               $scope.responseClass = "danger";
               $scope.cadastroResposta = retorno.data.message;
           } else {
               $scope.responseClass = "success";
               $scope.cadastroResposta = retorno.data.message;
               $scope.dados = {};
               $scope.selectedFacul = {};
               $scope.inscricao_form.$setPristine();
               $scope.inscricao_form.$setValidity();
               $scope.inscricao_form.$setUntouched();
           }
       })
   }

   
});

app.controller("admeventoEditar", function($scope,$route, EventosService, InstituicoesService ){
    var retorno;
    var evento_id = $route.current.params.id;
    $scope.responseClass = '';
    $scope.selectedFacul = '';
    $scope.editResposta = '';
    $scope.instituicoes;
    
    $scope.dados = {
        nome: '',
        faculdade: '',
        inicio: '',
        fim: '',
        id: evento_id
    };

    EventosService.getEvento(evento_id)
    .then(retorno => {
        if("error" in retorno.data){

        } else {
            let data = retorno.data[0];
            $scope.dados = {
                nome: data.nome,
                faculdade: data.faculdade.toString(),
                inicio: new Date(data.inicio),
                fim: new Date(data.fim),
                id: evento_id
            };

            InstituicoesService.getInstituicoes().
            then(retorno => {
                if("error" in retorno.data){
        
                } else {
                    $scope.instituicoes = retorno.data;
                }

                $scope.selectedFacul = $scope.instituicoes[$scope.instituicoes.findIndex(function(item){
                    return item.id == $scope.dados.faculdade.toString();
                })];

            });
            
            


            
        }

    })

    

    $scope.submitForm = function() {
        if ($scope.selectedFacul.id == undefined){
           $scope.responseClass = "danger";
           $scope.editResposta = "Por favor informe a faculdade";
           return;
       }
       $scope.dados.faculdade = $scope.selectedFacul.id;
       
       EventosService.editar($scope).
       then(retorno => {
           if(retorno.data.error == true) {
               $scope.responseClass = "danger";
               $scope.editResposta = retorno.data.message;
           } else {
               $scope.responseClass = "success";
               $scope.editResposta = retorno.data.message;
               $scope.dados = {};
               $scope.selectedFacul = {};
               $scope.inscricao_form.$setPristine();
               $scope.inscricao_form.$setValidity();
               $scope.inscricao_form.$setUntouched();
           }
       })
   }

   
});


app.controller("admcursoCadastrar", function($scope,$route, CursosService, InstituicoesService ){
    var retorno;
    $scope.responseClass = '';
    $scope.selectedFacul = '';
    $scope.cadastroResposta = '';
    

    $scope.dados = {
        nome: '',
        faculdade: '',
        area: ''
    };

    $scope.instituicoes = InstituicoesService.getInstituicoes().
    then(retorno => {
        if("error" in retorno.data){

        } else {
            $scope.instituicoes = retorno.data;
        }
    });

    $scope.submitForm = function() {
        if ($scope.selectedFacul.id == undefined){
           $scope.responseClass = "danger";
           $scope.cadastroResposta = "Por favor informe a faculdade";
           return;
       }
       $scope.dados.faculdade = $scope.selectedFacul.id;

       CursosService.cadastrar($scope).
       then(retorno => {
           if(retorno.data.error == true) {
               $scope.responseClass = "danger";
               $scope.cadastroResposta = retorno.data.message;
           } else {
               $scope.responseClass = "success";
               $scope.cadastroResposta = retorno.data.message;
               $scope.dados = {};
               $scope.selectedFacul = {};
               $scope.inscricao_form.$setPristine();
               $scope.inscricao_form.$setValidity();
               $scope.inscricao_form.$setUntouched();
           }
       })
   }

   
});

app.controller("admcursoEditar", function($scope,$route, CursosService, InstituicoesService ){
    var retorno;
    var cursoId = $route.current.params.id;
    $scope.responseClass = '';
    $scope.selectedFacul = '';
    $scope.editResposta = '';
    $scope.instituicoes;
    
    $scope.dados = {
        nome: '',
        faculdade: '',
        id: cursoId
    };

    CursosService.getCurso(cursoId)
    .then(retorno => {
        if("error" in retorno.data){

        } else {
            let data = retorno.data;
            $scope.dados = {
                nome: data.nome,
                faculdade: data.faculdade,
                area: data.area,
                id: cursoId
            };

            InstituicoesService.getInstituicoes().
            then(retorno => {
                if("error" in retorno.data){
        
                } else {
                    $scope.instituicoes = retorno.data;
                }

                $scope.selectedFacul = $scope.instituicoes[$scope.instituicoes.findIndex(function(item){
                    return item.id == $scope.dados.faculdade.toString();
                })];

            });
            
            


            
        }

    })

    $scope.submitForm = function() {
        if ($scope.selectedFacul.id == undefined){
           $scope.responseClass = "danger";
           $scope.editResposta = "Por favor informe a faculdade";
           return;
       }
       $scope.dados.faculdade = $scope.selectedFacul.id;
       
       CursosService.editar($scope).
       then(retorno => {
           if(retorno.data.error == true) {
               $scope.responseClass = "danger";
               $scope.editResposta = retorno.data.message;
           } else {
               $scope.responseClass = "success";
               $scope.editResposta = retorno.data.message;
               $scope.dados = {};
               $scope.selectedFacul = {};
               $scope.inscricao_form.$setPristine();
               $scope.inscricao_form.$setValidity();
               $scope.inscricao_form.$setUntouched();
           }
       })
   }

   
});

app.controller("adminstituicaoCadastrar", function($scope,$route, InstituicoesService ){
    var retorno;
    $scope.responseClass = '';
    $scope.cadastroResposta = '';

    $scope.dados = {
        endereco: '',
        nome_faculdade: ''
    };

    $scope.submitForm = function() {
       InstituicoesService.cadastrar($scope).
       then(retorno => {
           if(retorno.data.error == true) {
               $scope.responseClass = "danger";
               $scope.cadastroResposta = retorno.data.message;
           } else {
               $scope.responseClass = "success";
               $scope.cadastroResposta = retorno.data.message;
               $scope.dados = {};
               $scope.selectedFacul = {};
               $scope.inscricao_form.$setPristine();
               $scope.inscricao_form.$setValidity();
               $scope.inscricao_form.$setUntouched();
           }
       })
   }

   
});


app.controller("adminstituicaoEditar", function($scope,$route, InstituicoesService ){
    var retorno;
    var instituicaoId = $route.current.params.id;
    $scope.responseClass = '';
    $scope.editResposta = '';
    
    $scope.dados = {
        endereco: '',
        nome_faculdade: '',
        id: instituicaoId
    };

    InstituicoesService.getInstituicao(instituicaoId)
    .then(retorno => {
        if("error" in retorno.data){

        } else {
            let data = retorno.data;
            $scope.dados = data;
        }
    });

    $scope.submitForm = function() {
       InstituicoesService.editar($scope).
       then(retorno => {
           if(retorno.data.error == true) {
               $scope.responseClass = "danger";
               $scope.editResposta = retorno.data.message;
           } else {
               $scope.responseClass = "success";
               $scope.editResposta = retorno.data.message;
               $scope.dados = {
                    endereco: '',
                    nome_faculdade: '',
                    id: instituicaoId
               };
               $scope.selectedFacul = {};
               $scope.inscricao_form.$setPristine();
               $scope.inscricao_form.$setValidity();
               $scope.inscricao_form.$setUntouched();
           }
       })
   }

   
});


app.controller("credenciamento", function($scope,$route, EventosService, CredenciamentoService){

    $scope.selectedEvento = '';
    $scope.responseClass = '';
    $scope.credenciamentoResponse = '';
    $scope.actionOption = '';
    $scope.dados = {
        cpf: '',
        id_evento: ''
    };

    EventosService.getEventos()
    .then(retorno => {
        if("error" in retorno.data) {
        } else {
            retorno = retorno.data;
            $scope.eventos = retorno.map(function(item){
               return { nome: item.nome,
                        id: item.id
                }
            });
        }
    });

    $scope.submitForm = function() {
        if ($scope.actionOption == 'checkin') {
            checkin();
        } else if ($scope.actionOption == 'checkout') {
            checkout();
        } else {
            $scope.responseClass = 'danger';
            $scope.credenciamentoResponse = "Selecione checkin ou checkout.";
        }
    }

    function checkout() {
        if ($scope.selectedEvento.id == undefined){
            $scope.responseClass = "danger";
            $scope.credenciamentoResponse = "Por favor informe o evento";
            return;
        }
        $scope.dados.id_evento = $scope.selectedEvento.id;
        
        CredenciamentoService.checkout($scope)
        .then(retorno => {
            if(retorno.data.error == true) {
                $scope.responseClass = "danger";
                $scope.credenciamentoResponse = retorno.data.message;
            } else {
                $scope.responseClass = "success";
                $scope.credenciamentoResponse = retorno.data.message;
                $scope.dados = {
                    cpf: '',
                    id_evento: ''
                };
                $scope.selectedEvento = {};
                $scope.inscricao_form.$setPristine();
                $scope.inscricao_form.$setValidity();
                $scope.inscricao_form.$setUntouched();
            }
        });
    }

    function checkin(){
        if ($scope.selectedEvento.id == undefined){
            $scope.responseClass = "danger";
            $scope.credenciamentoResponse = "Por favor informe o evento";
            return;
        }
        $scope.dados.id_evento = $scope.selectedEvento.id;
        
        CredenciamentoService.checkin($scope)
        .then(retorno => {
            if(retorno.data.error == true) {
                $scope.responseClass = "danger";
                $scope.credenciamentoResponse = retorno.data.message;
            } else {
                $scope.responseClass = "success";
                $scope.credenciamentoResponse = retorno.data.message;
                $scope.dados = {
                    cpf: '',
                    id_evento: ''
                };
                $scope.selectedEvento = {};
                $scope.inscricao_form.$setPristine();
                $scope.inscricao_form.$setValidity();
                $scope.inscricao_form.$setUntouched();
            }
        });
    }
})