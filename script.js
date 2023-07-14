const sheetID = '1xv-Xmw-lOpeOvQ7xBdbmhXGG0ktTr-k-HFDQHQq0Nik'
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName= 'Hoja 1'

let table, clearTable 

window.addEventListener("load",()=>{
    table = document.getElementById('response')
    clearTable = table.cloneNode(true)
})

function search(e) {
    if (e.target.value.length > 2) {
        let input = e.target.value.toLowerCase()
        let qu = `Select A,B,C,D WHERE A CONTAINS '${input}'`
        let query = encodeURIComponent(qu)
        let url = `${base}&sheet=${sheetName}&tq=${query}`
        fetch(url)
        .then((response) => response.text())
        .then((data) =>
        {
            let jsonData = JSON.parse(data.substring(47).slice(0, -2));
            updateData(jsonData.table.rows)
        });
    }  
}

function updateData(rows) {
    if (rows.length != 0){
        let newTable = clearTable.cloneNode(true)
        rows.forEach(row => { 
            let tableRow = document.createElement("tr")
            let cols = row.c
            cols.forEach(col => {
                let content = document.createElement('td')
                if (col) {
                    content.innerHTML = col.v   
                } else {
                    content.innerHTML = "" 
                }
                tableRow.appendChild(content)
            });
            newTable.appendChild(tableRow)
        });
        table.parentElement.replaceChild(newTable, table)
        table = newTable
    } else{
        let newTable = document.createElement("p")
        newTable.innerText = "No se han encontrado resultados, pruebe con otro nombre del alimento."
        table.parentElement.replaceChild(newTable, table)
        table = newTable
    }
    
}