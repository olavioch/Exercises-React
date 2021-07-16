//inicio conversor
class Moeda extends React.Component{
	render(){
		return(
		<div>
			<p> Digite o valor em {this.props.moeda} </p>
			<input type="number" name={this.props.moeda} 
			onChange={this.props.mudar = (event)=>{
				if(this.props.moeda == "dolar"){
					let real = document.querySelector('input[name="reais"]');
					real.value = event.target.value *5;
					this.props.valor = real.value;
				}
				if(this.props.moeda == "reais"){
					let dolar = document.querySelector('input[name="dolar"]');
					dolar.value = event.target.value /5;
					this.props.valor = dolar.value;
				}
			}}
			></input>{this.props.moeda == "dolar"? " $" : " R$"}

		</div>
		);
	}
}

class Conversor extends React.Component{
    
	constructor(props){
        super(props);
        this.state = {
			valor:20
        }
		this.Mudar = this.Mudar.bind(this);
    }
	Mudar(entrada){
		console.log(entrada);
		this.setState({valor:entrada});
	}
    render(){
        return(
				 <div className="conversor m-2 p-5 shadow">
					<div className="area-conv">
						<h4>Conversor de Moedas</h4>
						<Moeda valor={this.state.valor} moeda="dolar" mudar={this.Mudar}/>
						<Moeda valor={this.state.valor} moeda="reais" mudar={this.Mudar}/>
					</div>
                </div>
        );
    }
}
//fim conversor

//inicio sinal
class Luz extends React.Component{
	render(){
		return(
			<div id={this.props.cor}></div>
		);
	}
}
class Sinal extends React.Component{
	constructor(props){
		super(props);
		this.state={
			cor: ["red", "white", "white"]
		}
		this.trocarCorGre = this.trocarCorGre.bind(this);
		this.trocarCorRed = this.trocarCorRed.bind(this);
		this.trocarCor = this.trocarCor.bind(this);

	}
	trocarCor(){
		this.setState({cor: ["white", "yellow", "white"]});
		setTimeout(this.trocarCorGre, 1000);
	}
	trocarCorGre(){
		this.setState({cor: ["white", "white", "green"]});
	} 
	trocarCorRed(){
		this.setState({cor: ["red", "white", "white"]}); 
	}
	render(){
		return(
		<div className="sinal m-2 p-5 shadow d-flex">
			<div>
				<h4 className="mb-5">Sinal de Transito</h4>
				<div className="sinal-body">
					<Luz cor={this.state.cor[0]}/>
					<Luz cor={this.state.cor[1]}/>
					<Luz cor={this.state.cor[2]}/>
				</div>
			</div>
			<div className="m-5">
				<a className="btn btn-primary mr-3 mt-5" onClick={this.trocarCor}> Acender verde</a>
				<a className="btn btn-primary mt-5" onClick={this.trocarCorRed}> Acender vermelho</a>
			</div>
		</div>
		);
	}
}
//fim sinal

//inicio estoque
class Listestoque extends React.Component{
	render(){
		let recebe = [] ;
		for(let i in tarefasJson){
		if((tarefasJson[i].nome.indexOf(this.props.procura) > 0) | (tarefasJson[i].tipo.indexOf(this.props.procura) > 0)){
			recebe[i] =
			<li className={tarefasJson[i].estoque == true? ("d-flex border-bottom mb-1 bg-secondary") : 
			(this.props.ativado == true? "d-none":"d-flex text-danger border-bottom mb-1 bg-secondary")}>
			<div className="mr-5">{tarefasJson[i].nome}</div>
			<div className="mr-5">{tarefasJson[i].preco}</div>
			<div>{tarefasJson[i].tipo}</div>
			</li>;
			}}
		return(
		<div className = "shadow w-50">
		<ul className ="p-0">
		{recebe}
		</ul>		
		</div>
		);
	}
}
class Estoque extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			searching: "",
			ativado: false
		};
		this.getSearch = this.getSearch.bind(this);
		this.Checado = this.Checado.bind(this);
	}
	getSearch(e){
		this.setState({searching: e});
	}
	Checado(e){
		this.setState({ativado:e});
	}
	render(){
		return(
		<div className="estoque m-2 p-5 shadow">
			<h4>Busca Estoque</h4>
			<input className="mt-3 mb-3" type="text" placeholder="search tipo ou nome..."
			onChange = {(event)=>{this.getSearch(event.target.value)}}
			></input><br></br>
			<label><input type="checkbox" className="mr-2" 
			onClick={(event)=>{this.Checado(event.target.checked)}}></input> 
			Apresentar apenas produtos em estoque.</label>
			<Listestoque procura={this.state.searching} ativado={this.state.ativado}/>
		</div>
		);
	}
}
//fim estoque

//inicio tabela
class Modal extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			nomeA:"", nomeB:"", nomeC:"",
			emailA:"", emailB:"", emailC:"",
			telA:"", telB:"", telC:""
		}
		this.Salvar = this.Salvar.bind(this);
		this.RecebeNome = this.RecebeNome.bind(this);
		this.RecebeEmail = this.RecebeEmail.bind(this);
		this.RecebeTel = this.RecebeTel.bind(this);
	}
	//Salva as informações na key nome no banco de dados local: etapa 4
	Salvar(){
		if(localStorage.getItem("id") == 1){
		localStorage.setItem("nome0", this.state.nomeA);
		localStorage.setItem("email0", this.state.emailA);
		localStorage.setItem("tel0", this.state.telA);
		}
		else if(localStorage.getItem("id") == 2){
		localStorage.setItem("nome1", this.state.nomeB);
		localStorage.setItem("email1", this.state.emailB);
		localStorage.setItem("tel1", this.state.telB);
		}
		else{
		localStorage.setItem("nome2", this.state.nomeC);
		localStorage.setItem("email2", this.state.emailC);
		localStorage.setItem("tel2", this.state.telC);
		}
		document.querySelector('input[name="iname"]').value= "";
		document.querySelector('input[name="iemail"]').value= "";
		document.querySelector('input[name="itel"]').value= "";
	}
	//Recebe o que foi digitado no campo nome: etapa3
	RecebeNome(e){
		if(localStorage.getItem("id") == 1){
			this.setState({nomeA:e});
		}
		else if(localStorage.getItem("id") == 2){
			this.setState({nomeB:e});
		}
		else{
			this.setState({nomeC:e});
		}
	}
	RecebeEmail(e){
		if(localStorage.getItem("id") == 1){
			this.setState({emailA:e});
		}
		else if(localStorage.getItem("id") == 2){
			this.setState({emailB:e});
		}
		else{
			this.setState({emailC:e});
		}
	}
	RecebeTel(e){
		if(localStorage.getItem("id") == 1){
			this.setState({telA:e});
		}
		else if(localStorage.getItem("id") == 2){
			this.setState({telB:e});
		}
		else{
			this.setState({telC:e});
		}
	}
	//Aciona o modal: etapa 2;
	render(){
		return(
			<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
				<div class="modal-content">
				  <div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Editar Perfil</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				  </div>
				  <div class="modal-body">
					Nome<br/>
					<input type="text" name="iname" className="w-100 mb-2" 
					onChange={(event)=>{this.RecebeNome(event.target.value)}}/><br/>
					Email<br/>
					<input type="email" className="w-100 mb-2" name="iemail"
					onChange={(event)=>{this.RecebeEmail(event.target.value)}}/><br/>
					Telefone<br/>
					<input type="number" className="w-100 mb-2" name="itel"
					onChange={(event)=>{this.RecebeTel(event.target.value)}}/><br/>
				  </div>
				  <div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.Salvar}>Salvar Informações</button>
				  </div>
				</div>
			  </div>
			</div>
		);
	}
}
class Linha extends React.Component{
	render(){
		return(
			<tr>
				<td>{this.props.nome}</td>
				<td>{this.props.email}</td>
				<td>{this.props.numero}</td>
				<td>{this.props.botao}</td>
			</tr>
		);
	}
}
class Tabela extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			info: []
		}
	}

	componentDidMount(){
      this.timer = setInterval(
			()=>{
				this.setState({
					info: [
					localStorage.getItem("nome0"), localStorage.getItem("nome1"), 
					localStorage.getItem("nome2"), localStorage.getItem("email0"),
					localStorage.getItem("email1"), localStorage.getItem("email2"),
					localStorage.getItem("tel0"), localStorage.getItem("tel1"),
					localStorage.getItem("tel2")
					]
					});
				
				}
		,100);
    }
	
	render(){
		return( <div>
		<table className="table table-dark table-hover mt-5">
				<thead>
				  <tr>
					<th scope = "col">Nome</th>
					<th scope = "col">Email</th> 
					<th scope = "col">Telefone</th>
					<th scope = "col">Ações</th>
				  </tr>
				</thead>
				<tbody>
					<Linha nome={this.state.info[0]} email={this.state.info[3]} numero={this.state.info[6]} 
					botao={
						<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
						onClick={()=>{localStorage.setItem("id", "1")}}>
						Edit</button>
					}/>
					<Linha nome={this.state.info[1]} email={this.state.info[4]} numero={this.state.info[7]} 
					botao={
						<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
						onClick = {()=>{localStorage.setItem("id", "2")}}>
						Edit</button>
					}/>
					<Linha nome={this.state.info[2]} email={this.state.info[5]} numero={this.state.info[8]} 
					botao={
						<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
						onClick = {()=>{localStorage.setItem("id", "3")}}>
						Edit</button>
					}/>					
				</tbody>
				</table>
				<Modal/>
				</div>
		);
	}
}
class TabelaModal extends React.Component{
	render(){
		return(
			<div className="tabela m-2 p-5 shadow">
				<h4>Tabela com edição via modal</h4>
				<Tabela />
			</div>
		);
	}
}
//fim tabela

//inicio feed de noticias instagram
class Instagram extends React.Component{
	render(){
		return(
			<div className= "m-2 p-5 shadow">
				<h4>Feed de noticias Instagram</h4>
				<a class="btn btn-primary" href="feedInstagram/index.html" target="_blank"> Acessar link</a>
			</div>
		);
	}
}
//fim feed instagram

let app = <div className = "container-fluid">
			<h1 className="text-center m-2 bg-dark text-light"> Exercicios React</h1>
			<Conversor/>
			<Sinal/>
			<Estoque/>
			<TabelaModal/>
			<Instagram/>
		</div>;
ReactDOM.render(app, document.getElementById('root'));