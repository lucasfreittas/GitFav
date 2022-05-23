export class List{
    constructor (root){
        this.root = document.querySelector(root);
        this.tbody = document.querySelector('#tb')
        this.entries = [
            {
                login: 'maykbrito',
                name: 'Mayk Brito',
                public_repos: '76',
                followers: '120000',
            },
            {
                login: 'diego3g',
                name: 'Diego Fernandes',
                public_repos: '150',
                followers: '122330',
            },
        ];

     this.update()
    }

    update(){
        this.clearAll()
        this.dataUpdate()
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



            this.tbody.append(row)
        })
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