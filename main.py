from database import consultarDados, salvar, DadosGrafico, CubagemMes, excluir, updateCarrego, imagemConf
from database import select
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


@app.route('/adicionar',methods=['POST','GET'])
def adicionar():
    return render_template('/add.html')


@app.route('/cadastrar',methods=['POST','GET'])
def cadastrar():
    try:
        CLT = request.form.get("clt")
        MOT = request.form['mot'].upper()
        DEST = request.form['dest'].upper()
        CONF = request.form.get("conf")
        PLACA = request.form['placa'].upper()
        CUB = request.form['cub'].upper()
        IMG = imagemConf(CONF)
        AGUARD = 'AGUARD'
        if CONF != 'GERAL':
            AGUARD = 'CARREGANDO'
        if CLT =='' or MOT =='' or DEST =='' or CONF =='' or PLACA =='' or CUB == '':
            return redirect("/")
        salvar(CLT,MOT,DEST,CONF,PLACA,CUB,'aguardando', AGUARD, IMG,'ATIVO')
        return redirect("/")
    except:
        return redirect("/")


@app.route('/update/<int:id>',methods=['GET','POST'])
def update(id):
    lista = select(id)
    return render_template('/update.html',lista=lista)


@app.route("/alterar/<int:id>", methods=["POST", "GET"])
def remover(id):
    try:
        CLT = request.form.get("clt")
        MOT = request.form['mot'].upper()
        DEST = request.form['dest'].upper()
        CONF = request.form.get("conf")
        PLACA = request.form['placa'].upper()
        CUB = request.form['cub'].upper()
        FASE = request.form.get("opcoes")
        IMG = imagemConf(CONF)
        if CONF == 'GERAL':
            FASE = 'AGUARD'
        lista = [id, CLT, MOT, DEST, CONF, PLACA, CUB, FASE, IMG]
        updateCarrego(dados=lista)
        return redirect("/")      
    except:
        return redirect("/")


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True)

    # app.run(host='0.0.0.0', port= 'A DEFINIR', debug=True)
