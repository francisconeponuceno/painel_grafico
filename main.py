from database import consultarDados, salvar, DadosGrafico, CubagemMes, excluir, alterarFase
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
        IMG = '/static/images.jpg'
        if CLT =='' or MOT =='' or DEST =='' or CONF =='' or PLACA =='' or CUB == '':
            return redirect("/")
        match CONF:
            case 'ARIMATEIA':
                IMG = '/static/img_arimateia.jpg'
            case 'CASE':
                IMG = '/static/img_caze.jpg'
            case 'FABIO':
                IMG = '/static/img_fabio.png'
            case 'VICENTE':
                IMG = '/static/img_vicente.png'
            case 'CASSIO':
                IMG = '/static/img_cassio.png'
            case 'ZE CARLOS':
                IMG = '/static/img_zecarlos.png'
            case 'FERNANDO':
                IMG = '/static/img_fernando.png'
            case 'RAIONE':
                IMG = '/static/img_raione.png'
            case 'EMERSON':
                IMG = '/static/img_lucas.png'

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
        FASE = request.form.get("opcoes")
        print(FASE)
        if ID_CARREGO == "" and FASE == "":
            return redirect("/")
        for i in dados:
            contador += 1
            if contador == ID_CARREGO:
                if FASE == "":
                    excluir(i[0])
                    return redirect("/")
                else:
                    alterarFase(i[0], FASE)
                    return redirect("/")
    except:
        return redirect("/")


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True)

# app.run(host='127.0.0.1', port=5000, debug=True)
