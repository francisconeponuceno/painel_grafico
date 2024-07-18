from database import consultarDados, salvar, DadosGrafico
from flask import Flask, render_template, request, redirect


app = Flask(__name__)

@app.route('/')
def index():
    dados = consultarDados()
    Dgrafico = DadosGrafico()
    return render_template("index.html", registro=dados ,Dgrafico=Dgrafico)
        
@app.route('/cadastrar',methods=['POST','GET'])
def cadastrar():
    CLT = request.form['clt'].upper()
    MOT = request.form['mot'].upper()
    DEST = request.form['dest'].upper()
    CONF = request.form['conf'].upper()
    PLACA = request.form['placa'].upper()
    CUB = request.form['cub'].upper()
    IMG = '/static/images.jpg'
    if CLT =='' or MOT =='' or DEST =='' or CONF =='' or PLACA =='' or CUB == '':
        print('preencha todos os campos')
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
        
        Dados = [CLT,MOT,DEST,CONF,PLACA,CUB,'aguardando','AGUARD',IMG,'ATIVO']  
        salvar(Dados[0],Dados[1],Dados[2],Dados[3],Dados[4],Dados[5],Dados[6],Dados[7],Dados[8],Dados[9])
        
        return redirect("/")


if __name__ == '__main__':
    app.run(debug=True)
