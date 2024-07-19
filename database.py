import sqlite3
from datetime import date, timedelta

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
    try:
        conect = sqlite3.connect('banco.db')
        cursor = conect.cursor()
        cursor.execute(f"SELECT * FROM carrego ")
        registros = cursor.fetchall()
        conect.close()
        return registros
    except:
        return

# dados para os graficos
def DadosGrafico():
    cubtotal = cubT = cubC = cubE = cubV = cubKZ = cubF = cubA = cubCSS = cubZC =  porcentoTerceiro = porcentoClaudino = porcentoEscoameto = 0
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute(f"SELECT * FROM carrego WHERE status = 'ATIVO' ")
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


def CubagemDia():
    lista = []
    conect = sqlite3.connect("banco.db")
    cursor = conect.cursor()
    cursor.execute('''SELECT 
    strftime('%Y-%m-%d', data) AS dia,
    COUNT(*) AS total_transacoes
    FROM 
        carrego
    WHERE 
        strftime('%Y-%m', data) = '2024-07'
    GROUP BY 
        dia
    ORDER BY 
    dia; ''')
    CubDia = cursor.fetchall()
    conect.close()

print(Data + timedelta())

# alterar dados
def alterarFase(id=0,fase=''):
    if id == '' or fase == '':
        return
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    if fase == 1:
        cursor.execute(f"UPDATE carrego SET classe = 'aguardando', frase = 'AGUARD' WHERE id = {id}")
    if fase == 2:
        cursor.execute(f"UPDATE carrego SET classe = 'carregando', frase = 'CARREGANDO' WHERE id = {id}")
    if fase == 3:
        cursor.execute(f"UPDATE carrego SET classe = 'aguard_fat', frase = 'AGUARD FAT' WHERE id = {id}")
    if fase == 4:
        cursor.execute(f"UPDATE carrego SET classe = 'faturando', frase = 'FATURANDO' WHERE id = {id}")
    if fase == 5:
        cursor.execute(f"UPDATE carrego SET classe = 'concluido', frase = 'CONCLUÍDO' WHERE id = {id}")
    if fase == 'ADIADO':
        cursor.execute(f"UPDATE carrego SET classe = 'adiado', frase = 'ADIADO', status = 'ADIADO' WHERE id = {id}")
    if fase == 'CANCELADO':
        cursor.execute(f"UPDATE carrego SET classe = 'cancelado', frase = 'CANCELADO', status = 'CANCELADO' WHERE id = {id}")
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

# alterarFase(11,'ADIADO')
