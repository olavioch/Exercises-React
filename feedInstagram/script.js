var arra = [];
//Inicio NavBar
class Navbar extends React.Component{
	render(){
		return(
			<nav class="navbar fixed-top navbar-light bg-light justify-content-between">
			  <a class="navbar-brand"><div className="marca"></div></a>
			  <form class="form-inline">
				<input class="form-control mr-sm-2" type="search" placeholder="Busca" aria-label="Search" />
			  </form>
			  <div className="botoes d-flex">
					<div className="icon mr-3" onClick={this.Clicou}></div>
					<div className="icon mr-3"></div>
					<div className="icon mr-3"></div>
				</div>
			</nav>
		);
	}
}
//Fim NavBar

//inicio FeedInstagram
class Feed extends React.Component{
	render(){
		return(
			<div className="d-flex justify-content-center align-items-center mt-5 mb-5 w-100">
			<div className="d-flex feed">
				<div className="back-image"></div>
				<div className="ifeed shadow">
					<InfoPerfil />
					<Coments />
					<Likes />
					<InputComents />
				</div>  
			</div>
			</div>
		);
	}
}

//info perfil, foto e titulo
class InfoPerfil extends React.Component{
	render(){
		return(
			<div className="d-flex align-items-center border-bottom p-2"> <div className="perfil mr-2"></div> Olavo Argemiro</div>
		);
	}
}

// area de comentarios
class Coments extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			info:""
		}
	}
	componentDidMount(){
      this.timer = setInterval(
			()=>{
				this.setState({
					info: localStorage.getItem("comentarios")
				})
			}
		,100);
	}
    
	render(){
		let list = this.state.info.split(",");
		let recebe = [];
		for(let i in list){
			recebe[i]= <li className="list-unstyled"> <span className="font-weight-bold">{" Olavo Argemiro"}</span> {list[i]}</li>;
		}
		return(
			<ul className="p-2 border-bottom mb-0 comentarios">
				{recebe}
			</ul>
		);
	}
}
// area de botoes 
class Likes extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			like :false,
			likes: 300
		}
		this.Clicou = this.Clicou.bind(this);
	}
	Clicou(){
		let curtidas = this.state.likes;
		if(this.state.like == false){
			curtidas = curtidas + 1;
			this.setState({like: true});
			this.setState({likes : curtidas})
			document.getElementsByClassName("icons")[0].classList.add("active");
			document.getElementsByClassName("icons")[0].classList.remove("desactive");

		}else{
			curtidas = curtidas - 1;
			this.setState({like: false});
			this.setState({likes : curtidas})
			document.getElementsByClassName("icons")[0].classList.add("desactive");
			document.getElementsByClassName("icons")[0].classList.remove("active");
		}
	}
	render(){
		return(
			<div className="p-2 border-bottom area-botoes">
				<div className="botoes d-flex">
					<div className="icons ml-2 desactive" onClick={this.Clicou}></div>
					<div className="icons ml-2"></div>
					<div className="icons ml-2"></div>
				</div>
				<div className="info-curtidas ml-2">{this.state.likes} curtidas</div>
			</div>
		);
	}
}
// area de comentar
class InputComents extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			comentario:""
		}
		this.RecebeComents = this.RecebeComents.bind(this);
		this.RecebeEnter = this.RecebeEnter.bind(this);
	}
	RecebeComents(e){
		this.setState({comentario : e.target.value});
	}
	RecebeEnter(e){
		if(e.key == "Enter"){
			arra.push(this.state.comentario);
			localStorage.setItem("comentarios", arra );
			document.getElementById("comentario").value = "";
		}
	}
	render(){
		return(
			<input className="ml-2 p-2 w-100" id = "comentario" type="text" placeholder="Adicione um comentario"
			onChange={(event)=>{this.RecebeComents(event)}}
			onKeyUp={(event)=>{this.RecebeEnter(event)}}/>
		);
	}
}
//fim FeedInstagram


let app = <div>
			<Navbar />
			<div className="espaço"></div>
			<Feed />
		</div>;
ReactDOM.render(app, document.getElementById('root'));