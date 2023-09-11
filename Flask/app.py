from flask import Flask
import pygsheets
from pygsheets import ValueRenderOption

app = Flask(__name__)
# Permite que o JSON retornado não seja em ASCII, mas sim em UTF-8
app.json.ensure_ascii = False

# Google Client
gc = pygsheets.authorize(service_file='jurifin-dashboard-pygsheets-b0525e232b03.json')
# Google Spreadsheet
sh = gc.open('FGV Jr. 2023.02 - Planilha Financeira - Cópia Alterada')

@app.route("/")
def index():
    return get_orcado_utilizado()

def get_entradas_saidas_saldo():
    wks = sh.worksheet_by_title('FLUXO DE CAIXA')

    # Pega as últimas células com valores na coluna B
    entradas, saidas, saldo = wks.get_col(2, returnas='matrix', include_tailing_empty=False, include_empty=False, value_render=ValueRenderOption.UNFORMATTED_VALUE)[-3:]

    retorno = {
        'entradas': entradas,
        'saidas': saidas,
        'saldo': saldo
    }

    return retorno

def get_orcado_utilizado():
    wks = sh.worksheet_by_title('ORÇAMENTO ')

    # Pega as últimas células com valores na colunas C, D e E
    area = wks.get_col(3, returnas='matrix', include_tailing_empty=False, include_empty=False, value_render=ValueRenderOption.UNFORMATTED_VALUE)[-8:-1]
    orcamento = wks.get_col(4, returnas='matrix', include_tailing_empty=False, include_empty=False, value_render=ValueRenderOption.UNFORMATTED_VALUE)[-8:-1]
    utilizado = wks.get_col(5, returnas='matrix', include_tailing_empty=False, include_empty=False, value_render=ValueRenderOption.UNFORMATTED_VALUE)[-8:-1]
    
    retorno = {}

    for i in range(len(area)):
        retorno[area[i]] = {
            'Orçamento': orcamento[i],
            'Utilizado': utilizado[i]
        }

    return retorno