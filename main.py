from database import consultarDados, salvar, DadosGrafico, CubagemMes
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
        else:
            if CONF == 'ARIMATEIA':
                IMG = '/static/img_arimateia.jpg'
            if CONF == 'CAZE':
                IMG = '/static/img_caze.jpg'
            if CONF == 'FABIO':
                IMG = '/static/img_fabio.png'
            if CONF == 'VICENTE':
                IMG = '/static/img_vicente.png'
            if CONF == 'KASSIO':
                IMG = '/static/img_cassio.png'
            if CONF == 'ZE CARLOS':
                IMG = '/static/img_zecarlos.png'
            if CONF == 'FERNANDO':
                IMG = '/static/img_fernando.png'
            if CONF == 'RAIONE':
                IMG = '/static/img_raione.png'
            if CONF == 'LUCAS':
                IMG = '/static/img_lucas.png'
                
            Dados = [CLT,MOT,DEST,CONF,PLACA,CUB,'aguardando','AGUARD',IMG,'ATIVO']  
            salvar(Dados[0],Dados[1],Dados[2],Dados[3],Dados[4],Dados[5],Dados[6],Dados[7],Dados[8],Dados[9])
            return redirect("/")
    except:
        return redirect("/")


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True)

# app.run(host='127.0.0.1', port=5000, debug=True)
