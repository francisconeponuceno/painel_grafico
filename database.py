import sqlite3
from datetime import date

Data = date.today()
def TabCarrego():
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS carrego (     
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clt TEXT,
        mot TEXT,
        dest TEXT,
        conf TEXT,
        placa TEXT,
        cub INTEGER,
        classe TEXT,
        frase TEXT,
        img TEXT,
        status TEXT,
        data DATE
        );
    """)
    conect.close()

def salvar(clt,mot,dest,conf,placa,cub,classe,frase,img,status):
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute('''INSERT INTO carrego(clt, mot, dest, conf, placa, cub,classe,frase,img, status,data) VALUES(?,?,?,?,?,?,?,?,?,?,?)''',
                   [clt,mot,dest,conf,placa,cub,classe,frase,img,status,Data])
    conect.commit()
    conect.close()

# Consultar dados
def consultarDados():
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute(f"SELECT * FROM carrego WHERE status = 'ATIVO' AND data = '{Data}' ")
    registros = cursor.fetchall()
    conect.close()
    return registros


# dados para os graficos
def DadosGrafico():
    cubtotal = cubT = cubC = cubE = cubV = cubKZ = cubF = cubA = cubCSS = cubZC =  porcentoTerceiro = porcentoClaudino = porcentoEscoameto = 0
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute(f"SELECT * FROM carrego WHERE status = 'ATIVO' AND data = '{Data}' ")
    Dgrafico = cursor.fetchall()
    conect.close()
    if Dgrafico == []:
        return
    for i in Dgrafico:
        if i[4] == 'FABIO':
            cubF += i[6]
        if i[4] == 'KASSIO':
            cubCSS += i[6]
        if i[4] == 'ARIMATEIA':
            cubA += i[6]
        if i[4] == 'VICENTE':
            cubV += i[6]
        if i[4] == 'CAZE':
            cubKZ += i[6]
        if i[4] == 'ZE CARLOS':
            cubZC += i[6]
        if i[1] == 'C':
            cubC += i[6]
        if i[1] == 'T':
            cubT += i[6]
        if i[1] == 'E':
            cubE += i[6]
        cubtotal += i[6]
    porcentoTerceiro = cubT / cubtotal * 100
    porcentoClaudino = cubC / cubtotal * 100
    porcentoEscoameto = cubE / cubtotal * 100
    dadoslidos = [cubtotal, cubF, cubCSS, cubA, cubV, cubKZ, cubZC, cubC, cubT, cubE,porcentoTerceiro,porcentoClaudino,porcentoEscoameto]
    return dadoslidos


# alterar dados
def alterarFase(id=0,fase=''):
    if id == '' or fase == '':
        return
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    if fase == 1:
        cursor.execute(f"UPDATE carrego SET classe = 'aguardando', frase = 'AGUARDNDO' WHERE id = {id}")
    if fase == 2:
        cursor.execute(f"UPDATE carrego SET classe = 'carregando', frase = 'CARREGANDO' WHERE id = {id}")
    if fase == 3:
        cursor.execute(f"UPDATE carrego SET classe = 'aguard_fat', frase = 'AGUARD FAT' WHERE id = {id}")
    if fase == 4:
        cursor.execute(f"UPDATE carrego SET classe = 'faturando', frase = 'FATURANDO' WHERE id = {id}")
    if fase == 5:
        cursor.execute(f"UPDATE carrego SET classe = 'concluido', frase = 'CONCLUÍDO' WHERE id = {id}")
    if fase == 'ADIADO':
        cursor.execute(f"UPDATE carrego SET classe = 'adiado', frase = 'ADIADO' WHERE id = {id}")
    if fase == 'CANCELADO':
        cursor.execute(f"UPDATE carrego SET classe = 'cancelado', frase = 'CANCELADO' WHERE id = {id}")
    conect.commit()
    conect.close()


# excluír registro
def excluir(id):
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute(f'DELETE FROM carrego WHERE id = {id}')
    conect.commit()
    conect.close()

# excluir(26)
# eliminando a tabela
def eliminaTabela():
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute(f'DROP TABLE carrego')
    conect.commit()
    conect.close()
    TabCarrego()
# eliminaTabela()


# eliminaTabela()
# TabCarrego()


# salvar(Dados[0],Dados[1],Dados[2],Dados[3],Dados[4],Dados[5],
# Dados[6],Dados[7],Dados[8],Dados[9],Dados[10],Dados[11],
# Dados[12],Dados[13],Dados[14],Dados[15],Dados[16],Dados[17],
# Dados[18],Dados[19],Dados[20])

#alterarFase(12,'CANCELADO')

