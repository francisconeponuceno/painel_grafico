from database import consultarDados, salvar, DadosGrafico, CubagemMes, excluir, alterarFase, updateCarrego, imagemConf
from flask import Flask, render_template, request, redirect


app = Flask(__name__)


@app.route('/')
def index():
    try:
        dados = consultarDados()
        Dgrafico = DadosGrafico()
        graficoMes = CubagemMes()
        return render_template("index.html", registro=dados ,Dgrafico=Dgrafico, graficoMes=graficoMes)
    except:
        return redirect("/")

@app.route('/cadastrar',methods=['POST','GET'])
def cadastrar():
    try:
        CLT = request.form['clt'].upper()
        MOT = request.form['mot'].upper()
        DEST = request.form['dest'].upper()
        CONF = request.form['conf'].upper()
        PLACA = request.form['placa'].upper()
        CUB = request.form['cub'].upper()
        IMG = imagemConf(CONF)
        if CLT =='' or MOT =='' or DEST =='' or CONF =='' or PLACA =='' or CUB == '':
            return redirect("/")
        salvar(CLT,MOT,DEST,CONF,PLACA,CUB,'aguardando','AGUARD',IMG,'ATIVO')
        return redirect("/")
    except:
        return redirect("/")


@app.route("/remover", methods=["POST", "GET"])
def remover():
    try:
        dados = consultarDados()
        contador = 0
        ID_CARREGO = int(request.form["num_carrego"])
        CLT = request.form['clt'].upper()
        MOT = request.form['mot'].upper()
        DEST = request.form['dest'].upper()
        CONF = request.form.get("conf")
        PLACA = request.form['placa'].upper()
        CUB = request.form['cub'].upper()
        FASE = request.form.get("opcoes")
        IMG = imagemConf(CONF)
        if ID_CARREGO == "":
            return redirect("/")
        for i in dados:
            contador += 1
            if contador == ID_CARREGO:
                if FASE == "" and CLT == '' and MOT == ''and DEST == ''and CONF =='' and PLACA == ''and CUB == '':
                    excluir(i[0])
                    return redirect("/")
                else:
                    updateCarrego(i[0], CLT, MOT, DEST, CONF, PLACA, CUB, IMG)
                    alterarFase(i[0],FASE)
                    return redirect("/")      
    except:
        return redirect("/")


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True)

# app.run(host='127.0.0.1', port=5000, debug=True)
