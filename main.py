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
    CLT = request.form['clt']
    MOT = request.form['mot']
    DEST = request.form['dest']
    CONF = request.form['conf']
    PLACA = request.form['placa']
    CUB = request.form['cub']
    IMG = ''
    if CLT =='' or MOT =='' or DEST =='' or CONF =='' or PLACA =='' or CUB == '':
        print('preencha todos os campos')
        return redirect("/")
    else:
        if CONF == 'ARIMATEIA':
            IMG = '/static/usuario.avif'
        if CONF == 'CAZE':
            IMG = '/static/usuario.avif'
        if CONF == 'FABIO':
            IMG = '/static/usuario.avif'
        if CONF == 'VICENTE':
            IMG = '/static/usuario.avif'
        if CONF == 'KASSIO':
            IMG = '/static/usuario.avif'
        if CONF == 'ZE CARLOS':
            IMG = '/static/usuario.avif'
        else:
            IMG = '/static/images.jpg'
            
        Dados = [CLT,MOT,DEST,CONF,PLACA,CUB,'fase','fase','fase','fase','fase',
                'bi bi-truck','bi bi-cone-striped','bi bi-cone-striped',
                'bi bi-cone-striped','bi bi-cone-striped','AGUARD','CARREGANDO','AGUARD FAT','FATURANDO','CONCLUÍDO', IMG,'ATIVO']  
        salvar(Dados[0],Dados[1],Dados[2],Dados[3],Dados[4],Dados[5],Dados[6],Dados[7],
        Dados[8],Dados[9],Dados[10],Dados[11],Dados[12],Dados[13],Dados[14],Dados[15],
        Dados[16],Dados[17],Dados[18],Dados[19],Dados[20],Dados[21],Dados[22])
        return redirect("/")


if __name__ == '__main__':
    app.run(debug=True)
