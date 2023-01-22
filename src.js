const submitButton = document.querySelector('.button');
const input = document.querySelector('.input');
const resultsContainer = document.querySelector('div');
const res = document.querySelector('.result');
const url = 'https://en.wikipedia.org/w/api.php?';
const params = {
    origin: '*',
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exchars: 300,
    exintro: true,
    explaintext: true,
    generator: 'search',
    gsrlimit: 20,
};
const getData = async () => {
    const userInput = input.value;
    params.gsrsearch = userInput;
    resultsContainer.innerHTML = '';
    const { data } = await axios.get(url, { params });
    gatherData(data.query.pages);
    } 
submitButton.addEventListener('click', getData);

const gatherData = pages => {
        const results = Object.values(pages).map(page => ({
            pageId: page.pageid,
            title: page.title,
            intro: page.extract,
        }));
    
        showResults(results);
    };

    const showResults = results => {
        results.forEach(result => {
            res.style.display="Block"
            resultsContainer.innerHTML += `
            <div>
                <a href="https://en.wikipedia.org/?curid=${result.pageId}" target="_blank">
                    <h2 class="head">${result.title}</h2>
                </a>
                <span>${result.intro} <a href="https://en.wikipedia.org/?curid=${result.pageId}" target="_blank"> learn more...<a></p><span>
                
            </div>
            <br>
        `;
        });
    };
