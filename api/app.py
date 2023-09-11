from flask import Flask
import pygsheets
from datetime import datetime

app = Flask(__name__)
# Permite que o JSON retornado não seja em ASCII, mas sim em UTF-8
app.json.ensure_ascii = False

# Google Client
gc = pygsheets.authorize(service_file='jurifin-dashboard-pygsheets-b0525e232b03.json')
# Google Spreadsheet
sh = gc.open('FGV Jr. 2023.02 - Planilha Financeira - Cópia Alterada')

@app.route("/<area>/<int:data_inicio>/<int:data_fim>")
def index(area, data_inicio, data_fim):
    dados = {
        'entradas_saidas_saldo': get_entradas_saidas_saldo(),
        'orcado_utilizado': get_orcado_utilizado(),
        'inadimplencia': get_inadimplencia(),
        'lancamentos': get_lancamentos_area(area, data_inicio, data_fim)
    }
    return dados

def get_coluna(wks, i):
    return wks.get_col(
        i,
        returnas='matrix',
        include_tailing_empty=False,
        include_empty=False,
        value_render=pygsheets.ValueRenderOption.UNFORMATTED_VALUE
    )

def get_entradas_saidas_saldo():
    wks = sh.worksheet_by_title('FLUXO DE CAIXA')

    # Pega as últimas células com valores na coluna B
    entradas, saidas, saldo = get_coluna(wks, 2)[-3:]

    retorno = {
        'entradas': entradas,
        'saidas': saidas,
        'saldo': saldo
    }

    return retorno

def get_orcado_utilizado():
    wks = sh.worksheet_by_title('ORÇAMENTO ')

    # Pega as últimas células com valores na colunas C, D e E
    area = get_coluna(wks, 3)[-8:-1]
    orcamento = get_coluna(wks, 4)[-8:-1]
    utilizado = get_coluna(wks, 5)[-8:-1]
    
    retorno = {}

    for i in range(len(area)):
        retorno[area[i]] = {
            'Orçamento': orcamento[i],
            'Utilizado': utilizado[i]
        }

    return retorno

def get_inadimplencia():
    wks = sh.worksheet_by_title('CONTROLE DE INADIMPLÊNCIA')

    # Pega a última célula com valor na coluna B
    inadimplencia = get_coluna(wks, 2)[-1]

    # retorno = {
    #     'Inadimplência': inadimplencia
    # }

    return inadimplencia

def serial_number_to_date(serial_number):
    return datetime.fromordinal(datetime(1900, 1, 1).toordinal() + serial_number - 2)

def get_lancamentos_area(area, data_inicio, data_fim, data_string=True, n=3):
    wks = sh.worksheet_by_title('LANÇAMENTOS')

    datas = get_coluna(wks, 1)
    origens = get_coluna(wks, 6)
    areas = get_coluna(wks, 9)
    lancamentos = get_coluna(wks, 10)

    retorno = []

    for i in range(len(areas) - 1, -1, -1):
        if datas[i] >= data_inicio and datas[i] <= data_fim and areas[i] == area:
            retorno.append({
                'Data': serial_number_to_date(datas[i]).strftime('%d/%m/%Y') if data_string else datas[i],
                'Origem': origens[i],
                'Lançamento': lancamentos[i]
            })
            n -= 1
            if n <= 0:
                break

    return retorno