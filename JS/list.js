import { GithubUser } from "./GithubUser.js"


export class List{
    constructor (root){
        this.root = document.querySelector(root);
        this.tbody = document.querySelector('#tb')
        this.load()
        this.update()
        this.onadd()
    }


    load(){
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }
    
    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username){
        try{
            const userExists = this.entries.find(entry => entry.login === username);
            if(userExists){
                throw new Error ('Usuário já cadastrado')
            }

            const user = await GithubUser.search(username)

            if(user.login === undefined){
                throw new Error('Usuário não encontrado!')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        }catch(error) {
            alert(error.message)
        }
    }

    onadd(){
        const addButton = this.root.querySelector('.search-button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search-input')

            this.add(value)
        }
    }

    update(){
        this.clearAll()
        this.dataUpdate()
        this.empty()
    }

    empty(){
        const empty = this.root.querySelector('.empty-table');
        const fill = this.root.querySelector('.fill');

        if (this.entries.length === 0){
            empty.classList.remove('hide')
            fill.classList.add('hide')
        } else{
            empty.classList.add('hide')
            fill.classList.remove('hide')
        }
        
        
    }


    dataUpdate(){
        this.entries.forEach( user => {
            const row = this.newEntry()

            row.querySelector('.user-wrap a').href = `https://github.com/${user.login}`;
            row.querySelector('.user-wrap img').src = `https://github.com//${user.login}.png`;
            row.querySelector('.user-wrap img').alt = `Imagem de ${user.name}`;
            row.querySelector('.user p').textContent = user.name;
            row.querySelector('.user span').textContent = user.login;
            row.querySelector('.repositories').textContent = user.public_repos;
            row.querySelector('.followers').textContent = user.followers;

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Você tem certeza que deseja excluir esse contato?')
                if(isOk){
                    this.delete(user)
                }
            }

            this.tbody.append(row)
        })
    }

    
    delete(user){
        const filteredEntries = this.entries.filter((entry) => entry.login !== user.login);
        this.entries = filteredEntries;
        this.update()
        this.save()
    }

    newEntry(){
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td class="user-wrap">
            <a href="https://github.com/maykbrito" target="_blank">
                <img src="https://github.com//maykbrito.png" alt="Imagem de maykbrito">
                <div class="user">
                    <p>Mayk Brito</p>
                    <span>/maykbrito</span>
                </div>
            </a>
        </td>
        <td class='repositories'>123</td>
        <td class='followers' >1234</td>
        <td>
            <button class="remove">Remover</button>
        </td>
    `
        return tr
    }


    clearAll(){
        const tr = this.tbody.querySelectorAll('tr');
        tr.forEach((tr) => {
            tr.remove()
        })
    }
}