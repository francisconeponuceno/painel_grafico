import sqlite3
from datetime import date, timedelta,datetime

Data = date.today()
# Criar tabela
def TabCarrego():
    try:
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
    except:
        return

# Adicionar carregamento
def salvar(clt,mot,dest,conf,placa,cub,classe,frase,img,status):
    try:
        conect = sqlite3.connect('banco.db')
        cursor = conect.cursor()
        cursor.execute('''INSERT INTO carrego(clt, mot, dest, conf, placa, cub,classe,frase,img, status,data) VALUES(?,?,?,?,?,?,?,?,?,?,?)''',
                    [clt,mot,dest,conf,placa,cub,classe,frase,img,status,Data])
        cursor.execute(f"DELETE FROM sqlite_sequence WHERE name = 'carrego' ")
        conect.commit()
        conect.close()
    except:
        return

# Consultar dados
def consultarDados():
    try:
        conect = sqlite3.connect('banco.db')
        cursor = conect.cursor()
        cursor.execute(
            f"SELECT * FROM carrego  WHERE status = 'ATIVO' AND data = '2024-08-15' ")  # AND data = '{Data}'
        registros = cursor.fetchall()
        conect.close()
        return registros
    except:
        return
consultarDados()

def sequencia():
    try:
        index = []
        conect = sqlite3.connect('banco.db')
        cursor = conect.cursor()
        cursor.execute(
            f"SELECT * FROM carrego  WHERE status = 'ATIVO' AND data = '2024-08-15' ")  # AND data = '{Data}'
        itens = cursor.fetchall()
        conect.close()
        for i in range(0,len(itens)):
            index.append(i + 1)
        return index
    except:
        return

# dados para os graficos
def DadosGrafico():
    try:
        cubtotal = cubT = cubC = cubE = cubV = cubKZ = cubF = cubA = cubCSS = cubZC = cubfer = cubrai = cubluc = porcentoTerceiro = porcentoClaudino = porcentoEscoameto = T = C = E = 0
        conect = sqlite3.connect('banco.db')
        cursor = conect.cursor()
        cursor.execute(
            f"SELECT * FROM carrego WHERE status = 'ATIVO' AND data = '2024-08-15' ")  # AND data = '{Data}'
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
            if i[4] == 'FERNANDO':
                cubfer += i[6]
            if i[4] == 'RAIONE':
                cubrai += i[6]
            if i[4] == 'LUCAS':
                cubluc += i[6]
            if i[1] == 'C':
                cubC += i[6]
                C += 1
            if i[1] == 'T':
                cubT += i[6]
                T += 1
            if i[1] == 'E':
                cubE += i[6]
                E += 1
            cubtotal += i[6]
        porcentoTerceiro = cubT / cubtotal * 100
        porcentoClaudino = cubC / cubtotal * 100
        porcentoEscoameto = cubE / cubtotal * 100
        # formatado com duas casas decimais
        porcentoTerceiro = f'{porcentoTerceiro:.2f}'
        porcentoClaudino = f'{porcentoClaudino:.2f}'
        porcentoEscoameto = f'{porcentoEscoameto:.2f}'
        ##############################################
        dadoslidos = [cubtotal, cubF, cubCSS, cubA, cubV, cubKZ, cubZC, cubfer, cubrai, cubluc, cubC, cubT, cubE,
                      porcentoTerceiro, porcentoClaudino, porcentoEscoameto, T, C, E]
        return dadoslidos
    except:
        return

# dados pro mês
def CubagemMes():
    try:
        jan = fev = mar = abr = mai = jun = jul = ago = set = out = nov = dez = 0
        conect = sqlite3.connect("banco.db")
        cursor = conect.cursor()
        cursor.execute(f'''SELECT cub, data FROM carrego WHERE status = 'ATIVO' ''')
        CubDia = cursor.fetchall()
        conect.close()
        for i in CubDia:
            DataMes = i[1]
            data_obj = datetime.strptime(DataMes, "%Y-%m-%d")
            if data_obj.month == 1:
                jan += i[0]
            if data_obj.month == 2:
                fev += i[0]
            if data_obj.month == 3:
                mar += i[0]
            if data_obj.month == 4:
                abr += i[0]
            if data_obj.month == 5:
                mai += i[0]
            if data_obj.month == 6:
                jun += i[0]
            if data_obj.month == 7:
                jul += i[0]
            if data_obj.month == 8:
                ago += i[0]
            if data_obj.month == 9:
                set += i[0]
            if data_obj.month == 10:
                out += i[0]
            if data_obj.month == 11:
                nov += i[0]
            if data_obj.month == 12:
                dez += i[0]
        meses = [jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez]
        return meses
    except:
        return


# alterar dados
def alterarFase(id=0,fase=''):
    try:
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
    except:
        return


# excluír registro
def excluir(id):
    try:
        conect = sqlite3.connect('banco.db')
        cursor = conect.cursor()
        cursor.execute(f'DELETE FROM carrego WHERE id = {id}')
        cursor.execute(f"DELETE FROM sqlite_sequence WHERE name = 'carrego' ")
        conect.commit()
        conect.close()
    except:
        return


# eliminando a tabela
def eliminaTabela():
    try:
        conect = sqlite3.connect('banco.db')
        cursor = conect.cursor()
        cursor.execute(f'DROP TABLE carrego')
        conect.commit()
        conect.close()
        TabCarrego()
    except:
        return


# eliminaTabela()
# eliminaTabela()
# excluir(13)
alterarFase(42,2)
# sequencia()
