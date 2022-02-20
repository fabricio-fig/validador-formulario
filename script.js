let validadorJS = {
	handleSubmit:(event) =>{
		event.preventDefault();
		let send = true;
		
		let inputs = document.querySelectorAll('input');

		validadorJS.clearErrors();

		for(let i = 0; i <inputs.length; i++){
			let input = inputs[i];
			let check = validadorJS.checkInput(input);

			if(check !== true){
				send = false;
				//exibir o erro
				validadorJS.showError(input, check);
			}
		}
		if(send){
			let form = document.querySelector('.validador');
			form.submit();
			$('#logado-container').innerHTML = alert('Login realizado com sucesso!');
		}
	},
	checkInput:(input) =>{
		let rules = input.getAttribute('data-rules');

		if(rules !== null){
			rules = rules.split('|');
			for(let k in rules){
				let rDetails = rules[k].split('=');
				switch(rDetails[0]){
					case 'required':
						if(input.value == ''){
							return 'Campo não pode ficar vazio.';
						}
					break;

					case 'min':
						if(input.value.length < rDetails[1]){
							return 'Campo exige no mínimo '+rDetails[1]+' caracteres';
						}
					break;
					case 'email':
						if(input.value != ''){
							let regex = /\S+@\S+\.\S+/;
							if(!regex.test(input.value.toLowerCase()) ){
								return 'E-mail inválido';
							}
						}
					break;
				}
			}
		}

		return true;
	},
	showError:(input, error) =>{
		input.style.borderColor = '#FF0000';
		
		let errorElement = document.createElement('div');
		errorElement.classList.add('error');
		errorElement.innerHTML = error;

		input.parentElement.insertBefore(errorElement, input.ElementSibling);

	},
	clearErrors:() =>{

		let inputs = document.querySelectorAll('input');
		for(let i = 0; i< inputs.length; i++){
			inputs[i].style = '';
		}

		let errorElements = document.querySelectorAll('.error')
		for(let i = 0; i< errorElements.length; i++){
			errorElements[i].remove();
		}
	}
};
window.onload = function(){
	let form = document.querySelector('.validador');
	form.addEventListener('submit', validadorJS.handleSubmit);
}