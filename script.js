var n = 0
$('#bIncluir').on("click", botaoIncluir)
function botaoIncluir(){
    n++
    $("#despesasGeral").append(`   
    <div id="despesas${n}" class="despesas">
    <input type="button" value="X" class="botaoExcluir">
    <select name="Categoria" id="categoria" class="categoria">
        <option value="hospedagem">Hospedagem</option>
        <option value="pedagio">Pedagio</option>
        <option value="combustivel">Combustível</option>
        <option value="alimentacao">Alimentação</option>
        <option value="alimentacao">Outros</option>
    </select>
    <input type="text" name="descricao" id="descricao_${n}" class="descricao">
    <input type="text" name="vlruni_" id="vlruni_${n}" class= "vlruni" value="" onchange="calcularTotal(${n})">
    <input type="number" name="quantidade_" id="quantidade_${n}" class="quantidade" value="1" onchange="calcularTotal(${n})">
    <p id="vlrtotal_${n}" class="vlrtotal" name="vlrtotal_"></p> 
</div>
    `)
}
$("#despesasGeral").on("click",".botaoExcluir", function(){
    $(this).parents('.despesas').remove()
    calcularTotalGeral()
}
)

function calcularTotal(linha){
    var idlinha = linha == 0 ? "" : linha 
    var vlrun = document.getElementById("vlruni_" + idlinha).value
    var quant = document.getElementById("quantidade_" + idlinha).value
    var multi = parseFloat(vlrun) * parseFloat(quant)
    var res = document.getElementById("vlrtotal_"+idlinha)
    var desc = document.getElementById("descricao_"+idlinha).value
    res.innerHTML = isNaN(multi) ? 0 : multi
    if(multi >= 400){
        var campo = document.getElementById("despesas" + idlinha)
        campo.style.border = "solid"
        campo.style.borderColor = "Red"
        campo.style.borderRadius = "10px"
        alert("O valor do item Excede a R$ 400 reais, será enviado ao gestor para aprovação!")
    } if (desc == ""){
        alert("Obrigatório preencher a descrição do item")
    } if (multi >= 200){
        res.style.border = "solid"
        res.style.borderColor = "green"
        res.style.borderRadius = "10px"
    }
    calcularTotalGeral()
}
function calcularTotalGeral(){
    var acumulado = 0
    for (var i = 0; i <=n; i++){
        var idlinha = i == 0 ? "" : i 
        var vlrun = document.getElementById("vlruni_" + idlinha)
        if(vlrun != null){
            var quant = document.getElementById("quantidade_" + idlinha).value
            var multi = parseFloat(vlrun.value) * parseFloat(quant)
            acumulado += isNaN(multi) ? 0 : multi
        }
    }
    document.getElementById('totalGeral').value = acumulado
}
function bEnviar(){
    alert("As informações foram enviadas")
}
