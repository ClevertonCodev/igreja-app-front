import api from "./Instance";

function DeleteAuto (idveiculo:number, idcaravana:number  ) {
    api.post(`/excluirveiculoshascaravanas/${idveiculo}`, idcaravana )
    .then((resposta: { data: string }) => {
        return alert("Apagou esse veiculo da caravana!");
        
      }) .catch(function (error) {
          return alert("Algo deu errado!")
         
      });

}

export default DeleteAuto