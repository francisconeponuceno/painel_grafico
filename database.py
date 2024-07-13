import sqlite3


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
        classe1 TEXT,
        classe2 TEXT,
        classe3 TEXT,
        classe4 TEXT,
        classe5 TEXT,
        icone1 TEXT,
        icone2 TEXT,
        icone3 TEXT,
        icone4 TEXT,
        icone5 TEXT,
        frase1 TEXT,
        frase2 TEXT,
        frase3 TEXT,
        frase4 TEXT,
        frase5 TEXT,
        img TEXT
        );
    """)
    conect.close()


def salvar(clt,mot,dest,conf,placa,cub,casse1,classe2,classe3,classe4,classe5,
           icone1,icone2,icone3,icone4,icone5,frase1,frase2,frase3,frase4,frase5):
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute('''INSERT INTO carrego(clt, mot, dest, conf, placa, cub,
                   classe1, classe2, classe3, classe4, classe5,
                   icone1, icone2, icone3, icone4, icone5,
                   frase1, frase2, frase3, frase4, frase5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)''',
                   [clt,mot,dest,conf,placa,cub,casse1,classe2,classe3,classe4,classe5,
                    icone1,icone2,icone3,icone4,icone5,frase1,frase2,frase3,frase4,frase5])
    conect.commit()
    conect.close()

# Consultar dados
def consultarDados():
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute('SELECT * FROM carrego')
    registros = cursor.fetchall()
    conect.close()
    return registros


# dados para os graficos
def DadosGrafico():
    cubtotal = cubT = cubC = cubE = cubV = cubKZ = cubF = cubA = cubCSS = cubZC =  porcentoTerceiro = porcentoClaudino = porcentoEscoameto = 0
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute('SELECT * FROM carrego')
    Dgrafico = cursor.fetchall()
    conect.close()
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

DadosGrafico()
# alterar dados
def alterarFase(id,fase):
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    if fase == 1:
        cursor.execute(f"UPDATE carrego SET classe1 = 'concluido', icone1 = 'bi bi-check2-circle' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET icone2 = 'bi bi-truck', frase2 = '' WHERE id = {id}")
    if fase == 2:
        cursor.execute(f"UPDATE carrego SET classe2 = 'concluido', icone2 = 'bi bi-check2-circle' WHERE id = {id}" )
        cursor.execute(f"UPDATE carrego SET icone3 = 'bi bi-truck', frase3 = '' WHERE id = {id}")
    if fase == 3:
        cursor.execute(f"UPDATE carrego SET classe3 = 'concluido', icone3 = 'bi bi-check2-circle' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET icone4 = 'bi bi-truck', frase4 = '' WHERE id = {id}")
    if fase == 4:
        cursor.execute(f"UPDATE carrego SET classe4 = 'concluido', icone4 = 'bi bi-check2-circle' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET icone5 = 'bi bi-truck', frase5 = '' WHERE id = {id}")
    if fase == 5:
        cursor.execute(f"UPDATE carrego SET classe5 = 'concluido', icone5 = 'bi bi-check2-circle' WHERE id = {id}")
        

    conect.commit()
    conect.close()

def normal(id,classe):
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    if classe == 'NORMAL':
        cursor.execute(f"UPDATE carrego SET classe1 = 'fase', icone1 = 'bi bi-truck', frase1 = 'AGUARD' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET classe2 = 'fase', icone2 = 'bi bi-cone-striped', frase2 = 'CARREGANDO' WHERE id = {id}" )
        cursor.execute(f"UPDATE carrego SET classe3 = 'fase', icone3 = 'bi bi-cone-striped', frase3 = 'AGUARD FAT' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET classe4 = 'fase', icone4 = 'bi bi-cone-striped', frase4 = 'FATURANDO' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET classe5 = 'fase', icone5 = 'bi bi-cone-striped', frase5 = 'CONCLUÍDO' WHERE id = {id}")
    if classe == 'CANCELADO':
        cursor.execute(f"UPDATE carrego SET classe1 = 'cancelado', icone1 = 'bi bi-x-circle', frase1 = 'CANCELADO' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET classe2 = 'cancelado', icone2 = 'bi bi-x-circle', frase2 = 'CANCELADO' WHERE id = {id}" )
        cursor.execute(f"UPDATE carrego SET classe3 = 'cancelado', icone3 = 'bi bi-x-circle', frase3 = 'CANCELADO' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET classe4 = 'cancelado', icone4 = 'bi bi-x-circle', frase4 = 'CANCELADO' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET classe5 = 'cancelado', icone5 = 'bi bi-x-circle', frase5 = 'CANCELADO' WHERE id = {id}")
    if classe == 'ADIADO':
        cursor.execute(f"UPDATE carrego SET classe1 = 'adiado', icone1 = 'bi bi-arrow-repeat', frase1 = 'ADIADO' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET classe2 = 'adiado', icone2 = 'bi bi-arrow-repeat', frase2 = 'ADIADO' WHERE id = {id}" )
        cursor.execute(f"UPDATE carrego SET classe3 = 'adiado', icone3 = 'bi bi-arrow-repeat', frase3 = 'ADIADO' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET classe4 = 'adiado', icone4 = 'bi bi-arrow-repeat', frase4 = 'ADIADO' WHERE id = {id}")
        cursor.execute(f"UPDATE carrego SET classe5 = 'adiado', icone5 = 'bi bi-arrow-repeat', frase5 = 'ADIADO' WHERE id = {id}")
    conect.commit()
    conect.close()

# excluír registro
def excluir(id):
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute(f'DELETE FROM carrego WHERE id = {id}')
    conect.commit()
    conect.close()

#excluir(51)
# eliminando a tabela
def eliminaTabela():
    conect = sqlite3.connect('banco.db')
    cursor = conect.cursor()
    cursor.execute(f'DROP TABLE carrego')
    conect.commit()
    conect.close()

# eliminaTabela()
# TabCarrego()


# salvar(Dados[0],Dados[1],Dados[2],Dados[3],Dados[4],Dados[5],
# Dados[6],Dados[7],Dados[8],Dados[9],Dados[10],Dados[11],
# Dados[12],Dados[13],Dados[14],Dados[15],Dados[16],Dados[17],
# Dados[18],Dados[19],Dados[20])

# alterarFase(43,1)
# normal(44,'NORMAL')
